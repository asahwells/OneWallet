'use client';

import React, { useRef, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  IconButton,
} from '@chakra-ui/react';
import AddIcon from 'components/atoms/icons/AddIcon'; // Import your EditIcon component
import Webcam from 'react-webcam';
import EditIcon, { EditCameraIcon } from 'components/atoms/icons/EditIcon';

interface CameraUploadProps {
  setImage: (image: string | null) => void;
}

const CameraUpload: React.FC<CameraUploadProps> = ({ setImage, ...props }) => {
  const [localImage, setLocalImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCapturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        setLocalImage(screenshot);
        setImage(screenshot);
        handleCloseCamera();
      }
    }
  }, [webcamRef, setImage]);

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <Box w="full" {...props}>
      <Text
        fontSize="16px"
        fontWeight="400"
        lineHeight={'24px'}
        letterSpacing={'-1.2%'}
        color="#344256"
        mb={'8px'}
        textAlign={{ base: 'left', md: 'center' }}
      >
        Upload a live picture of the front view of the shop
      </Text>

      <Box w="full" textAlign="center">
        <Box position="relative"> {/* Added position relative for icon positioning */}
          <Button
            borderRadius="8px"
            p={{base: 0, md: 6}}
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
                JPEG & PNG not more than 2MB
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
              onClick={handleOpenCamera} // Open camera on edit icon click
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