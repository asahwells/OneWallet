'use client';

import React, {useEffect, useState} from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Textarea,
    useBreakpointValue, IconButton, VStack
} from '@chakra-ui/react';
import FloatingLabelSelect from 'components/molecules/inputs/FloatingLabelSelect';
// or wherever your floating label select is located
import BaseInput from 'components/molecules/inputs/BaseInput';
import BaseButton from "../../../../../molecules/buttons/BaseButton";
import {ArrowBackIcon} from "@chakra-ui/icons";
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useAddAddress } from 'api-services/business-registration-services';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/store';
import {setCustomer} from "../../../../../../redux/slices/customer";
import BaseFormControl from "../../../../../molecules/forms/BaseFormControl";
import {fetchLGA, fetchStates} from "../../../../../../utils/location";
import FormControlButton from "../../../../../molecules/buttons/FormControlButton";

interface IHouseDetailsTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const HouseDetailsTemplate: React.FC<IHouseDetailsTemplateProps> = ({
                                                                        onNext,
                                                                        onBack,
                                                                    }) => {
    const dispatch = useAppDispatch();
    const { customerDetails } = useAppSelector((s) => s.customer);

    const [stateValue, setStateValue] = useState(customerDetails?.state || '');
    const [lgaValue, setLgaValue] = useState(customerDetails?.lga || '');
    const [houseNumber, setHouseNumber] = useState(customerDetails?.address || '');
    const [streetName, setStreetName] = useState(customerDetails?.streetName || '');
    const [landmark, setLandmark] = useState(customerDetails?.landmark || '');

    // --- states fetch ---
    const [states, setStates] = useState<{ name: string; value: string }[]>([]);
    const [statesLoading, setStatesLoading] = useState(false);
    const [statesError, setStatesError] = useState<string | null>(null);

    // --- LGAs fetch ---
    const [lgas, setLgas] = useState<{ name: string; value: string }[]>([]);
    const [lgasLoading, setLgasLoading] = useState(false);
    const [lgasError, setLgasError] = useState<string | null>(null);

    // load all states on mount
    useEffect(() => {
        let cancelled = false;
        setStatesLoading(true);
        fetchStates()
            .then((data) => {
                if (!cancelled) setStates(data);
            })
            .catch((err) => {
                if (!cancelled) setStatesError(err.message || 'Unable to load states');
            })
            .finally(() => {
                if (!cancelled) setStatesLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // load LGAs whenever the stateValue changes
    useEffect(() => {
        // reset LGA if state changed
        setLgaValue('');
        setLgas([]);
        setLgasError(null);

        if (!stateValue) return;

        let cancelled = false;
        setLgasLoading(true);
        fetchLGA(stateValue)
            .then((data) => {
                if (!cancelled) setLgas(data);
            })
            .catch((err) => {
                if (!cancelled) setLgasError(err.message || 'Unable to load LGAs');
            })
            .finally(() => {
                if (!cancelled) setLgasLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [stateValue]);

    const { mutateAsync: addAddress, isPending: saving } = useAddAddress();

    const handleContinue = async () => {
        const payload = {
            state: stateValue,
            lga: lgaValue,
            address: houseNumber,
            streetName,
            landmark,
            userId: customerDetails?.id,
            town: 'Test',
        };

        try {
            await addAddress(payload);
            dispatch(setCustomer({ ...customerDetails, ...payload }));
            onNext();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <HeaderBackButton onBack={onBack} />

            <Flex
                direction="column"
                bg="white"
                p={{ base: 4, md: 8 }}
                borderRadius="8px"
                boxShadow={{ base: 'none', md: 'md' }}
                w={{ base: '100%', md: '60vw' }}
                mx="auto"
                mt={4}
            >
                <Heading
                    as="h1"
                    variant="headerBold"
                    fontSize="18px"
                    textAlign="center"
                    mb={2}
                >
                    Enter House Address
                </Heading>
                <Text variant="sm" mb={6} textAlign="center" lineHeight="22px">
                    Ensure the address matches what’s on their Utility Bill.
                </Text>

                <VStack spacing={6} w="full">
                    {/* State */}
                    <FormControlButton
                        label="State"
                        items={states.map((st) => ({ value: st.value, name: st.name }))}
                        onChange={({ value }) => setStateValue(value)}
                        placeholder={statesLoading ? 'Loading states…' : 'Select a state'}
                        isDisabled={statesLoading}
                    />

                    {/* LGA */}
                    <FormControlButton
                        label="LGA"
                        items={lgas.map((l) => ({ value: l.value, name: l.name }))}
                        onChange={({ value }) => setLgaValue(value)}
                        placeholder={
                            !stateValue
                                ? 'Select a state first'
                                : lgasLoading
                                    ? 'Loading LGAs…'
                                    : 'Select an LGA'
                        }
                        isDisabled={!stateValue || lgasLoading}
                    />

                    {/* House Number */}
                    <BaseFormControl label="Enter House Number">
                        <BaseInput
                            h="56px"
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                        />
                    </BaseFormControl>

                    {/* Street Name */}
                    <BaseFormControl label="Enter Street Name">
                        <BaseInput
                            h="56px"
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                        />
                    </BaseFormControl>

                    {/* Landmark */}
                    <BaseFormControl label="Landmark / Nearest Bus Stop">
                        <BaseInput
                            h="56px"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                        />
                    </BaseFormControl>
                </VStack>

                <Box mt={8}>
                    <BaseButton
                        width="100%"
                        height="48px"
                        borderRadius="8px"
                        bg="#0F454F"
                        color="white"
                        fontWeight="600"
                        isLoading={saving}
                        isDisabled={
                            saving ||
                            !stateValue ||
                            !lgaValue ||
                            !houseNumber ||
                            !streetName ||
                            !landmark
                        }
                        onClick={handleContinue}
                        text="Continue"
                    />
                </Box>
            </Flex>
        </>
    );
};

export default HouseDetailsTemplate;
