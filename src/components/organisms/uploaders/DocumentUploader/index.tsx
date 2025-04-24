import React, { useState, useCallback } from 'react';
import { Box, Center, Text, VStack, Image, Link } from '@chakra-ui/react';
import AddIcon from 'components/atoms/icons/AddIcon'; 
import { uploadBase64ToFirebase } from 'api-services/firebase-services'; 
import { DocumentUploaderProps } from '../interfaces'; 
import { useDropzone } from 'react-dropzone';

const DocumentUploader = ({ onFileSelect, fileTypes, maxFileSize, onUploadClick, display }: DocumentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 

  // Convert file to base64 before uploading
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); 
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        // Convert file to base64 and upload it
        convertFileToBase64(file)
          .then((base64String) => {
            // Upload the base64 string to Firebase and get the URL
            uploadBase64ToFirebase(base64String).then((url) => {
              setFileUrl(url); 
              onFileSelect(url); 
            }).catch((error) => {
              console.error('Upload failed:', error);
            });
          })
          .catch((error) => {
            console.error('Error converting file to base64:', error);
          });
      }
    },
    [onFileSelect]
  );

  const defaultAccept = 'image/jpeg, image/jpg, image/png, application/pdf';

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes || defaultAccept,
    maxSize: maxFileSize || 2 * 1024 * 1024, // Default max file size is 2MB
  });


  return (
    <Box width="100%">
      <Box
        {...getRootProps()}
        borderWidth="1px"
        borderStyle="dashed"
        borderColor={isDragging ? 'blue.400' : 'gray.300'}
        borderRadius="md"
        p={{ base: 10, lg: 6 }}
        bg="#F8FAFC"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: 'gray.400' }}
        height={{ base: '180px', lg: '150px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onUploadClick} 
      >
        <Center>
          <VStack spacing={3}>
            {display ? (
              <Box textAlign="center">
                {display.includes('.jpg') || display.includes('.png') ? (
                  <Image src={display} alt="Uploaded file" maxW={'200px'} mx="auto" />
                ) : (
                  <Link href={display} target="_blank" color="blue.500" fontSize="lg">
                    View Uploaded File
                  </Link>
                )}
              </Box>
            ) : (
              <>
                <AddIcon color="#344256" />
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  JPEG, PNG, PDF not more than 2MB
                </Text>
              </>
            )}
          </VStack>
        </Center>
        <input {...getInputProps()} />
      </Box>
    </Box>
  );
};

export default DocumentUploader;
