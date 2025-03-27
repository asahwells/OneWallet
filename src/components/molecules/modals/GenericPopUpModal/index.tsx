import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { INotificationModalProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';

const GenericPopUpModal = ({
  isOpen,
  onClose = () => {},
  icon,
  title,
  titleC,
  hasAllow = false,
  cancelText,
  cancelTextC,
  acceptTextC,
  acceptText,
  onYesClick,
  onNoClick,
  modalWidth = 'auto',
  brandName = 'OneWallet',
  ...props
}: INotificationModalProps) => {
  const getFormattedTitle = () => {
    if (!brandName) return title;

    const parts = title.split(brandName);
    if (parts.length === 1) return title;

    const boldBrand = <Text as="span" fontSize="md" fontWeight="bold">{brandName}</Text>;

    if (hasAllow) {
      return (
        <>
          Allow {boldBrand} {parts[1]}
        </>
      );
    }

    return (
      <>
        {boldBrand} {parts[1]}
      </>
    );
  };

  const buttonStyles = {
    variant: 'outline',
    colorScheme: 'gray',
    bgColor: '#CFDADC',
    fontWeight: 'medium',
    height: '48px',
    width: '100%',
    fontSize: '14px',
    _hover: {
      bgColor: '#0B343B',
      color: 'white',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backgroundColor="rgba(0,0,0, 0.6)" />
      <ModalContent borderRadius="2xl" minWidth={modalWidth} boxShadow="lg" p={6} {...props}>
        <ModalBody>
          <VStack spacing={6} align="center">
            {icon && React.isValidElement(icon) ? icon : null}
            <Text color={titleC} fontSize="md" fontWeight="medium" textAlign="center">
              {getFormattedTitle()}
            </Text>
            <VStack spacing={4} width="100%">
              <BaseButton
                {...buttonStyles}
                variant="modalButton"
                text={acceptText}
                onClick={onYesClick}
                color={acceptTextC}
                borderTopRadius="xl"
                borderBottomRadius="sm"
              />
              <BaseButton
                {...buttonStyles}
                variant="modalButton"
                text={cancelText}
                onClick={onNoClick}
                color={cancelTextC}
                borderTopRadius="sm"
                borderBottomRadius="xl"
              />
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GenericPopUpModal;