import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import BaseInput from 'components/molecules/inputs/BaseInput';
import BaseFormControlButton from 'components/molecules/buttons/FormControlButton';
import BaseButton from 'components/molecules/buttons/BaseButton';

import { useFetchIndustries } from 'api-services/business-registration-services';
import { ListProps } from 'components/molecules/buttons/interfaces';
import FormControlButton from 'components/molecules/buttons/FormControlButton';
import { useAddNextOfKin } from 'api-services/business-services';
import { useParams, useRouter } from 'next/navigation';

interface IIndustry {
  id: string;
  name: string;
}

interface BusinessDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const NextOfKinTemplate = ({ onBack, onNext }: BusinessDetailsProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const id = useParams();
  const router = useRouter()

  const { mutateAsync: addNextOfKin, isPending: isAdding } = useAddNextOfKin();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [relationship, setRelationship] = useState('');


  const onContinue = async() => {
    try {
      // Ensure all fields are filled before proceeding
      if (!name || !phoneNumber || !address || !relationship) {
        toast({
          title: 'Missing Fields',
          description: 'Please fill out all fields before submitting.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const payload = {
        nextOfKinRelationship: relationship,
        nextOfKinName: name,
        nextOfKinPhone: phoneNumber,
        nextOfKinAddress: address,
        userId: id?.id as string
      };

      // Call the API to add next of kin
      await addNextOfKin(payload);

      // Proceed to next step
      onNext();

    } catch (error) {

    }
  };

  const isButtonDisabled = useMemo(() => {
    return !name || !phoneNumber || !address;
  }, [name, phoneNumber, address]);

  // Local form data
    const [formData, setFormData] = useState({
      relationship: '',
      name: '',
      phoneNumber: '',
      address: '',
    });
    
    const handleChange = (name: string, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };  

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <Box w={{base:'full', lg:'fit-content'}}>
        <HeaderBackButton onBack={()=> router.back()} header="Account Upgrade - Tier 2" />
      </Box>

      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={{ base: '100%', lg: '941px' }}
          mx="auto"
          h={isMobile ? 'auto' : '540px'}
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
            Next of Kin
          </Text>

          <Text
            variant={'sm'}
            mb={6}
            textAlign={{
                base: 'left',
                md: 'center',
            }}
          >
            {`Enter the Customer's Next of Kin`}
          </Text>

          <VStack gap="24px">
            <FormControlButton
              label="Relationship"
              items={[
                { name: 'Brother', value: 'Brother' },
                { name: 'Sister', value: 'Sister' },
                { name: 'Father', value: 'Father' },
                { name: 'Mother', value: 'Mother' },
                { name: 'Son', value: 'Son' },
                { name: 'Daughter', value: 'Daughter' },
                { name: 'Guardian', value: 'Guardian' },
                { name: 'Step-Father', value: 'Step-Father' },
                { name: 'Step-Mother', value: 'Step-Mother' },
              ]}
              onChange={(item) => setRelationship(item.value)}
            />
            <BaseFormControl border="0px" label="Name">
              <BaseInput
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </BaseFormControl>

            <BaseFormControl border="0px" label="Phone Number">
              <BaseInput
                placeholder=""
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </BaseFormControl>

            <BaseFormControl border="0px" label="Address">
              <BaseInput
                placeholder=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </BaseFormControl>

            <BaseButton
              variant="ghost"
              text="Continue"
              color="#FCFCFC"
              onClick={onContinue}
              borderRadius="8px"
              border="1.2px solid #6F8F95"
              w="full"
              disabled={isButtonDisabled || isAdding}
              isLoading={isAdding}
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

export default NextOfKinTemplate;
