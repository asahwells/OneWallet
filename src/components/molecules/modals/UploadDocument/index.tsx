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
  Button,
  useToast
} from '@chakra-ui/react';
import { CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import GalleryIcon from 'components/atoms/icons/GalleryIcon';
import PhotoIcon from 'components/atoms/icons/PhotoIcon';
import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { uploadBase64ToFirebase } from 'api-services/firebase-services'; // Firebase upload service
import { useDropzone } from 'react-dropzone';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: (url: string) => void;
  onSelectFromGallery: (file: File) => void;
}

const UploadDocumentModal = ({ isOpen, onClose, onTakePhoto, onSelectFromGallery }: UploadDocumentModalProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onSelectFromGallery(file);
      onClose();
    }
  }, [onSelectFromGallery, onClose]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png, application/pdf',
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  const handleCapture = () => {
    if (webcamRef.current) {
      const capture = webcamRef.current.getScreenshot();
      if (capture) {
        uploadBase64ToFirebase(capture).then((url) => {
          onTakePhoto(url);  // Pass the URL to parent component
          onClose();
          toast({
            title: 'Photo Captured',
            description: 'The photo was successfully uploaded.',
            status: 'success',
            duration: 3000,
            isClosable: true
          });
        }).catch(() => {
          toast({
            title: 'Capture Failed',
            description: 'Unable to upload the photo.',
            status: 'error',
            duration: 3000,
            isClosable: true
          });
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={isMobile ? '430px' : '674px'}>
      <ModalOverlay />
      <ModalContent borderRadius={isMobile ? '0' : 'md'} mx={4} mt={40} pb={'42px'} maxW={{ lg: '674px' }} width="100%">
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
              onClick={() => setIsCameraOpen(true)}
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              width="100%"
              height="56px"
              _hover={{ bg: 'gray.50' }}
            >
              <Box />
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
              _hover={{ bg: 'gray.50' }}
              {...getRootProps()}
            >
              <Box />
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
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadDocumentModal;
