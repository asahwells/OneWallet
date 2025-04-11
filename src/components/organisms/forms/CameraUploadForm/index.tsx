'use client';

import React, { useRef, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import AddIcon from 'components/atoms/icons/AddIcon';
import Webcam from 'react-webcam';
import EditIcon, { EditCameraIcon } from 'components/atoms/icons/EditIcon';
import { uploadBase64ToFirebase } from 'api-services/firebase-services';
import {useAppSelector} from "../../../../redux/store";

interface CameraUploadProps {
  // Instead of returning base64, we return the final Firebase URL
  setImage: (image: string | null) => void;
}

const CameraUpload: React.FC<CameraUploadProps> = ({ setImage, ...props }) => {
  const {businessDetails} = useAppSelector(state => state.business)
  const [localImage, setLocalImage] = useState<string | null>(businessDetails?.photoUrl || null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const toast = useToast();

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleCapturePhoto = useCallback(async () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        try {
          const downloadURL = await uploadBase64ToFirebase(screenshot);
          console.log('Firebase URL:', downloadURL);
        setLocalImage(downloadURL);
          setImage(downloadURL);
        } catch (error) {
          toast({
            title: 'Upload failed',
            description: 'Unable to upload image to Firebase.',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        } finally {
          handleCloseCamera();
        }
      }
    }
  }, [webcamRef, setImage, toast]);

  return (
    <Box w="full" {...props}>
      <Text
        fontSize="16px"
        fontWeight="400"
        lineHeight="24px"
        letterSpacing="-1.2%"
        color="#344256"
        mb="8px"
        textAlign={{ base: 'left', md: 'center' }}
      >
        Upload a live picture of the front view of the shop
      </Text>

      <Box w="full" textAlign="center">
        <Box position="relative">
          <Button
            borderRadius="8px"
            p={{ base: 0, md: 6 }}
            onClick={handleOpenCamera}
            leftIcon={!localImage && <AddIcon />}
            variant="camera"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="104px"
            w={{ base: 'full', md: 'full' }}
            gap="8px"
          >
            {localImage ? (
              <Image
                src={localImage}
                alt="Captured"
                h="104px"
                w={{ base: '104px', md: '152px' }}
                mx="auto"
                objectFit="cover"
              />
            ) : (
              <Text
                fontSize="12px"
                fontWeight={400}
                color="#344256"
                textAlign="center"
                whiteSpace="normal"
                wordBreak="break-word"
                overflowWrap="break-word"
                maxW="100%"
              >
                JPEG &amp; PNG not more than 2MB
              </Text>
            )}
          </Button>

          {localImage && (
            <IconButton
              aria-label="Edit photo"
              icon={<EditCameraIcon />}
              size="sm"
              position="absolute"
              top="0"
              right="0"
              onClick={handleOpenCamera} // open camera again on click
            />
          )}
        </Box>

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
              <Button onClick={handleCapturePhoto} colorScheme="green" mr={2}>
                Capture Photo
              </Button>
              <Button onClick={handleCloseCamera} colorScheme="red">
                Close Camera
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CameraUpload;
