// components/molecules/modals/UploadDocumentModal.tsx
import React, { useState, useRef, useCallback } from 'react';
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
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import GalleryIcon from 'components/atoms/icons/GalleryIcon';
import PhotoIcon from 'components/atoms/icons/PhotoIcon';
import Webcam from 'react-webcam';
import { uploadBase64ToFirebase } from 'api-services/firebase-services';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: (url: string) => void;
  onSelectFromGallery: (url: string) => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   onTakePhoto,
                                                                   onSelectFromGallery,
                                                                 }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  // common upload helper
  const uploadBase64 = async (base64: string) => {
    const url = await uploadBase64ToFirebase(base64);
    setFileUrl(url);
    return url;
  };

  // handle camera capture
  const handleCapture = async () => {
    if (!webcamRef.current) return;
    const shot = webcamRef.current.getScreenshot();
    if (!shot) return;

    setIsUploading(true);
    try {
      const url = await uploadBase64(shot);
      onTakePhoto(url);
      toast({ title: 'Photo Uploaded', status: 'success', duration: 3000, isClosable: true });
      onClose();
    } catch {
      toast({ title: 'Upload Failed', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setIsUploading(false);
      setIsCameraOpen(false);
    }
  };

  // open native file picker
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // enforce size/type in UI if you like
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const url = await uploadBase64(base64);
        onSelectFromGallery(url);
        toast({ title: 'Document Uploaded', status: 'success', duration: 3000, isClosable: true });
        onClose();
      };
      reader.onerror = () => {
        throw new Error('File read failed');
      };
      reader.readAsDataURL(file);
    } catch {
      toast({ title: 'Upload Failed', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setIsUploading(false);
      // reset the input so the same file can be re-picked if needed
      e.target.value = '';
    }
  };

  return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={isMobile ? 'xs' : 'md'}>
        <ModalOverlay />
        <ModalContent borderRadius={isMobile ? '0' : 'md'} mx={4} mt={20} width="100%" maxW="674px">
          <ModalHeader pt={6} pb={4}>
            <Flex align="center" justify="space-between">
              <Box flex="1" />
              <Text flex="2" textAlign="center" fontSize="xl" fontWeight="semibold" color="#344256">
                Upload Document
              </Text>
              <IconButton
                  flex="1"
                  aria-label="Close"
                  icon={<CloseIcon w={3} h={3} color="#EF4444" />}
                  onClick={onClose}
                  variant="unstyled"
                  size="sm"
              />
            </Flex>
          </ModalHeader>

          <ModalBody px={4} pb={6}>
            {/* hidden native file input */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <Flex direction="column" gap={4}>
              {/* Take Photo */}
              <Flex
                  as="button"
                  onClick={() => setIsCameraOpen(true)}
                  align="center"
                  justify="space-between"
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  h="56px"
                  _hover={{ bg: 'gray.50' }}
              >
                <Box />
                <Flex align="center" gap={4}>
                  <PhotoIcon color="#C5B27D" />
                  <Text fontSize="md" color="#344256">
                    Take a photo
                  </Text>
                </Flex>
                <ChevronRightIcon color="gray.400" boxSize={6} />
              </Flex>

              {/* Select from Gallery */}
              <Flex
                  as="button"
                  onClick={openFilePicker}
                  align="center"
                  justify="space-between"
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  h="56px"
                  _hover={{ bg: isUploading ? undefined : 'gray.50' }}
                  cursor={isUploading ? 'not-allowed' : 'pointer'}
                  opacity={isUploading ? 0.6 : 1}
              >
                <Box />
                <Flex align="center" gap={4}>
                <Box>
                  {isUploading ? <Spinner size="sm" /> : <GalleryIcon color="#C5B27D"  />}
                </Box>
                <Text fontSize="md" color="#344256">
                  {isUploading ? 'Uploading…' : 'Select from gallery'}
                </Text>   </Flex>

                <ChevronRightIcon color="gray.400" boxSize={6} />
              </Flex>

              {/* Camera Preview & Capture */}
              {isCameraOpen && (
                  <Box mt={4} textAlign="center">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        videoConstraints={{ facingMode: 'environment' }}
                    />
                    <Button mt={2} onClick={handleCapture} isLoading={isUploading}>
                      Capture
                    </Button>
                  </Box>
              )}

              {/* Show uploaded file */}
              {fileUrl && (
                  <Box mt={6} textAlign="center">
                    {/\.(jpe?g|png)$/i.test(fileUrl) ? (
                        <Box as="img" src={fileUrl} alt="Uploaded" maxH="200px" mx="auto" />
                    ) : (
                        <Text fontSize="md" color="#344256">
                          Document uploaded:{' '}
                          <Box
                              as="a"
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="#0F454F"
                          >
                            View
                          </Box>
                        </Text>
                    )}
                  </Box>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default UploadDocumentModal;
