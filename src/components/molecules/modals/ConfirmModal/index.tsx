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

const ConfirmationModal: React.FC<any> = ({
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
            <QuestionIcon />

            {/* Title */}
            <Text
              variant={'md'}
              my={4}
              textAlign="center"
              color="#004052"
              position="relative"
              zIndex={2}
            >
              {title}
            </Text>

            {/* Subtitle */}
            {subTitle && (
              <Text
                variant={"sm2"}
                mb={4}
                maxW={'343px'}
                textAlign="center"
                position="relative"
                zIndex={2}
              >
                {subTitle}
              </Text>
            )}

            {/* Icon */}

            {/* Primary Button */}
            <BaseButton
              text={primaryButtonText}
              bg="#004052"
              color={"white"}
              size="lg"
              width="100%"
              mb={4}
              _hover={{ bg: "#00546A" }}
              onClick={onPrimaryAction}
              position="relative"
              zIndex={2}
              height="56px"
              borderRadius="md"
            >
              {primaryButtonText}
              {primaryButtonIcon && (
                <Box position="absolute" right={4}>
                  {primaryButtonIcon}
                </Box>
              )}
            </BaseButton>

            {/* Secondary Button */}
            <BaseButton
              text={secondaryButtonText} 
              h="56px"
              w="full"
              bg="white"
              color={color ?? "#344256"}
              borderRadius="8px"
              fontSize="16px"
              fontWeight="600"
              border={border ?? "1px solid #EF4444"}
              _hover={{ bg: "rgba(239, 68, 68, 0.1)", borderColor: "#EF4444", color: "#EF4444" }}
              _focus={{ bg: "rgba(239, 68, 68, 0.1)", borderColor: "#EF4444", color: "#EF4444" }}
              onClick={onSecondaryAction}
            >
              {secondaryButtonText}
              
            </BaseButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal

