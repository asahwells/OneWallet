import React, { useState, useRef } from 'react';
import { Box, Button, useDisclosure, Container, useBreakpointValue, Text, Image, Link } from '@chakra-ui/react';
import SelectField from 'components/organisms/select/SelectField';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import DocumentUploader from 'components/organisms/uploaders/DocumentUploader';
import UploadDocumentModal from 'components/molecules/modals/UploadDocument';

const AddressVerificationFormTemplate = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>('');
  const [fileUrl, setFileUrl] = useState<string | null>(null); // Store file URL here
  const { isOpen, onOpen, onClose } = useDisclosure(); // OnOpen will trigger the modal
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: string | File) => {
    if (typeof file === 'string') {
      setFileUrl(file); // URL returned from Firebase
    } else {
      console.log('File selected:', file);
      // Handle file if needed (in case of file upload, not URL)
    }
  };

  const handleContinue = () => {
    if (selectedDocumentType && fileUrl) {
      // Proceed with the selected document type and file URL (whether from file or camera)
      console.log('Document Type:', selectedDocumentType);
      console.log('File URL:', fileUrl); // Use file URL from Firebase or uploaded file
      // Continue the flow
    }
  };

  return (
    <Box bg="#F8FAFC" minH="100vh">
      <HeaderBackButton header="Account Upgrade - Tier 3" />
      <Container maxW="container.md" py={4}>
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" boxShadow="sm">
          <SelectField
            type="select"
            label="Document Type"
            value={selectedDocumentType}
            placeholder="Select Document Type"
            options={[
              { value: 'electricityBill', label: 'Electricity Bill' },
              { value: 'waterBill', label: 'Water Bill' },
              { value: 'landUseCharge', label: 'Land Use Charge' },
              { value: 'bankStatement', label: 'Bank Statement' },
              { value: 'wasteBill', label: 'Waste Bill' },
            ]}
            onChange={(e: any) => setSelectedDocumentType(e.target.value)}
          />

          {/* Pass the onOpen as onUploadClick to trigger the modal when clicking the upload area */}
          <DocumentUploader onFileSelect={handleFileSelect} onUploadClick={onOpen} /> 

          {/* Display uploaded file */}
          {fileUrl && (
            <Box mt={4} textAlign="center">
              {fileUrl.includes('.jpg') || fileUrl.includes('.png') ? (
                <Image src={fileUrl} alt="Uploaded file" maxWidth="300px" mx="auto" />
              ) : (
                <Link href={fileUrl} target="_blank" color="blue.500" fontSize="lg">
                  View Uploaded File
                </Link>
              )}
            </Box>
          )}

          <Box mt={4}>
            <Button
              onClick={handleContinue}
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
        </Box>
      </Container>

      {isOpen && (
        <UploadDocumentModal
          isOpen={isOpen}
          onClose={onClose}
          onTakePhoto={(url: string) => handleFileSelect(url)}  // Pass URL from camera capture
          onSelectFromGallery={(file: File) => handleFileSelect(file)}  // Pass file to handler
        />
      )}
    </Box>
  );
};

export default AddressVerificationFormTemplate;
