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

const UpdateUserModal = ({
  isOpen,
  onClose,
  height,
  title,
  title2,
  onConfirm,
  ...props
}: IUpdateUserModalProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" trapFocus={true} autoFocus={false}>
      <ModalOverlay />
      <ModalContent 
        height={height || '419.99px'}
        {...props}
      >
        <ModalCloseButton color={'#DA1414'}/>
        <ModalBody>
          <VStack spacing={5}>
            <UpdateUserIcon />
            <Modaltext title={title} fontSize="16px" fontWeight={500} lineHeight="24px" color="#344256" textAlign={'center'}/>
            {title2 && <Modaltext title={title2} fontSize="16px" fontWeight={700} lineHeight="24px" color="#EF4444" textAlign={'center'}/>}
            
            <BaseButton 
                text="OKAY"
                marginTop="28px"
                color="#FCFCFC"
                width="458px"
                height="56px"
                borderRadius="8px"
                padding="12px, 24px, 12px, 24px"
                gap="8px"
                border={"1px solid #0F454F"}
                bg={"#0F454F"}
                onClick={onConfirm}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
