

'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    VStack,
    useBreakpointValue, HStack, IconButton,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import InfoIcon from "../../../../../atoms/icons/InfoIcon";
import ExclamationIcon from "../../../../../atoms/icons/ExclamationIcon";
import {ArrowBackIcon} from "@chakra-ui/icons";
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";

interface PhotoUploadStepProps {
    onContinue: (file: File | null) => void;
    onBack: () => void;
}

const UploadCustomerImageTemplate = ({ onContinue, onBack }: PhotoUploadStepProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // @ts-ignore
        accept: { 'image/jpeg': ['.jpeg', '.jpg'] },
        maxSize: 2 * 1024 * 1024, // 2MB
    });

    const handleContinue = () => {
        onContinue(selectedFile);
    };

    return (
        <Flex direction="column" minH="100vh" bg="#F8FAFC">
            <HeaderBackButton onBack={onBack} />

        <Box
           bg={{base: "", md: "white"}}
           width={isMobile ? '100%' : '941px'}
           mx="auto" /* centers horizontally */
           borderRadius={{base: 0, md: "8px"}}
           boxShadow={isMobile ? 'none' : 'md'}
           p={isMobile ? '20px' : 8}
        >
            {/* Title / Subtitle */}
            {!isMobile ? (
            <Heading
                variant={'headerBold'}
                fontSize={'18px'}
                textAlign={isMobile ? 'left' : 'center'}
                mb={2}
            >
                Photo Upload
            </Heading>
            ): (
                <Heading
                variant={'headerBold'}
                fontSize={'18px'}
                textAlign={isMobile ? 'left' : 'center'}
                mb={2}
            >
                Verify User Identity
            </Heading>
            )}
            <Text
                variant={'sm'}
                textAlign={isMobile ? 'left' : 'center'}
                mb={6}
            >
                Verify user’s identity by attaching their photo
            </Text>


            <Text
                textAlign={'center'}
                mb={3}
                mt={10}
                variant={'base'}
            >
                Upload Document
            </Text>
            {/* Drag-and-Drop Upload Zone */}
            <Box
                {...getRootProps()}
                border="2px dashed #64748B"
                borderRadius="8px"
                p={6}
                textAlign="center"
                cursor="pointer"
                bg={'#F8FAFC'}
                mb={{base: 8, md: 4}}
            >


            <input {...getInputProps()} />
                <Flex direction="column" align="center">
                    <Box color="#94A3B8" mb={2}>
                        <FiUpload size="24px" />
                    </Box>
                    <Text fontSize="14px" fontWeight="500" color="#475569">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                    </Text>
                    <Text fontSize="12px" color="#475569">
                        JPEG/JPG, max file size 2MB
                    </Text>
                </Flex>
            </Box>

            {/* Red Tip Messages */}
            {!isMobile && (
            <VStack alignItems={{
                base: 'flex-start',
                md: 'center',
            }} alignSelf={'center'} spacing={4} mt={4} mb={6}>
                <Box>
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
                </Box>
            </VStack>
            )}

            {/* Continue Button */}
            <Button
                width="100%"
                height="48px"
                borderRadius="8px"
                bg="#0F454F"
                color="white"
                fontWeight="600"
                onClick={handleContinue}
                isDisabled={!selectedFile}
            >
                Continue
            </Button>
        </Box>

        </Flex>
    );
};

export default UploadCustomerImageTemplate;
