import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text
} from '@chakra-ui/react';
import ForgotPasswordIcon from 'components/atoms/icons/forgotPasswordIcon';
import { IUpdateUserModalProps } from '../interfaces';
import UpdateUserIcon from 'components/atoms/icons/UpdateUserIcon';
import BaseButton from 'components/molecules/buttons/BaseButton';
import Modaltext from 'components/atoms/texts/ModalText';
import FailedIcon from 'components/atoms/icons/FailedIcon';
import OutlineButton from 'components/molecules/buttons/OutlineButton';
import SuccessIcon from 'components/atoms/icons/SuccessIcon';
import { useRouter } from 'next/navigation';

const SuccessModal = ({
  isOpen,
  onClose,
  height,
  title,
  title2,
  btnText,
  ...props
}: IUpdateUserModalProps) => {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} isCentered={true} onClose={onClose} size="lg" trapFocus={true} autoFocus={false}>
      <ModalOverlay />
      <ModalContent 
        height={{base: '270px', lg: height || '419.99px'}}
        w={'full'}
        mx={'7px'}
        {...props}
      >
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={8} mt={-4}>
            <VStack spacing={1}>
              <SuccessIcon />
              <Modaltext title={title} variant={'md'} lineHeight="24px" textAlign={'center'}/>
              {title2 && <Modaltext title={title2} variant={'sml'} lineHeight="24px" textAlign={'center'}/>}
            </VStack>

            <BaseButton 
                text={btnText ?? "Continue"}
                marginTop="28px"
                color="#FCFCFC"
                width="full"
                height="56px"
                borderRadius="8px"
                padding="12px, 24px, 12px, 24px"
                gap="8px"
                border={"1px solid #0F454F"}
                bg={"#0F454F"}
                onClick={onClose}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
