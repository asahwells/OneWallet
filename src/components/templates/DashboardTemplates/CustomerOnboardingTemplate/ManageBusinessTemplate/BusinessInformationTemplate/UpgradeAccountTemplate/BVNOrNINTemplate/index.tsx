import React, { useState } from 'react';
import { Box, Flex, Heading, HStack, Input, Text, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import FailedModal from 'components/molecules/modals/FailedModal';
import SuccessModal from 'components/molecules/modals/SuccessModal';
import {useAppDispatch, useAppSelector} from "../../../../../../../../redux/store";
import { setUpgrade } from '../../../../../../../../redux/slices/upgrade';
import { useParams } from 'next/navigation';
import { useUpgradeTierTwo } from 'api-services/business-services';

interface EnterBVNOrNINProps {
    onNext: () => void;
    onBack: () => void;
}

const BVNOrNINTemplate = ({onNext, onBack}: EnterBVNOrNINProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isBvn, setIsBvn] = useState(false);

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
      <HeaderBackButton header='Account Upgrade - Tier 2'/>
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
                <Input
                    placeholder={isBvn ? "Enter BVN" : "Enter NIN"}
                    maxLength={maxLength}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    borderRadius="8px"
                    borderColor="#E2E8F0"
                    focusBorderColor="#CBD5E1"
                    height="48px"
                    fontSize="16px"
                />
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