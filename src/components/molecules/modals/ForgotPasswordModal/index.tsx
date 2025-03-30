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
import { IForgotPasswordModalProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';

const ForgotPasswordModal = ({
  isOpen,
  onClose,
  ...props
}: IForgotPasswordModalProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" trapFocus={true} autoFocus={false}>
      <ModalOverlay />
      <ModalContent 
        {...props} 
      >
        <ModalCloseButton display={{base: 'inline-block', md: 'none'}} />
        <ModalBody>
          <VStack alignItems={{base:'flex-start', md: 'center'}} position={'relative'} spacing={4}>
            <ForgotPasswordIcon  />
            <Text fontSize="16px" fontWeight={500} lineHeight="24.63px" letterSpacing="-1.2%" color="#344256">
              Forgot Password?
            </Text>
            <Text fontSize="14px" fontWeight={400} lineHeight="22px" letterSpacing="-1%" color="#222B38">
              Please contact Admin
            </Text>

            <BaseButton
              variant={"ghost"}
              text={'Okay'}
              onClick={() => onClose()}
              backgroundColor="#FFFFFF"
              color="#0F454F"
              borderRadius={"8px"}
              border={'1.2px solid #0F454F'}
              h={"56px"}
              w={{base: '100%', md: '520px'}}
              />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
