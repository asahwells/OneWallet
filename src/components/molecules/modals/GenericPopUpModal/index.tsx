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



const GenericPopUpModal = ({
  isOpen,
  onClose,
  icon,
  title,
  titleC,
  hasAllow,
  cancelText,
  cancelTextC,
  acceptTextC,
  acceptText,
  onYesClick,
  onNoClick,
  modalWidth,
  brandName = 'OneWallet',
  ...props
}: INotificationModalProps) => {
    const getFormattedTitle = () => {
        if (!brandName) return title; // If no brandName, return original title
    
        const parts = title.split(brandName);
        if (parts.length === 1) return title; // If brandName not found, return original title
    
        const boldBrand = <Text as="span" fontSize={"md"} fontWeight="bold">{brandName}</Text>;
    
        if (hasAllow) {
          return (
            <>
              Allow {boldBrand} {parts[1]}
            </>
          );
        } else {
          return (
            <>
              {boldBrand} {parts[1]}
            </>
          );
        }
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay  backgroundColor={'rgba(0,0,0, 0.6)'}/>
      <ModalContent borderRadius="2xl"  minWidth={modalWidth} boxShadow="lg" p={6} {...props}>
        <ModalBody>
          <VStack spacing={6} align="center">
            {icon}
            <Text color={titleC} fontSize="md" fontWeight="medium" textAlign="center">
              {getFormattedTitle()}
            </Text>
            <VStack spacing={4} width="100%">
              <Button
                variant="outline"
                colorScheme="gray"
                bgColor={'#CFDADC'}
                onClick={onYesClick}
                color={acceptTextC}
                height={'48px'}
                width="100%"
                fontWeight={'medium'}
                borderTopRadius="xl"
                _hover={{
                    bgColor: '#0B343B',
                    color: 'white'
                }}
                fontSize={'14px'}
                borderBottomRadius={"sm"}
              >
                {acceptText}
              </Button>
              <Button
                variant="outline"
                bgColor={'#CFDADC'}
                fontWeight={'medium'}
                borderTopRadius={'sm'}
                borderBottomRadius={'xl'}
                colorScheme="gray"
                height={'48px'}
                color={cancelTextC}
                onClick={onNoClick}
                _hover={{
                    bgColor: '#0B343B',
                    color: 'white'
                }}
                fontSize={'14px'}
                width="100%"
              >
                {cancelText}
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GenericPopUpModal;