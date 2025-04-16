"use client"

import { useState, useRef } from 'react';
import { Box, VStack, Heading, Text, Button, useDisclosure, Container, useBreakpointValue } from "@chakra-ui/react"
import SelectField from "components/organisms/select/SelectField"
import HeaderBackButton from '../../../../../molecules/buttons/HeaderBackButton/index';
import DocumentUploader from '../../../../../organisms/uploaders/DocumentUploader/index';
import UploadDocumentModal from '../../../../../molecules/modals/UploadDocument/index';

interface PhotoUploadStepProps {
  onContinue: (documentType: string, file?: File) => void;
}

const AddressVerificationFormTemplate = ({ onContinue }: PhotoUploadStepProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDocumentTypeSelect = (documentType: string) => {
    setSelectedDocumentType(documentType)
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleContinue = () => {
    if (selectedDocumentType) {
      onContinue(selectedDocumentType, selectedFile || undefined)
    }
  }

  const handleTakePhoto = () => {
    onClose()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSelectFromGallery = () => {
    onClose()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Box bg="#F8FAFC" minH="100vh">
      <HeaderBackButton header="Account Upgrade - Tier 3" />
      <Container maxW="container.md" py={4}>
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Text variant={'otvVerifyTitle'} mb={4}>
                Address Verification
              </Text>
              <Text variant={'otvVerifySubTitle'} lineHeight={'22px'} letterSpacing={'-1%'}>
                We accept light, water, and waste bills as well as bank statements. Bill must not be more than 3 months
                old. Ensure user&apos;s address matches that on their &quot;Proof of Address&quot;
              </Text>
            </Box>

            <Box>
              <SelectField
                type="select"
                label="Document Type"
                value={selectedDocumentType}
                placeholder="Select Document Type"
                options={[
                  { value: "electricityBill", label: "Electricity Bill" },
                  { value: "waterBill", label: "Water Bill" },
                  { value: "landUseCharge", label: "Land Use Charge" },
                  { value: "bankStatement", label: "Bank Statement" },
                  { value: "wasteBill", label: "Waste Bill" },
                ]}
              />
            </Box>

            <Box>
              <Text variant={'base'} mb={2} textAlign="center">
                Upload Document
              </Text>
              <DocumentUploader onFileSelect={handleFileSelect} onUploadClick={onOpen} isMobile={false} />
            </Box>

            <Box mt={4}>
              <Button
                onClick={handleContinue}
                // isDisabled={!selectedDocumentType}
                bg="#0F454F"
                color="white"
                size="lg"
                height="56px"
                borderRadius="md"
                width="100%"
              >
                Continue
              </Button>
            </Box>
          </VStack>
        </Box>
      </Container>

      {isOpen && <UploadDocumentModal
          isOpen={isOpen}
          onClose={onClose}
          onTakePhoto={handleTakePhoto}
          onSelectFromGallery={handleSelectFromGallery}
        />}
    </Box>
  )
}

export default AddressVerificationFormTemplate
