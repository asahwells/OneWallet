import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import FailedIcon from 'components/atoms/icons/FailedIcon';
import { IUpdateUserModalProps } from '../interfaces';
import Modaltext from 'components/atoms/texts/ModalText';
import OutlineButton from 'components/molecules/buttons/OutlineButton';

const FailedModal = ({
                       isOpen,
                       onClose,
                       height,
                       title,
                       title2,
                       ...props
                     }: IUpdateUserModalProps) => {
  if (!isOpen) return null;

  return (
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size="lg"
          trapFocus={true}
          autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent height={height || '419.99px'} mx={5} {...props}>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8}>
              <VStack
                  spacing={1}
                  alignItems={{ base: 'start', md: 'center' }}
                  justifyContent={{ base: 'start', md: 'center' }}
              >
                <FailedIcon />
                <Modaltext
                    color="#344256"
                    fontSize="16px"
                    fontWeight="500"
                    title={title}
                    variant="md"
                    lineHeight="24px"
                    textAlign="center"
                />
                {title2 && (
                    <Modaltext
                        title={title2}
                        variant="sml"
                        lineHeight="24px"
                        textAlign={{ base: 'start', md: 'center' }}
                    />
                )}
              </VStack>

              <OutlineButton
                  text="Dismiss"
                  color="#EF4444"
                  width="full"
                  height="56px"
                  mt={5}
                  border="1px solid #EF4444"
                  onClick={onClose}
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default FailedModal;
