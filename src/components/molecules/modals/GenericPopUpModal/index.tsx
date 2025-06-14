import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import { INotificationModalProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';

const GenericPopUpModal = ({
  isOpen,
  onClose = () => {},
  icon,
  cancelText,
  acceptText,
  onYesClick,
  onNoClick,
  textStyles,
  titleText,
  ...props
}: INotificationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backgroundColor="rgba(0,0,0, 0.6)"  />
      <ModalContent borderRadius="2xl" boxShadow="lg" {...props}>
        <ModalBody w={'full'} >

          <VStack w={'full'} spacing={6} align="center" py={6}>
            {icon && React.isValidElement(icon) ? icon : null}

            {titleText}

            <VStack spacing={4} width="full" >
              <BaseButton
                  variant={'ghost'}
                text={acceptText}
                onClick={onYesClick}
                  bg={'#CFDADC'}
                borderTopRadius="xl"
                borderBottomRadius="sm"
                w={'full'}
                  h={'48px'}
              />
              <BaseButton
                  variant={'ghost'}
                  bg={'#CFDADC'}
                text={cancelText}
                onClick={onNoClick}
                borderTopRadius="sm"
                borderBottomRadius="xl"
                w={'full'}
                h={'48px'}

              />
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GenericPopUpModal;