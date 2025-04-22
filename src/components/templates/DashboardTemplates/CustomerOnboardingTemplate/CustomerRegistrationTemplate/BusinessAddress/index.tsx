import React, { useMemo, useState } from 'react';
import { Flex, Box, Heading, useBreakpointValue, Text, VStack } from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import AttestationCheckbox from 'components/molecules/inputs/AttestationCheckBox';
import BaseInput from 'components/molecules/inputs/BaseInput';
import RadioInputButton from 'components/molecules/inputs/RadioInputButton';
import CameraUpload from 'components/organisms/forms/CameraUploadForm';

// 1) Import your Redux hooks and action
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { setBusiness } from '../../../../../../redux/slices/business';
import FormControlButton from 'components/molecules/buttons/FormControlButton';

interface BusinessAddressProps {
  onBack: () => void;
  onNext: () => void;
}

const BusinessAddress = ({ onBack, onNext }: BusinessAddressProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // 2) Access relevant slices from Redux (optional – adjust to your slice names)
  const dispatch = useAppDispatch();
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
  });

  const [isAttested, setIsAttested] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };  

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
    } = formData;

    return !businessState || !businessLga || !marketName || !storeNumber || !fullShopAddress || !photoUrl || !isAttested;
  }, [formData, isAttested]);


  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} header="Business Setup" />

      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
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

          <VStack mt="35px" gap="24px">
            {/* Market location Radio */}
            <RadioInputButton
              value={formData.locatedInMarket}
              label="Is the Customer Business Address located in a market?"
              onChange={(value) => handleChange('locatedInMarket', value)}
            />

            {/* State Select */}
            <FormControlButton
              label="State"
              items={[
                { name: 'Abuja', value: 'Abuja' },
                { name: 'Lagos', value: 'Lagos' },
                { name: 'Plateau', value: 'Plateau' },
              ]}
              onChange={(item) => handleChange('businessState', item.value)}
            />

            {/* LGA Select */}
            <FormControlButton
              label="LGA"
              items={[
                { name: 'Bwari', value: 'Bwari' },
                { name: 'Wuse', value: 'Wuse' },
                { name: 'Karu', value: 'Karu' },
              ]}
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

            {/* Address Description */}
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
    </Flex>
  );
};

export default BusinessAddress;
