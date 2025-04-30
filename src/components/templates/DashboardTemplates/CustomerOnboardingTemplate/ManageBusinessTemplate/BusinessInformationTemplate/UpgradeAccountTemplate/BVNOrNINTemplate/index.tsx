import React, { use, useEffect, useState } from 'react';
import { Box, Flex, Heading, HStack, Input, Text, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import FailedModal from 'components/molecules/modals/FailedModal';
import SuccessModal from 'components/molecules/modals/SuccessModal';
import {useAppDispatch, useAppSelector} from "../../../../../../../../redux/store";
import { setUpgrade } from '../../../../../../../../redux/slices/upgrade';
import { useParams, useRouter } from 'next/navigation';
import { useFetchCustomer, useUpgradeTierTwo } from 'api-services/business-services';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import BaseInput from 'components/molecules/inputs/BaseInput';

interface EnterBVNOrNINProps {
    onNext: () => void;
    onBack: () => void;
}

const BVNOrNINTemplate = ({onNext, onBack}: EnterBVNOrNINProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isBvn, setIsBvn] = useState(false);
  const router = useRouter()

  const toast = useToast();
  const id = useParams();

  const dispatch = useAppDispatch()
  const { upgradeDetails } = useAppSelector(state => state.upgrade)

  const maxLength = isBvn ? 11 : 11;
  const [inputValue, setInputValue] = useState('')
  const isButtonDisabled = inputValue.length !== maxLength;

  const { isOpen: isOpenOne, onOpen: onOpenOne, onClose: onCloseOne } = useDisclosure()
  const { isOpen: isOpenTwo, onOpen: onOpenTwo, onClose: onCloseTwo } = useDisclosure()

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('');

  const { mutateAsync: upgradeTierTwo, isPending: isUpgrading } = useUpgradeTierTwo();
  //const { mutateAsync: fetchCustomer, data: customer, isPending: isFetchingCustomer } = useFetchCustomer(id?.id as string);
  
    // useEffect(() => {
    //   fetchCustomer();
    // }, []);

    useEffect(() => {
      if (upgradeDetails?.currentVerificationType === 'BVN') {
        setIsBvn(false);
        return
      }
      if (upgradeDetails?.currentVerificationType === 'NIN') {
        setIsBvn(true);
        return
      }
    }, [upgradeDetails]);
  

  const handleContinue = async () => {
    try {
      if (inputValue?.length !== 11) {
        toast({
          title: isBvn ? 'Invalid BVN' : 'Invalid NIN',
          description: isBvn ? 'BVN number must be 11 digits' : 'NIN number must be 11 digits',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      const payload = isBvn
        ? { bvn: inputValue, userId: id?.id as string }
        : { nin: inputValue, userId: id?.id as string };

      await upgradeTierTwo(payload);

      setSuccessMessage(
        isBvn
          ? 'You have successfully submitted the BVN of this customer'
          : 'You have successfully submitted the NIN of this customer'
      );
      onOpenTwo();
      // onNext();
  
    } catch (error: any) {
      // Show the error modal
      setErrorMessage(error?.message || 'An error occurred');
      onOpenOne();
    }
  };
  

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton header='Account Upgrade - Tier 2' onBack={()=> router.back()}/>
        <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
            <Box
            bg={isMobile ? '#F8FAFC' : 'white'}
            width={{base : '100%', lg : '941px'}}
            mx="auto"
            h={isMobile ? 'auto' : '317px'}
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
                onClick={() => onOpenTwo()}
            >
                {isBvn ? "Enter BVN Number" : "Enter NIN Number"}
            </Text>

            <Text
                letterSpacing={'-1%'}
                variant={'sm'}
                mb={6}
                textAlign={{
                    base: 'left',
                    md: 'center',
                }}
            >
                {isBvn ? "Enter the BVN number of user" : "Enter the NIN number of user"}
            </Text>

            {/* Input Field */}
            <Box position="relative" mb={2}>
                <BaseFormControl
                  mb={{ base: '20px', md: '24px' }}
                  label={isBvn ? "Enter BVN" : "Enter NIN"}
                  >
                  <BaseInput
                  placeholder=""
                  type="tel"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={11}
                  value={inputValue}
                  onChange={(e: any) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '');
                      setInputValue(digitsOnly);
                  }}
                  />
              </BaseFormControl>
            </Box>

            {/* Character Count */}
            <HStack justifyContent="flex-end" mb={0}>
                <Text fontSize="12px" color="#344256">
                    {inputValue.length}/{maxLength}
                </Text>
            </HStack>

            <BaseButton
                width="100%"
                height="48px"
                borderRadius="8px"
                bg={!isButtonDisabled ? '#0F454F' : '#E2E8F0'}
                color={!isButtonDisabled ? 'white' : '#94A3B8'}
                fontWeight="600"
                isLoading={isUpgrading}
                onClick={handleContinue}
                isDisabled={isButtonDisabled}
                text={'Continue'}
            />
        </Box>
      </Box>

      {/* Failed Modal */}
        {isOpenOne && <FailedModal
            isOpen={isOpenOne}
            onClose={onCloseOne}
            title="Error Message:"
            title2={errorMessage  || "NIN does not exist or is incorrect"}
            height="auto"
            borderRadius="8px"
            padding="24px"
            borderTopRadius={'26.81px'}
            borderBottomRadius={'26.81px'}
        />}

        {/* Success Modal */}
        {isOpenTwo && <SuccessModal
            isOpen={isOpenTwo}
            onClose={onNext}
            title="Submission Successful"
            title2={successMessage}
            height={"240px"}
            borderRadius="8px"
            padding="24px"
            borderTopRadius={'26.81px'}
            borderBottomRadius={'26.81px'}
            btnText={'Done'}
        />}
    </Flex>
  );
};

export default BVNOrNINTemplate;