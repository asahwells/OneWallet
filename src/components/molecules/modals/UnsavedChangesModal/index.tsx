import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { INotificationModalProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';
import InfoIcon from 'components/atoms/icons/InfoIcon';

const UnsaveChangesModal = ({
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
    const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backgroundColor="rgba(0,0,0, 0.6)"  />
      <ModalContent borderRadius="2xl" boxShadow="lg" p={6} {...props}>
        <ModalCloseButton color={'#344256'} opacity={1} />
        <ModalBody>

          <VStack  spacing={6} align="center" pt="2px" pb={6}>
            {icon && React.isValidElement(icon) ? icon : <InfoIcon />}

            {titleText}

            <VStack spacing={4} width="full">
                <BaseButton
                    variant={'brand'}
                  text={cancelText}
                  onClick={onNoClick}
                  borderRadius={'8px'}
                  w={'full'}
                  _focus={{ outline: 'none' }}
                  h={'56px'}
  
                />
                
              <BaseButton
                  variant={'ghost'}
                bg={'#FFFFFF'}border={'1.2px solid #0F454F'}
                text={acceptText}
                onClick={onYesClick}
                borderRadius={'8px'}
                w={'full'}
                  h={'56px'}
              />
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UnsaveChangesModal;