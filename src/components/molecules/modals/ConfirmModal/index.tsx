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

const ConfirmationModal: React.FC<any> = ({
  isOpen,
  onClose,
  title,
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
      <ModalContent borderRadius="md" boxShadow="xl" maxW="716px" w="100%" borderTopRadius={'8px'} borderBottomRadius={'8px'} position="relative" pb={8}>
        <CloseButton position="absolute" right={4} top={4} color="red.500" onClick={onClose} size="lg" />
        <ModalBody pt={12} pb={4} px={6}>
          <Flex direction="column" align="center">
            <QuestionIcon />

            {/* Title */}
            <Text
              fontSize="2xl"
              fontWeight="medium"
              my={8}
              textAlign="center"
              color="#004052"
              position="relative"
              zIndex={2}
            >
              {title}
            </Text>

            {/* Primary Button */}
            <Button
              bg="#004052"
              color="white"
              size="lg"
              width="100%"
              mb={4}
              _hover={{ bg: "#00546A" }}
              onClick={onPrimaryAction}
              position="relative"
              zIndex={2}
              height="60px"
              borderRadius="md"
            >
              {primaryButtonText}
              {primaryButtonIcon && (
                <Box position="absolute" right={4}>
                  {primaryButtonIcon}
                </Box>
              )}
            </Button>

            {/* Secondary Button */}
            <Button
              variant="outline"
              borderColor="red.500"
              color="red.500"
              size="lg"
              width="100%"
              onClick={onSecondaryAction}
              position="relative"
              zIndex={2}
              height="60px"
              borderRadius="md"
            >
              {secondaryButtonText}
              
            </Button>

            {/* Red Triangle */}
            <Box
              position="absolute"
              bottom="-8px"
              left="50%"
              transform="translateX(-50%)"
              width="0"
              height="0"
              borderLeft="10px solid transparent"
              borderRight="10px solid transparent"
              borderTop="10px solid red.500"
              zIndex={1}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal

