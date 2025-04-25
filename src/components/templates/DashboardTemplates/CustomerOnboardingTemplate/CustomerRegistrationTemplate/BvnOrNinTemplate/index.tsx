'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Link, Show,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import BaseButton from '../../../../../molecules/buttons/BaseButton';
import FailedModal from '../../../../../molecules/modals/FailedModal';
import ChooseVerificationModal from '../../../../../molecules/modals/ChooseVerificationModal';
import HeaderBackButton from '../../../../../molecules/buttons/HeaderBackButton';
import {
  useVerifyBVN,
  useVerifyNIN,
} from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store';
import { DocumentType } from '../../../../../../redux/slices/customer/interface';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../../../../../redux/slices/customer';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import BaseInput from 'components/molecules/inputs/BaseInput';
import CbnIcon from 'components/atoms/icons/Cbncon';
import NdicIcon from 'components/atoms/icons/NdicIcon';

interface BvnOrNinTemplateProps {
  onVerify: (type: 'BVN' | 'NIN', value: string) => void; // callback with user input
  onBack: () => void;
  onCameraSelect: () => void;
  onAttachmentSelect: () => void;
}

const BvnOrNinTemplate: React.FC<BvnOrNinTemplateProps> = ({
  onVerify,
  onBack,
  onCameraSelect,
  onAttachmentSelect,
}) => {
  const dispatch = useDispatch();
  const { customerDetails } = useAppSelector((state) => state.customer);

  const {
    isOpen: isOpenOne,
    onOpen: onOpenOne,
    onClose: onCloseOne,
  } = useDisclosure();
  const {
    isOpen: isOpenTwo,
    onOpen: onOpenTwo,
    onClose: onCloseTwo,
  } = useDisclosure();

  const {
    onOpen: onVerificationMethodOpen,
    isOpen: isVerificationMethodOpen,
    onClose: onVerificationMethodClose,
  } = useDisclosure();

  const [inputValue, setInputValue] = useState(
    customerDetails?.selectedDocumentType === DocumentType.BVN
      ? customerDetails?.bvn
      : customerDetails?.nin || '',
  );
  const [hasAgreed, setHasAgreed] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { mutateAsync: verifyBVN, isPending: isverifyingBVN } = useVerifyBVN();
  const { mutateAsync: verifyNIN, isPending: isverifyingNIN } = useVerifyNIN();

  // If "BVN" is selected => max length = 10, else 11 for "NIN"
  const isBvn = customerDetails?.selectedDocumentType === DocumentType.BVN;
  const maxLength = isBvn ? 11 : 11;

  // The button label changes depending on the selection
  const buttonLabel = isBvn ? 'Verify BVN' : 'Verify NIN';

  // Button is enabled only if length matches and checkbox is checked
  const isButtonDisabled = inputValue.length !== maxLength || !hasAgreed;

  useEffect(() => {
    dispatch(
      setCustomer({
        ...customerDetails,
        selectedDocumentType:
          customerDetails?.selectedDocumentType || DocumentType.BVN,
      }),
    );
  }, []);

  const handleVerify = async () => {
    if (isButtonDisabled) return;
    if (isBvn) {
      const payload = {
        type: 'bvn',
        bvn: inputValue,
        userId: customerDetails?.id,
      };
      try {
        await verifyBVN(payload);
        onVerificationMethodOpen();
        dispatch(setCustomer({ ...customerDetails, bvn: inputValue }));
      } catch (error) {
        console.error('Error verifying BVN:', error);
        onOpenOne();
      }
      return;
    }

    const payload = {
      //type: 'nin',
      bvn: inputValue,
      userId: customerDetails?.id,
    };

    try {
      await verifyNIN(payload);
      onVerificationMethodOpen();
      //onNext(); // Proceed to the next step
      dispatch(setCustomer({ ...customerDetails, nin: inputValue }));
    } catch (error) {
      console.error('Error verifying NIN:', error);
      onOpenTwo();
    }
  };

  return (
    <Flex direction="column" minH="100vh" bg="#F8FAFC">
      <HeaderBackButton onBack={onBack} />

      {/* Main Content */}
      <Box px={{ base: 0, md: 4 }} pt={4} pb={8} >
        <Box
          bg={{ base: '', md: 'white' }}
          width={isMobile ? '100%' : '941px'}
          mx="auto"
          borderRadius="8px"
          boxShadow={isMobile ? 'none' : 'md'}
          alignItems={'center'}
          pt={4}
          pb={'74px'}


        >
          <Box px={{
            base:5, md:0
          }} >
            <Heading
                fontSize="18px"
                fontWeight="700"
                textAlign={{
                  base: 'left',
                  md: 'center',
                }}
                mb={2}
                color="#222B38"
            >
              Enter User’s BVN or NIN
            </Heading>

            <Text
                fontSize="14px"
                fontWeight="400"
                color="#344256"
                mb={8}
                textAlign={{
                  base: 'left',
                  md: 'center',
                }}
                lineHeight={'22px'}
            >
              Please provide either the User’s BVN or NIN Number
            </Text>

            {/* Toggle Switch (BVN / NIN) */}
            <Text
                fontSize="16px"
                fontWeight="500"
                mt={6}
                mb={2}
                textAlign={{
                  base: 'left',
                  md: 'center',
                }}
                color={'#222B38'}
            >
              Select Either BVN or NIN
            </Text>
          </Box>


          {/*
            Pill container with #CBD5E1 background.
            Inside, two "tabs" for BVN and NIN.
          */}
          <HStack  bg="#CBD5E1" borderRadius="8px" p="4px" mb={4} spacing={0} mx={{
            base: 5,
            md: '30%',
          }} >
            {/* BVN Tab */}
            <Box
              as="button"
              flex="1"
              textAlign="center"
              py={2}
              borderRadius="8px"
              bg={
                customerDetails?.selectedDocumentType === DocumentType.BVN
                  ? 'white'
                  : 'transparent'
              }
              color={
                customerDetails?.selectedDocumentType === DocumentType.BVN
                  ? '#344256'
                  : '#F8FAFC'
              }
              fontWeight="600"
              onClick={() => {
                setInputValue(''); // reset input
                dispatch(
                  setCustomer({
                    ...customerDetails,
                    selectedDocumentType: DocumentType.BVN,
                  }),
                );
              }}
            >
              BVN
            </Box>

            {/* NIN Tab */}
            <Box
              as="button"
              flex="1"
              textAlign="center"
              py={2}
              borderRadius="8px"
              bg={
                customerDetails?.selectedDocumentType === DocumentType.NIN
                  ? 'white'
                  : 'transparent'
              }
              color={
                customerDetails?.selectedDocumentType === DocumentType.NIN
                    ? '#344256'
                    : '#F8FAFC'
              }
              fontWeight="600"
              onClick={() => {
                setInputValue(''); // reset input
                dispatch(
                  setCustomer({
                    ...customerDetails,
                    selectedDocumentType: DocumentType.NIN,
                  }),
                );

                dispatch;
              }}
            >
              NIN
            </Box>
          </HStack>

          {/* Input Field */}
          <Box position="relative" mb={2} mx={{
            base: 5,
            md: '16%',
          }}>
            <BaseFormControl
              mb={{ base: '20px', md: '5px' }}
              label={isBvn ? "Enter User's BVN" : "Enter User's NIN"}
            >
              <BaseInput
                placeholder=""
                type="tel"
                inputMode="numeric"
                pattern="\d*"
                maxLength={maxLength}
                value={inputValue}
                onChange={(e: any) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '');
                  setInputValue(digitsOnly);
                }}
              />
            </BaseFormControl>
            {/* Character Count */}
            <Show above="md">
              <HStack justifyContent="flex-end" mb={0} mr={2}>
                <Text fontSize="12px" color="#344256">
                  {inputValue.length}/{maxLength}
                </Text>
              </HStack>
            </Show>
          </Box>



          {/* Terms & Conditions Section (gray background, top border radius) */}
          <Box mt={6} px={4} py={{
            base:'22px',
            md:'16px'
          }} borderTop={'1px solid #CBD5E1'} borderBottom={'1px solid #CBD5E1'}>
            <HStack alignItems="center" justifyContent={'center'} spacing={4}>
              <Checkbox
                isChecked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                borderRadius={'4px'}
                size={'lg'}
                sx={{
                    '.chakra-checkbox__control[data-checked]': {
                      bg: '#0F454F',
                    },
                    // For checkmark color
                    '.chakra-checkbox__control[data-checked] .chakra-checkbox__icon': {
                      color: 'white'
                    }
                  }}                
              />
              <Text fontSize="14px" color="#344256" lineHeight="20px">
                This user has read and agreed to OneWallet{' '}
                <Link color="#C5B27D" textDecoration="underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link color="#C5B27D" textDecoration="underline">
                  Privacy Policy
                </Link>
                .
              </Text>
            </HStack>
          </Box>

          {/* Verify Button */}
          <Box mt={'36px'}  mx={{
            base: 5,
            md: '12%',
          }}>
            <BaseButton
              width="100%"
              height="48px"
              borderRadius="8px"
              bg={!isButtonDisabled ? '#0F454F' : '#E2E8F0'}
              color={!isButtonDisabled ? 'white' : '#94A3B8'}
              fontWeight="600"
              isLoading={isverifyingBVN || isverifyingNIN}
              onClick={handleVerify}
              isDisabled={isButtonDisabled}
              text={buttonLabel}
            />
          </Box>
        </Box>
      </Box>

      {/* Footer (Logos or text, if needed) */}
      <Flex
        pos="absolute"
        bottom={{base: 0, md: 15}}
        w="full"
        h="52px"
        mt="auto"
        py={2}
        justifyContent="center"
        alignItems="center"
        bg={{base: "white", md: "transparent"}}
      >
        {/* Example placeholder for your footer logos or text */}
        <HStack>
          {/* Some logo SVG */}
          <Box as="span"><CbnIcon /></Box>
          <Text fontSize="12px" color="#344256" fontWeight="500" mt={1}>
            Licensed by the CBN and insured by the
          </Text>
          <Box as="span"><NdicIcon /></Box>

        </HStack>
      </Flex>

      {/* Failed Modal */}
      {isOpenOne && (
        <FailedModal
          isOpen={isOpenOne}
          onClose={onCloseOne}
          title="Error Message:"
          title2="BVN is already linked to an existing account, Please Enter User's BVN or proceed to Login"
          //width={{ xs: "95%", lg: "843px" }}
          height="auto"
          borderRadius="8px"
          padding="24px"
          borderTopRadius={'26.81px'}
          borderBottomRadius={'26.81px'}
        />
      )}

      {isOpenTwo && (
        <FailedModal
          isOpen={isOpenTwo}
          onClose={onCloseTwo}
          title="Error Message:"
          title2="NIN is already linked to an existing account, Please Enter User's NIN or proceed to Login"
          //width={{ xs: "95%", lg: "843px" }}
          height="auto"
          borderRadius="8px"
          padding="24px"
          borderTopRadius={'26.81px'}
          borderBottomRadius={'26.81px'}
        />
      )}

      <ChooseVerificationModal
        isOpen={isVerificationMethodOpen}
        onClose={onVerificationMethodClose}
        onChooseCamera={onCameraSelect}
        onChooseUpload={onAttachmentSelect}
      />
    </Flex>
  );
};

export default BvnOrNinTemplate;
