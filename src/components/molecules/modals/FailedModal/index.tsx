import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import FailedIcon from 'components/atoms/icons/FailedIcon';
import { IUpdateUserModalProps } from '../interfaces';
import Modaltext from 'components/atoms/texts/ModalText';
import OutlineButton from 'components/molecules/buttons/OutlineButton';
import InfoIcon from 'components/atoms/icons/InfoIcon';

const FailedModal = ({
                       isOpen,
                       onClose,
                       height,
                       title,
                       title2,
                       title3,
                       warning,
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
      <ModalContent borderRadius="26.81px" boxShadow="xl" maxW={"700px"} w="full" borderTopRadius={'26.81px'} borderBottomRadius={'26.81px'} position="relative" pb={4} mx={4}>
        <ModalCloseButton
                    color="#475569"
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ bg: '#F1F5F9' }}
                    display={{base: 'none', md: 'flex'}}
                />
          <ModalBody p={{md: '20px'}}>
            <VStack spacing={3} alignItems={{ base: 'start', md: 'center' }}
                  justifyContent={{ base: 'start', md: 'center' }}>
              <Flex 
                justify={{base: "space-between", md: "center"}}
                align="center"
                w="100%"
                position="relative"
                >
                <FailedIcon />
                
                <ModalCloseButton 
                    position="relative"
                    top="unset" 
                    right="unset"
                    display={{base: 'inline-block', md: 'none'}}
                />
                </Flex>
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

                {title3 && (
                  <Modaltext
                      title={title3}
                      variant="sml"
                      lineHeight="24px"
                      textAlign={{ base: 'start', md: 'center' }}
                  />
                )}

                {warning && (
                  <Box w={'100%'} gap={10}>
                    <Flex>
                      <InfoIcon />
                      <Text variant={'sm'}>Make sure the user’s face is captured properly</Text>
                    </Flex>
                    <Flex>
                      <InfoIcon />
                      <Text variant={'sm'}>Make sure they’re not wearing glasses</Text>
                    </Flex>
                    <Flex>
                      <InfoIcon />
                      <Text variant={'sm'}>Make sure the picture is clear</Text>
                    </Flex>
                  </Box>
                )}

              <OutlineButton
                  text="Dismiss"
                  color="#EF4444"
                  width={{base: "full", md: "458px"}}
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
