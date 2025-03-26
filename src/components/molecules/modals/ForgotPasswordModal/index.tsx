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
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <ForgotPasswordIcon />
            <Text fontSize="40px" fontWeight={500} lineHeight="48px" letterSpacing="-2.8%" color="#344256">
              Forgot Password?
            </Text>
            <Text fontSize="20px" fontWeight={400} lineHeight="32px" letterSpacing="-1.4%" color="#344256">
              Please contact Admin
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
