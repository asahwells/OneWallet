"use client"

import type React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  IconButton,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react"
import { CloseIcon, ChevronRightIcon } from "@chakra-ui/icons"
import GalleryIcon from '../../../atoms/icons/GalleryIcon/index';
import PhotoIcon from '../../../atoms/icons/PhotoIcon/index';
import { Input } from '@chakra-ui/react';

interface UploadDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  onTakePhoto: () => void
  onSelectFromGallery: () => void
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onTakePhoto,
  onSelectFromGallery,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={isMobile ? "430px" : "674px"}>
      <ModalOverlay />
      <ModalContent borderRadius={isMobile ? "0" : "md"} mx={4} mt={40} pb={'42px'} maxW={{lg:"674px"}} width="100%">
        <ModalHeader textAlign="center" pt={6} pb={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box flex="1" /> 
            <Text fontSize="xl" fontWeight="semibold" color="#344256" textAlign="center" flex="2">
              Upload Document
            </Text>
            <Flex flex="1" justifyContent="flex-end">
              <IconButton
                aria-label="Close modal"
                icon={<CloseIcon w={3} h={3} />}
                onClick={onClose}
                variant="unstyled"
                color="#EF4444"
                size="sm"
              />
            </Flex>
          </Flex>
        </ModalHeader>

        <ModalBody p={4} pb={isMobile ? 8 : 6}>
          <Flex direction="column" gap={4}>
            {/* Take a photo option */}
            <Flex
              as="button"
              onClick={onTakePhoto}
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              width="100%"
              height="56px"
              _hover={{ bg: "gray.50" }}
            >
                <Box></Box>
              <Flex justifyContent="center" alignItems="center" gap={4}>
                <Box color="#C5B27D" fontSize="24px">
                  <PhotoIcon />
                </Box>
                <Text fontSize="md" color="#344256">
                  Take a photo
                </Text>
              </Flex>
              <ChevronRightIcon color="gray.400" boxSize={6} />
              <Input type='' />
            </Flex>

            {/* Select from gallery option */}
            <Flex
              as="button"
              onClick={onSelectFromGallery}
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              width="100%"
              height="56px"
              _hover={{ bg: "gray.50" }}
            >
                <Box></Box>
              <Flex alignItems="center" gap={4}>
                <Box color="#C5B27D" fontSize="24px">
                  <GalleryIcon />
                </Box>
                <Text fontSize="md" color="#344256">
                  Select from gallery
                </Text>
              </Flex>
              <ChevronRightIcon color="gray.400" boxSize={6} />
              <Input display='none' type='file'/>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UploadDocumentModal
