"use client"

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
import { Input, useToast, Button, Image } from '@chakra-ui/react';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import { useCallback, useRef, useState } from 'react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onSelectFromGallery: (file: File) => void;
}

const UploadDocumentModal = ({ isOpen, onClose, onTakePhoto, onSelectFromGallery }: UploadDocumentModalProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
//   const [localImage, setLocalImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
        onSelectFromGallery(file)
        onClose()
      }
    }, [onSelectFromGallery, onClose]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // @ts-ignore
        accept: { 'image/jpeg': ['.jpeg', '.jpg', '.png'] },
        maxSize: 2 * 1024 * 1024, // 2MB
    });

    // Open camera view
    const handleOpenCamera = () => {
        setIsCameraOpen(true);
    };

    // Close camera view
    const handleCloseCamera = () => {
        setIsCameraOpen(false);
    };

    // Capture a photo using the webcam and pass it to the parent.
    const handleCapture = () => {
        if (webcamRef.current) {
        const capture = webcamRef.current.getScreenshot()
        if (capture) {
            onTakePhoto()
            onClose()
        } else {
            toast({
            title: "Capture failed",
            description: "Unable to capture photo. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            })
        }
        }
    }
    // Preview render
    const renderFilePreview = () => {
        if (!selectedFile) return null

        if (selectedFile.type.startsWith("image")) {
        const fileUrl = URL.createObjectURL(selectedFile)
        return (
            <Box mt={4}>
            <Image
                src={fileUrl}
                alt="File preview"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            </Box>
        )
        }

        return (
        <Text mt={4} color="#344256" fontSize="md">
            {selectedFile.name}
        </Text>
        )
    }


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
              onClick={handleOpenCamera}
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
              
            </Flex>

            {/* Select from gallery option */}
            <Flex
              as="button"
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              width="100%"
              height="56px"
              _hover={{ bg: "gray.50" }}
              {...getRootProps()}
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
              <input {...getInputProps()} />
            </Flex>
            {renderFilePreview()}
          </Flex>
          {isCameraOpen && (
            <Box
                position="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                backgroundColor="rgba(0, 0, 0, 0.9)"
                zIndex="1000"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: '90%', minHeight: '80vh', borderRadius: '8px' }}
                />
                <Box mt={4}>
                <Button colorScheme="green" mr={2}>
                    Capture Photo
                </Button>
                <Button onClick={handleCloseCamera} colorScheme="red">
                    Close Camera
                </Button>
                </Box>
            </Box>
            )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UploadDocumentModal
