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

const FailedModal = ({
  isOpen,
  onClose,
  height,
  title,
  title2,
  ...props
}: IUpdateUserModalProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" trapFocus={true} autoFocus={false}>
      <ModalOverlay />
      <ModalContent 
        height={height || '419.99px'}
        {...props}
      >
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={8} mt={-4}>
            <VStack spacing={1}>
              <FailedIcon />
              <Modaltext title={title} variant={'md'} lineHeight="24px" textAlign={'center'}/>
              {title2 && <Modaltext title={title2} variant={'sml'} lineHeight="24px" textAlign={'center'}/>}
            </VStack>

            <OutlineButton 
              text="Dismiss" 
              color={'#EF4444'} 
              width="full" 
              height="56px" 
              mt={5}
              border={"1px solid #EF4444"} 
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FailedModal;
