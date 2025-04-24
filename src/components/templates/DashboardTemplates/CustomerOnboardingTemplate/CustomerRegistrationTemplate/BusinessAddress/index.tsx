import React, { useEffect, useMemo, useState } from 'react';
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

const BusinessAddress = ({ onBack, onNext }: BusinessAddressProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // 2) Access relevant slices from Redux (optional – adjust to your slice names)
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { businessDetails } = useAppSelector((state) => state.business);

  // Local form data
  const [formData, setFormData] = useState({
    businessState: businessDetails?.businessState || '',
    businessLga: businessDetails?.businessLga || '',
    locatedInMarket: businessDetails?.locatedInMarket || '',
    marketName: businessDetails?.marketName || '',
    storeNumber: businessDetails?.storeNumber || '',
    fullShopAddress: businessDetails?.fullShopAddress || '',
    photoUrl: businessDetails?.photoUrl || '',
    isResidentialAddress: businessDetails?.isResidentialAddress || false,
  });

  const [isResidentialAddress, setIsSameAsResidential] = useState(
    businessDetails?.isResidentialAddress || false
  );

  // New state for holding fetched states and LGAs
  const [states, setStates] = useState<{ name: string, value: string }[]>([]);
  const [lgas, setLgas] = useState<{ name: string, value: string }[]>([]);
  const [state, setState] = useState(formData.businessState); // Set initial state from formData
  const [isAttested, setIsAttested] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'businessState') {
      console.log('State changed:', value);
      setState(value); // Update state when businessState changes
    }
  };

  // Fetch states and LGAs when component mounts or state changes
  useEffect(() => {
    const fetchData = async () => {
      const stateData = await fetchStates();
      setStates(stateData);

      // Fetch LGAs only if state is selected
      if (state) {
        const lgaData = await fetchLGA(state);
        setLgas(lgaData);
      }
    };

    fetchData();
  }, [state]); // Fetch states and LGAs whenever state changes

  const handleAttestationChange = (checked: boolean) => {
    setIsAttested(checked);
  };

  const handleContinue = () => {
    dispatch(
      setBusiness({
        ...businessDetails,
        ...formData,
      })
    );

    onNext();
  };

  const isButtonDisabled = useMemo(() => {
    const {
      businessState,
      businessLga,
      marketName,
      storeNumber,
      fullShopAddress,
      photoUrl,
      locatedInMarket,
    } = formData;

    if (formData.locatedInMarket === 'no' && !isResidentialAddress) {
      return !businessState || !businessLga || !fullShopAddress || !photoUrl || !isAttested;
    }

    if (formData.locatedInMarket === 'no' && isResidentialAddress) {
      return !photoUrl || !isAttested;
    }
    // If locatedInMarket is 'yes', check for marketName and storeNumber
    if (formData.locatedInMarket === 'yes' ) {
      return !businessState || !businessLga || !marketName || !storeNumber || !fullShopAddress || !photoUrl || !isAttested;
    }

    if (formData.locatedInMarket === '') {
      return !locatedInMarket || !isAttested;
    }
    
  }, [formData, isAttested]);

  const handleLocatedInMarketChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      locatedInMarket: value,
      businessState: '',  // Reset businessState
      businessLga: '',    // Reset businessLga
    }));
    setState(''); // Reset state when locatedInMarket changes
    setLgas([]); // Reset LGAs when locatedInMarket changes
  };


  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} header="Business Setup" />

      <Box px={{base: '20px', md: 4}} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={{ base: '100%', lg: '941px' }}
          mx="auto"
          h={isMobile ? 'auto' : '1058px'}
          borderRadius="8px"
          pt={isMobile ? '15px' : '30px'}
          pb="30px"
          px={isMobile ? '0px' : 124}
          border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
        >
          <Text
            letterSpacing={'-1.2%'}
            variant={'head'}
            textAlign={{
              base: 'left',
              md: 'center',
            }}
            mb={2}
          >
            Enter Business Address
          </Text>

          <Text
            variant={'sm'}
            mb={6}
            textAlign={{
              base: 'left',
              md: 'center',
            }}
          >
            Enter the address of the business/store
          </Text>

          <VStack mt="25px" gap="10px">
            {/* Market location Radio */}
            <RadioInputButton
              value={formData.locatedInMarket}
              label="Is the Customer Business Address located in a market?"
              onChange={(value) => handleLocatedInMarketChange(value)}
            />

            {formData.locatedInMarket === 'no' ? (
              <>
                <Flex 
                w="full" 
                alignItems="center" 
                justifyContent="space-between" 
                p="4" 
                border="1px solid #E2E8F0" 
                borderRadius="md"
              >
                <Switch 
                  size="md"
                  sx={{
                    '& .chakra-switch__track[data-checked]': {
                      backgroundColor: '#0F454F',
                    },
                    '& .chakra-switch__thumb': {
                      backgroundColor: 'white',
                    }
                  }}
                  isChecked={isResidentialAddress}
                  onChange={(e) => {
                    setIsSameAsResidential(e.target.checked);
                    handleChange('isSameAsResidential', e.target.checked);
                  }}
                />
                <Text variant="base" ml={3}>
                  {"Store/business address is the same as the business' residential address"}
                </Text>

              </Flex>
              {/* State Select with dynamically loaded states */}
              {!isResidentialAddress && (
                <>
                  <FormControlButton
                    label="State"
                    items={states.map((state) => ({
                      value: state.value,
                      name: state.name,
                    }))}
                    onChange={(item) => handleChange('businessState', item.value)}
                  />

                  {/* LGA Select with dynamically loaded LGAs */}
                  <FormControlButton
                    label="LGA"
                    click={state ? 'auto' : 'none'}
                    items={lgas.map((lga) => ({
                      value: lga.value,
                      name: lga.name,
                    }))}
                    onChange={(item) => handleChange('businessLga', item.value)}
                  />

                  {/* Address Description - always show this regardless of Yes/No selection */}
                  <BaseFormControl label="Shop Address Description">
                    <BaseInput
                      placeholder=""
                      value={formData.fullShopAddress}
                      onChange={(e: any) => handleChange('fullShopAddress', e.target.value)}
                    />
                  </BaseFormControl>
                </>
              )}

            {/* Camera for capturing store photo */}
              <CameraUpload setImage={(imageUrl) => handleChange('photoUrl', imageUrl)} />

            {/* Attestation Checkbox */}
            <AttestationCheckbox
              w="full"
              isChecked={isAttested}
              onChange={handleAttestationChange}
              label="I attest that all the information provided is correct"
            />

              </>
            ) : (
              // Show residential address toggle when "No" is selected
              <>
              {/* State Select with dynamically loaded states */}
              <FormControlButton
                  label="State"
                  items={states.map((state) => ({
                    value: state.value,
                    name: state.name,
                  }))}
                  onChange={(item) => handleChange('businessState', item.value)}
                />

                {/* LGA Select with dynamically loaded LGAs */}
                <FormControlButton
                  label="LGA"
                  click={state ? 'auto' : 'none'}
                  items={lgas.map((lga) => ({
                    value: lga.value,
                    name: lga.name,
                  }))}
                  onClick={() => {
                    if (!state) {
                      onOpen();
                    }
                  }}
                  onChange={(item) => handleChange('businessLga', item.value)}
                />

                {/* Market Name */}
                <BaseFormControl border="0px" label="Market Name">
                  <BaseInput
                    placeholder=""
                    value={formData.marketName}
                    onChange={(e: any) => handleChange('marketName', e.target.value)}
                  />
                </BaseFormControl>

                {/* Store Line */}
                <BaseFormControl label="Store Line/Number">
                  <BaseInput
                    placeholder=""
                    value={formData.storeNumber}
                    onChange={(e: any) => handleChange('storeNumber', e.target.value)}
                  />
                </BaseFormControl>

                {/* Address Description - always show this regardless of Yes/No selection */}
                <BaseFormControl label="Shop Address Description">
                  <BaseInput
                    placeholder=""
                    value={formData.fullShopAddress}
                    onChange={(e: any) => handleChange('fullShopAddress', e.target.value)}
                  />
                </BaseFormControl>

                {/* Camera for capturing store photo */}
                  <CameraUpload setImage={(imageUrl) => handleChange('photoUrl', imageUrl)} />

                {/* Attestation Checkbox */}
                <AttestationCheckbox
                  w="full"
                  isChecked={isAttested}
                  onChange={handleAttestationChange}
                  label="I attest that all the information provided is correct"
                />
              </>
            )}

            {/* Continue Button */}
            <BaseButton
              variant="ghost"
              text="Continue"
              color={'#FCFCFC'}
              onClick={handleContinue}
              border="1.2px solid #6F8F95"
              borderRadius="8px"
              isDisabled={isButtonDisabled} 
              w="full"
              mt="36px"
              _focus={{ outline: 'none' }}
              h="56px"
            />
          </VStack>
        </Box>
      </Box>

      {isOpen &&    <Drawer
          isOpen={isOpen}
          placement='bottom'
          onClose={onClose}

      >
        <DrawerOverlay />
        <DrawerContent
            alignSelf="center"
            borderTopRadius="8px"
            w={{ base: "100%", md: "50%" }}
            maxW="600px"             // optional cap
            mx="auto"                // ensure it’s centered
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Center>
              <Text color={'#344256'} fontWeight={'500'} fontSize={'16px'} >No Information</Text>
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <Center>
              <Text color={'#344256'} fontWeight={'400'} fontSize={'14px'} my={'27px'} >
                Please select a state to proceed
              </Text>
            </Center>
          </DrawerBody>

          {/*<DrawerFooter>*/}
          {/*    <Button variant='outline' mr={3} onClick={onClose}>*/}
          {/*        Cancel*/}
          {/*    </Button>*/}
          {/*    <Button colorScheme='blue'>Save</Button>*/}
          {/*</DrawerFooter>*/}
        </DrawerContent>
      </Drawer> }
    </Flex>
  );
};

export default BusinessAddress;
