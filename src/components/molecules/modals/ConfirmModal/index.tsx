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
  ModalCloseButton,
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
      <ModalCloseButton
                          color="#475569"
                          _focus={{ boxShadow: 'none' }}
                          _hover={{ bg: '#F1F5F9' }}
                          display={{base: 'none', md: 'flex'}}
                      />
          <ModalBody pt={3} pb={4} px={6}>
          <Flex direction="column" align={{base: "left", md: "center"}}>
          <Flex 
              justify={{base: "space-between", md: "center"}}
              align="center"
              w="100%"
              position="relative"
            >
              <QuestionIcon />
              
              <ModalCloseButton 
                position="relative"
                top="unset" 
                right="unset"
                display={{base: 'inline-block', md: 'none'}}
              />
            </Flex>
            {/* Title */}
            <Text
              variant={'md'}
              my={4}
              textAlign={{base:"left", lg: "center"}}
              //color="#004052"
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
                textAlign={{base: "left", md: "center"}}
                position="relative"
                lineHeight={'22px'}
                zIndex={2}
                color={"#222B38"}
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
              width={{base: "full", md: "458px"}}
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
              w={{base: "full", md: "458px"}}
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

