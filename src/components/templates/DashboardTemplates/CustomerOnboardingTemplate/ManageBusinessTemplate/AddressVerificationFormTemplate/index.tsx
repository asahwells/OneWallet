import React, { useState } from 'react';
import { Box, Button, Container, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import SelectField from 'components/organisms/select/SelectField';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import DocumentUploader from 'components/organisms/uploaders/DocumentUploader';
import { useParams, useRouter } from 'next/navigation';
import { useUpgradeTierThree } from 'api-services/business-services'; // Import the useUpgradeTierThree hook
import UploadDocumentModal from 'components/molecules/modals/UploadDocument';

const AddressVerificationFormTemplate = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>('');  // Document type state
  const [fileUrl, setFileUrl] = useState<string | null>(null);  // Store the file URL here
  const { isOpen, onOpen, onClose } = useDisclosure();  // Modal disclosure for file upload
  const router = useRouter();
  const id = useParams();
  
  const { mutateAsync: upgradeTierThree, isPending } = useUpgradeTierThree();

  const handleFileSelect = (file: string | File) => {
    if (typeof file === 'string') {
      setFileUrl(file);  
    } else {
      console.log('File selected:', file);
      
    }
  };

  
  const handleContinue = async () => {
    if (selectedDocumentType && fileUrl) {
     
      const payload = {
        utilityBillType: selectedDocumentType,  
        utilityBillUrl: fileUrl, 
        userId: id?.id as string
      };

      try {
        await upgradeTierThree(payload);
        router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id?.id}/success`);
      } catch (error) {
        console.error('Upgrade failed:', error);
      }
    }
  };

  return (
    <Box bg="#F8FAFC" minH="100vh">
      <HeaderBackButton header="Account Upgrade - Tier 3" onBack={() => router.back()} />
      <Container maxW="container.md" py={4}>
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white" boxShadow="sm">
          <SelectField
            type="select"
            label="Document Type"
            value={selectedDocumentType}
            placeholder="Select Document Type"
            options={[
              { value: 'electricity-bill', label: 'Electricity Bill' },
              { value: 'water-bill', label: 'Water Bill' },
              { value: 'land-use-charge', label: 'Land Use Charge' },
              { value: 'bank-statement', label: 'Bank Statement' },
              { value: 'waste-bill', label: 'Waste Bill' },
            ]}
            onChange={(e: any) => setSelectedDocumentType(e.target.value)}
          />

          <DocumentUploader onFileSelect={handleFileSelect} onUploadClick={onOpen} display={fileUrl} />

          <Box mt={4}>
            <Button
              onClick={handleContinue}
              bg="#0F454F"
              color="white"
              size="lg"
              height="56px"
              borderRadius="md"
              width="100%"
              isLoading={isPending}  
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
          onTakePhoto={(url: string) => handleFileSelect(url)} // Pass URL from camera capture
            // @ts-ignore
          onSelectFromGallery={(file: File) => handleFileSelect(file)} // Pass file to handler
        />
      )}
    </Box>
  );
};

export default AddressVerificationFormTemplate;
