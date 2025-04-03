import { Flex, Box, Heading, useBreakpointValue, Text, VStack, Image } from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import AttestationCheckbox from 'components/molecules/inputs/AttestationCheckBox';
import BaseInput from 'components/molecules/inputs/BaseInput';
import FloatingLabelSelect from 'components/molecules/inputs/FloatingLabelSelect';
import RadioInputtButton from 'components/molecules/inputs/RadioInputButton';
import CameraUpload from 'components/organisms/forms/CameraUploadForm';
import React, { useState } from 'react';

interface BusinessAddressProps {
  onBack: () => void;
  onNext: () => void;
}

const BusinessAddress = ({ onBack, onNext }: BusinessAddressProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [formData, setFormData] = useState({
    state: '',
    lga: '',
    isInMarket: '',
    marketName: '',
    storeLine: '',
    addressDescription: '',
    capturedImage: null as string | null, // Initialize capturedImage to null
  });
  const [isAttested, setIsAttested] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAttestationChange = (checked: boolean) => {
    setIsAttested(checked);
  };

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} />
      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={isMobile ? '100%' : '940px'}
          mx="auto"
          h={isMobile ? 'auto' : '1058px'}
          borderRadius="8px"
          pt={isMobile ? '15px' : '30px'}
          pb="30px"
          px={isMobile ? '0px' : 124}
          border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
        >
          <Heading
            as="h1"
            fontSize="18px"
            fontWeight={700}
            color="#222B38"
            textAlign={isMobile ? 'left' : 'center'}
            mb={2}
          >
            Enter Business Address
          </Heading>

          <Text
            fontSize="14px"
            color="#344256"
            fontWeight={400}
            mb={6}
            textAlign={isMobile ? 'left' : 'center'}
          >
            Enter the address of the business/store
          </Text>

          <VStack mt={'35px'} gap={'24px'}>
            <RadioInputtButton
              value={formData.isInMarket}
              label="Is the Customer Business Address located in a market?"
              onChange={(value) => handleChange('isInMarket', value)}
            />

            <FloatingLabelSelect
              label="State"
              placeholder="Select State"
              options={[
                { label: 'Nigeria', value: 'nigeria' },
                { label: 'Ghana', value: 'ghana' },
                { label: 'Niger', value: 'wuse' },
              ]}
              onChange={(value) => handleChange('state', value)}
            />

            <FloatingLabelSelect
              label="LGA"
              placeholder="Select LGA"
              options={[
                { label: 'Nigeria', value: 'nigeria' },
                { label: 'Ghana', value: 'ghana' },
                { label: 'Niger', value: 'wuse' },
              ]}
              onChange={(value) => handleChange('lga', value)}
            />

            <BaseFormControl border={'0px'} label={'Market Name'}>
              <BaseInput
                placeholder=""
                value={formData.marketName}
                onChange={(e: any) => handleChange('marketName', e.target.value)}
              />
            </BaseFormControl>
            <BaseFormControl label={'Store Line/Number'}>
              <BaseInput
                placeholder=""
                value={formData.storeLine}
                onChange={(e: any) => handleChange('storeLine', e.target.value)}
              />
            </BaseFormControl>
            <BaseFormControl label={'Shop Address Description'}>
              <BaseInput
                placeholder=""
                value={formData.addressDescription}
                onChange={(e: any) => handleChange('addressDescription', e.target.value)}
              />
            </BaseFormControl>

              
            <CameraUpload setImage={(image) => handleChange('capturedImage', image)} />
          

            <AttestationCheckbox
             w={'full'}
             isChecked={isAttested}
             onChange={handleAttestationChange}
             label="I attest that all the information provided is correct"
            />

            <BaseButton
                    variant={'ghost'}
                text={'Continue'}
                onClick={onNext}
                border={'1.2px solid #6F8F95'}
                borderRadius={'8px'}
                w={'full'}
                mt={'36px'}
                _focus={'none'}
                h={'56px'}

                />
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default BusinessAddress;