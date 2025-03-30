

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
    useBreakpointValue,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

interface PhotoUploadStepProps {
    onContinue: (file: File | null) => void;
}

const UploadCustomerImageTemplate = ({ onContinue }: PhotoUploadStepProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpeg', '.jpg'] },
        maxSize: 2 * 1024 * 1024, // 2MB
    });

    const handleContinue = () => {
        onContinue(selectedFile);
    };

    return (
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
                fontSize={isMobile ? '20px' : '24px'}
                fontWeight="700"
                color="#344256"
                textAlign={isMobile ? 'left' : 'center'}
                mb={2}
            >
                Photo Upload
            </Heading>
            <Text
                fontSize="14px"
                color="#475569"
                textAlign={isMobile ? 'left' : 'center'}
                mb={6}
            >
                Verify user’s identity by attaching their photo
            </Text>

            {/* Drag-and-Drop Upload Zone */}
            <Box
                {...getRootProps()}
                border="2px dashed #CBD5E1"
                borderRadius="8px"
                p={6}
                textAlign="center"
                cursor="pointer"
                mb={4}
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
            <VStack align="flex-start" spacing={1} mt={4} mb={6}>
                <Text fontSize="14px" color="#EF4444">
                    • Make sure the person’s face is captured properly
                </Text>
                <Text fontSize="14px" color="#EF4444">
                    • Remove glasses for a clear photo
                </Text>
                <Text fontSize="14px" color="#EF4444">
                    • Ensure the picture is clear and in focus
                </Text>
            </VStack>

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
        </Flex>
    );
};

export default UploadCustomerImageTemplate;
