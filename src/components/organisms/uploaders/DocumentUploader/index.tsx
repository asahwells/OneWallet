"use client"

import { useCallback, useState, type RefObject } from "react"
import { useDropzone } from "react-dropzone"
import { Box, Center, Text, VStack } from "@chakra-ui/react"
import AddIcon from '../../../atoms/icons/AddIcon/index';
import { DocumentUploaderProps } from '../interfaces/index';

const DocumentUploader = ({
  onFileSelect,
  onUploadClick,
  fileTypes,
  maxFileSize,
  fileInputRef,
}: DocumentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const defaultAccept = "image/jpeg, image/jpg, image/png"
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes || defaultAccept,
    maxSize: maxFileSize || 2 * 1024 * 1024, // Default 2MB
  })

  const handleClick = () => {
    if (onUploadClick) {
      onUploadClick()
    }
  }

  return (
    <Box width="100%">
      <Box
        {...getRootProps()}
        borderWidth="1px"
        borderStyle="dashed"
        borderColor={isDragging ? "blue.400" : "gray.300"}
        borderRadius="md"
        p={{base:10, lg: 6}}
        bg="#F8FAFC"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: "gray.400" }}
        onClick={handleClick}
        height={{base:"180px", lg: "150px"}}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Center>
          <VStack spacing={3}>
              <AddIcon color="#344256"/>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              JPEG & PNG not more than 2MB
            </Text>
          </VStack>
        </Center>
        <input {...getInputProps()} ref={fileInputRef} />
      </Box>
    </Box>
  )
}

export default DocumentUploader
