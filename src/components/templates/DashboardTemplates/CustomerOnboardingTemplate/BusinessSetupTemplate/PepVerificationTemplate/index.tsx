'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  HStack,
  Heading,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import PoliticalPersonIcon from 'components/atoms/icons/PoliticalPersonIcon';
import ConfirmationModal from 'components/molecules/modals/ConfirmModal';
import { PepVerificationTemplateProps } from '../interfaces';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';

// Redux imports
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { setBusiness } from '../../../../../../redux/slices/business';

const PepVerificationTemplate = ({ onNext, onBack }: PepVerificationTemplateProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Pull existing business details from Redux if needed
  const dispatch = useAppDispatch();
  const { businessDetails } = useAppSelector((state) => state.business);

  const [isPep, setIsPep] = useState<boolean | null>(null);

  const handleYesClick = () => {
    onOpen();
  };

  const handleNoClick = () => {
    setIsPep(false);

    dispatch(
      setBusiness({
        ...businessDetails,
        politicalExposed: false,
      })
    );

    onNext();
  };

  const handleConfirmYes = () => {
    setIsPep(true);

    dispatch(
      setBusiness({
        ...businessDetails,
        politicalExposed: true,
      })
    );

    onClose();
    onNext();
  };

  const handleConfirmNo = () => {
    setIsPep(null);
    onClose();
  };

  return (
    <Flex direction="column" bg="#F8FAFC" w="full" minH="100vh">
      <HeaderBackButton onBack={onBack} header="Business Setup" />

      {/* Main Content */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        flex="1"
        px={4}
        py={isMobile ? 6 : 10}
      >
        <Box maxW="600px" w="full" textAlign="center">
          {/* Politician Icon */}
          <Center mb={6}>
            <PoliticalPersonIcon />
          </Center>

          <Text
              letterSpacing={'-1.2%'}
              variant={'base'}
              textAlign={'center'}
              fontSize={'18px'}
              fontWeight={'700'}
              lineHeight={'24px'}

              mb={4}
          >
            Is the customer a Politically Exposed Person?
          </Text>

          <Text variant="base" fontSize="14px" color="#475569" mb={10} maxW="600px" mx="auto" textAlign={'left'}>
            A Politically Exposed Person (PEP) is a high-profile individual who holds
            or has previously held a prominent political position or public office.
          </Text>

          <Flex direction="column" gap={4} maxW="600px" mx="auto">
            <BaseButton
              text="Yes"
              h="48px"
              w="full"
              bg="#0F454F"
              color="white"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="600"
              _hover={{ bg: '#0D3A42' }}
              onClick={handleYesClick}
            />

            <BaseButton
              text="No"
              h="48px"
              w="full"
              bg="white"
              color="#344256"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="600"
              border="1px solid #E2E8F0"
              _hover={{ bg: '#F8FAFC' }}
              onClick={handleNoClick}
            />
          </Flex>
        </Box>
      </Flex>

      {/* Confirmation Modal (for the "Yes" flow) */}
      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          onClose={onClose}
          title="Politically Exposed Person"
          subTitle="You have indicated that the customer is a politically exposed person. Is that correct?"
          primaryButtonText="Yes, Confirm"
          secondaryButtonText="No, Go Back"
          // "Yes, Confirm" => finalize isPep = true
          onPrimaryAction={handleConfirmYes}
          // "No, Go Back" => revert to no selection
          onSecondaryAction={handleConfirmNo}
        />
      )}
    </Flex>
  );
};

export default PepVerificationTemplate;
