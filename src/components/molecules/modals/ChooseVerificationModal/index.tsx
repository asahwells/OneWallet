'use client';

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Flex,
  Text,
  useBreakpointValue,
  Icon,
  VStack,
  Stack,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ChooseVerificationModalProps } from '../interfaces';
import InfoIcon from '../../../atoms/icons/InfoIcon';
import QuestionIcon from 'components/atoms/icons/QuestionIcon';

const ChooseVerificationModal = ({
  isOpen,
  onClose,
  onChooseCamera,
  onChooseUpload,
}: ChooseVerificationModalProps) => {
  // Adjust size on mobile vs. desktop
  const modalSize = useBreakpointValue({ base: 'xs', md: 'md' });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
      <ModalOverlay />
      <ModalContent
        borderRadius="26.81px"
        boxShadow="xl"
        maxW={'700px'}
        w="full"
        borderTopRadius={'26.81px'}
        borderBottomRadius={'26.81px'}
        position="relative"
        pb={4}
        mx={4}
      >
        <ModalCloseButton
          color="#475569"
          _focus={{ boxShadow: 'none' }}
          _hover={{ bg: '#F1F5F9' }}
          display={{ base: 'none', md: 'flex' }}
        />
        <ModalHeader p={{ md: '20px' }}>
          <Stack w={'full'} alignItems={'center'}>
            <Flex
              justify={{ base: 'space-between', md: 'center' }}
              align="center"
              w="100%"
              position="relative"
            >
              <QuestionIcon />

              <ModalCloseButton
                position="relative"
                top="unset"
                right="unset"
                display={{ base: 'inline-block', md: 'none' }}
              />
            </Flex>
            <Text variant={'md'} textAlign={'center'} lineHeight={'20px'}>
              Select how to continue Photo Verification
            </Text>
          </Stack>
        </ModalHeader>

        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Option 1: With Camera */}
            <Flex
              as="button"
              onClick={onChooseCamera}
              justifyContent="space-between"
              alignItems="center"
              bg="white"
              borderBottom="1px solid #E2E8F0"
              py={3}
              cursor={'pointer'}
            >
              <Text variant={'base'}>With Camera</Text>
              <Icon as={ChevronRightIcon} color="#344256" w={6} h={6} />
            </Flex>

            {/* Option 2: Upload an attachment */}
            <Flex
              as="button"
              onClick={onChooseUpload}
              justifyContent="space-between"
              alignItems="center"
              bg="white"
              py={3}
              cursor={'pointer'}
            >
              <Text variant={'base'}>Upload an attachment</Text>
              <Icon as={ChevronRightIcon} color="#344256" w={6} h={6} />
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChooseVerificationModal;
