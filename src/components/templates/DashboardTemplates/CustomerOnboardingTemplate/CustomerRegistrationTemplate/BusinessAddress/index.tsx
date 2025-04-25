import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Flex,
  Box,
  Heading,
  useBreakpointValue,
  Text,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent, DrawerCloseButton, DrawerHeader, Center, DrawerBody, useDisclosure
} from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import AttestationCheckbox from 'components/molecules/inputs/AttestationCheckBox';
import BaseInput from 'components/molecules/inputs/BaseInput';
import RadioInputButton from 'components/molecules/inputs/RadioInputButton';
import CameraUpload from 'components/organisms/forms/CameraUploadForm';
import { Switch } from '@chakra-ui/react';

// 1) Import your Redux hooks and action
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { setBusiness } from '../../../../../../redux/slices/business';
import FormControlButton from 'components/molecules/buttons/FormControlButton';
import { fetchLGA, fetchStates } from 'utils/location'; // Adjust your import to the correct function

interface BusinessAddressProps {
  onBack: () => void;
  onNext: () => void;
}

const BusinessAddress: React.FC<BusinessAddressProps> = ({ onBack, onNext }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useAppDispatch();
  const { businessDetails, fromStep } = useAppSelector((s) => s.business);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // track first render vs user state changes
  const firstRun = useRef(true);

  // form state
  const [formData, setFormData] = useState({
    businessState: businessDetails?.businessState || '',
    businessLga: businessDetails?.businessLga || '',
    locatedInMarket: businessDetails?.locatedInMarket ?? undefined,
    marketName: businessDetails?.marketName || '',
    storeNumber: businessDetails?.storeNumber || '',
    fullShopAddress: businessDetails?.fullShopAddress || '',
    photoUrl: businessDetails?.photoUrl || '',
    isResidentialAddress: businessDetails?.isResidentialAddress || false,
  });
  const { businessState } = formData;

  const [isAttested, setIsAttested] = useState(false);
  const [states, setStates] = useState<{ name: string; value: string }[]>([]);
  const [lgas, setLgas] = useState<{ name: string; value: string }[]>([]);

  // 1) Load all states once
  useEffect(() => {
    fetchStates().then(setStates);
  }, []);

  // 2) Whenever businessState changes...
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      // Initial: fetch LGAs for existing state but don't clear the formData.businessLga
      if (businessState) {
        fetchLGA(businessState).then(setLgas);
      }
    } else {
      // User changed state: clear previous LGA, then fetch new list
      setFormData((f) => ({ ...f, businessLga: '' }));
      if (businessState) {
        fetchLGA(businessState).then(setLgas);
      } else {
        setLgas([]);
      }
    }
  }, [businessState]);

  // 3) Once the initial LGA list arrives AND we had an API-provided businessLga,
  //    set it into formData so the select shows it.
  useEffect(() => {
    if (!firstRun.current && businessDetails?.businessLga && lgas.length) {
      setFormData((f) => ({
        ...f,
        businessLga: businessDetails.businessLga,
      }));
    }
  }, [lgas, businessDetails?.businessLga]);

  const handleChange = (name: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    dispatch(setBusiness({ ...businessDetails, ...formData }));
    onNext();
  };

  const isButtonDisabled = useMemo(() => {
    const {
      businessLga,
      fullShopAddress,
      photoUrl,
      locatedInMarket,
      marketName,
      storeNumber,
    } = formData;

    if (!locatedInMarket) {
      if (!formData.isResidentialAddress) {
        return !businessState || !businessLga || !fullShopAddress || !photoUrl || !isAttested;
      }
      return !photoUrl || !isAttested;
    } else {
      return (
          !businessState ||
          !businessLga ||
          !marketName ||
          !storeNumber ||
          !fullShopAddress ||
          !photoUrl ||
          !isAttested
      );
    }
  }, [formData, isAttested, businessState]);
  console.log({formData})
  return (
      <Flex direction="column" bg="#F8FAFC" w="full">
        <HeaderBackButton onBack={onBack} header="Business Address" />

        <Box px={{ base: '20px', md: 4 }} pt={isMobile ? '6px' : '36px'} pb={8}>
          <Box
              bg={isMobile ? '#F8FAFC' : 'white'}
              width={{ base: '100%', lg: '941px' }}
              mx="auto"
              borderRadius="8px"
              pt={isMobile ? '15px' : '30px'}
              pb="30px"
              px={isMobile ? '0' : 124}
              border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
          >
            <Text
                letterSpacing="-1.2%"
                variant="head"
                textAlign={{ base: 'left', md: 'center' }}
                mb={2}
                color={'#222B38'}
            >
              Enter Business Address
            </Text>
            <Text variant="sm" mb={6} textAlign={{ base: 'left', md: 'center' }}               color={'#222B38'}>
              Enter the address of the business/store
            </Text>

            <VStack spacing="20px" mt="25px">
              {/* Market location */}
              <RadioInputButton
                  value={typeof formData.locatedInMarket === 'boolean' ? (formData.locatedInMarket ? 'yes' : 'no') : ''}
                  label="Is the Customer Business Address located in a market?"
                  onChange={(val) =>
                      handleChange('locatedInMarket', val === 'yes')
                  }
              />


             <Box w={'full'}  mt={'24px'}>
               <Text variant="sm" textAlign={'left'} fontSize={'16px'} color={'#344256'}>
                 Please provide the Customer&apos;s Business Address
               </Text>
             </Box>
              {/* Residential override */}
              {!formData.locatedInMarket && (
                  <Flex
                      w="full"
                      align="center"

                  >
                    <Switch
                        isChecked={formData.isResidentialAddress}
                        onChange={(e) =>
                            handleChange('isResidentialAddress', e.target.checked)
                        }
                        sx={{
                          '& .chakra-switch__track[data-checked]': {
                            bg: '#0F454F',
                          },
                        }}
                    />
                    <Text ml={3} variant="sm" fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'}>
                      Store/business address is the same as the business’ residential address
                    </Text>
                  </Flex>
              )}

              {/* State picker */}
              {!formData.isResidentialAddress && (
                <>
                <FormControlButton
                  label="State"
                  items={states}
                  defaultValue={businessDetails?.businessState}
                  value={formData.businessState}
                  onChange={(it) => handleChange('businessState', it.value)}
                  // isDisabled={
                  //     !formData.locatedInMarket || formData.isResidentialAddress
                  // }
              />

              {/* LGA picker */}
              <FormControlButton
                  label="LGA"
                  items={lgas}
                  defaultValue={businessDetails?.businessLga}
                  value={formData.businessLga}
                  onChange={(it) => handleChange('businessLga', it.value)}
                  isDisabled={!businessState}
                  onClick={() => {
                    if (!businessState) onOpen();
                  }}
              />

              {/* Address description */}
              <BaseFormControl label="Shop Address Description">
                <BaseInput
                    value={formData.fullShopAddress}
                    onChange={(e) =>
                        handleChange('fullShopAddress', e.target.value)
                    }
                />
              </BaseFormControl>
              </>
            )}

              {/* Market-only fields */}
              {formData.locatedInMarket && (
                  <>
                    <BaseFormControl label="Market Name">
                      <BaseInput
                          value={formData.marketName}
                          onChange={(e) =>
                              handleChange('marketName', e.target.value)
                          }
                      />
                    </BaseFormControl>

                    <BaseFormControl label="Store Line/Number">
                      <BaseInput
                          value={formData.storeNumber}
                          onChange={(e) =>
                              handleChange('storeNumber', e.target.value)
                          }
                      />
                    </BaseFormControl>
                  </>
              )}

              {/* Photo upload */}
              <CameraUpload
                  setImage={(url) => handleChange('photoUrl', url)}
              />

              {/* Attestation */}
              <AttestationCheckbox
                  w="full"
                  isChecked={isAttested}
                  onChange={setIsAttested}
                  label="I attest that all info is correct"
                  pb={5}
              />

              <BaseButton

                  w="full"
                  h="56px"
                  text={fromStep ? "Update": "Continue"}
                  color={'white'}
                  variant="ghost"
                  border="1.2px solid #6F8F95"
                  borderRadius="8px"
                  isDisabled={isButtonDisabled}
                  onClick={handleContinue}
              />
            </VStack>
          </Box>
        </Box>

        {/* Drawer for “select a state first” */}
        {isOpen && (<Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
              alignSelf="center"
              w={{ base: '100%', md: '50%' }}
              maxW="600px"
              mx="auto"
              borderTopRadius="8px"
          >
            <DrawerCloseButton />
            <DrawerHeader>
              <Center>
                <Text color="#344256" fontWeight="500" fontSize="16px">
                  No Information
                </Text>
              </Center>
            </DrawerHeader>
            <DrawerBody>
              <Center>
                <Text color="#344256" fontWeight="400" fontSize="14px" my="27px">
                  Please select a state to proceed
                </Text>
              </Center>
            </DrawerBody>
          </DrawerContent>
        </Drawer>)}
      </Flex>
  );
};

export default BusinessAddress;