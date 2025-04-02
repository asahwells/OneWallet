'use client';

import React, { useRef, useState, useCallback } from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    VStack,
    useBreakpointValue, IconButton, HStack, Image
} from '@chakra-ui/react';
import Webcam from 'react-webcam';
import {ArrowBackIcon} from "@chakra-ui/icons";
import ExclamationIcon from "../../../../../atoms/icons/ExclamationIcon";
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";

interface TakePhotoStepProps {
    onContinue: (photo: string) => void; // callback with the captured photo
    onBack: () => void; // callback to go back
}

const videoConstraints = {
    facingMode: 'user' // "user" = front camera on mobile
};

const CaptureCustomerImageTemplate=  ({ onContinue, onBack }:TakePhotoStepProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const webcamRef = useRef<Webcam>(null);
    const [photo, setPhoto] = useState<string>(''); // store captured photo (base64)
    const [hasTakenPhoto, setHasTakenPhoto] = useState(false);

    // Capture a screenshot from the webcam feed
    const capturePhoto = useCallback(() => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            if (screenshot) {
                setPhoto(screenshot);
                setHasTakenPhoto(true);
            }
        }
    }, [webcamRef]);

    // Retake the photo by clearing state
    const handleRetake = () => {
        setPhoto('');
        setHasTakenPhoto(false);
    };

    // Continue button calls the parent with the base64 photo
    const handleContinue = () => {
        onContinue(photo);
    };

    return (

        <>
            <HeaderBackButton onBack={onBack} />
        <Flex
            direction="column"
            bg="white"
            p={isMobile ? 4 : 8}
            borderRadius="8px"
            boxShadow={isMobile ? 'none' : 'md'}
            w={isMobile ? '100%' : '800px'}
            mx="auto"
            mt={4}
        >




            {/* Title / Subtitle */}
            <Heading
                as="h1"
                variant={'headerBold'}
                fontSize={'18px'}
                textAlign={isMobile ? 'left' : 'center'}
                mb={2}
            >
                Verify User Identity
            </Heading>
            <Text
                variant={'sm'}
                textAlign={isMobile ? 'left' : 'center'}
                mb={6}
            >
                Verify user’s identity by taking their picture
            </Text>

            {/* Webcam or Photo Preview */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
            >
                {!hasTakenPhoto ? (
                    // Show webcam feed
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        style={{
                            width: isMobile ? '100%' : '400px',
                            height: isMobile ? 'auto' : '300px',
                            borderRadius: '8px',
                            backgroundColor: '#000'
                        }}
                    />
                ) : (
                    // Show captured photo
                    <Image
                        src={photo}
                        alt="Captured"
                        borderRadius="8px"
                        w={{
                            base: '100%',
                            md: '400px'
                        }}
                        h={{
                            base: 'auto',
                            md: '300px'
                        }}
                        objectFit="cover"
                    />
                )}
            </Box>

            {/* Capture / Retake Buttons */}
            <Flex justifyContent="center" mb={4}>
                {!hasTakenPhoto ? (
                    <Button
                        onClick={capturePhoto}
                        colorScheme="teal"
                        borderRadius="8px"
                        w="150px"
                    >
                        Take Photo
                    </Button>
                ) : (
                    <Button
                        onClick={handleRetake}
                        colorScheme="gray"
                        borderRadius="8px"
                        w="150px"
                    >
                        Retake
                    </Button>
                )}
            </Flex>


            {/* Red Tips */}
            <VStack align={{
                base: 'flex-start',
                md: 'start',
            }} alignSelf={'center'} spacing={4} mt={4} mb={6}>
                <HStack spacing={1}>
                    <ExclamationIcon/>
                    <Text variant={'chartLabel'} color={'#EF4444'}>
                        Make sure the person’s face is captured properly
                    </Text>
                </HStack>

                <HStack spacing={1}>
                    <ExclamationIcon/>
                    <Text variant={'chartLabel'} color={'#EF4444'}>
                        Remove glasses for a clear photo
                    </Text>
                </HStack>

                <HStack spacing={1}>
                    <ExclamationIcon/>
                    <Text variant={'chartLabel'} color={'#EF4444'}>
                        Ensure the picture is clear and in focus
                    </Text>
                </HStack>
            </VStack>

            {/* Continue Button (enabled only if photo was taken) */}
            <Button
                width="100%"
                height="48px"
                borderRadius="8px"
                bg={hasTakenPhoto ? '#0F454F' : '#E2E8F0'}
                color={hasTakenPhoto ? 'white' : '#94A3B8'}
                fontWeight="600"
                onClick={handleContinue}
                isDisabled={!hasTakenPhoto}
            >
                Continue
            </Button>
        </Flex>

        </>
    );
};

export default CaptureCustomerImageTemplate;
