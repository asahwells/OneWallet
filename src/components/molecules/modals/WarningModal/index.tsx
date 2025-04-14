"use client"

import type React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  Text,
  Box,
  CloseButton,
  type ModalProps,
} from "@chakra-ui/react"
// import { ConfirmationModalProps } from "components/molecules/inputs/interfaces"
import QuestionIcon from "components/atoms/icons/QuestionIcon"
import { ConfirmationModalProps } from "../interfaces"
import BaseButton from "components/molecules/buttons/BaseButton"
import WarningIcon from "components/atoms/icons/WarningIcon"
import TipIcon from "components/atoms/icons/TipIcon"
import EnvelopIcon from "components/atoms/icons/EnvelopIcon"
import PhoneIcon from "components/atoms/icons/PhoneIcon"

const WarningModal: React.FC<any> = ({
  isOpen,
  onClose,
  title,
  subTitle,
  color,
  border,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
  icon,
  primaryButtonIcon,
  secondaryButtonIcon,
  ...rest
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" {...rest}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="26.81px" boxShadow="xl" maxW={"700px"} w="full" borderTopRadius={'26.81px'} borderBottomRadius={'26.81px'} position="relative" pb={4} mx={4}>
        <CloseButton position="absolute" right={4} top={6} color="" onClick={onClose} size="md" />
        <ModalBody pt={3} pb={4} px={6}>
          <Flex direction="column" align="center">
            <WarningIcon />

            {/* Title */}
            <Text
              variant={'md'}
              my={4}
              textAlign="center"
              position="relative"
              zIndex={2}
            >
              {title}
            </Text>

            {/* Subtitle */}
            {subTitle && (
              <Text
                variant={"sm"}
                mb={4}
                maxW={'570px'}
                textAlign="center"
                position="relative"
                zIndex={2}
              >
                {subTitle}
              </Text>
            )}

            {/* Icon */}

            <Box bg={'#E8EDEE'} w={{base: '340px', lg:'568px'}} h={'133px'} p={3} borderRadius={'8px'}>
                <Box borderBottom={'1px solid #CBD5E1'}>
                    <Flex>
                        <TipIcon />
                        <Text variant={'sm'}>Tip</Text>
                    </Flex>
                    <Flex mt={4}>
                        <EnvelopIcon />
                        <Text variant={'sm'} color={'#C5B27D'}>Tap here </Text>
                        <Text ml={1} variant={'sm'}>to send us a message direct</Text>
                    </Flex>
                </Box>
                <Box pt={5}>
                <Flex>
                        <PhoneIcon />
                        <Text variant={'sm'} color={'#C5B27D'}>Tap here </Text>
                        <Text ml={1} variant={'sm'}>to call our help line direct</Text>
                    </Flex>
                </Box>
            </Box>

          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WarningModal

