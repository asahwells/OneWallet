import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import SelectField from 'components/organisms/select/SelectField';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import DocumentUploader from 'components/organisms/uploaders/DocumentUploader';
import { useParams, useRouter } from 'next/navigation';
import { useUpgradeTierThree } from 'api-services/business-services'; // Import the useUpgradeTierThree hook
import UploadDocumentModal from 'components/molecules/modals/UploadDocument';
import SelectInputField from 'components/organisms/select/SelectInputField';
import CustomSelectField from 'components/organisms/select/SelectField';

const AddressVerificationFormTemplate = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedDocumentType, setSelectedDocumentType] = useState<
    string | null
  >(''); // Document type state
  const [fileUrl, setFileUrl] = useState<string | null>(null); // Store the file URL here
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal disclosure for file upload
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
        userId: id?.id as string,
      };

      try {
        await upgradeTierThree(payload);
        router.push(
          `/admin/dashboard/business/customer-onboarding/manage-business/${id?.id}/success`,
        );
      } catch (error) {
        console.error('Upgrade failed:', error);
      }
    }
  };

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <Box w={'fit-content'}>
        <HeaderBackButton
          header="Account Upgrade - Tier 3"
          onBack={() => router.back()}
        />
      </Box>
      <Box px={{ base: '20px', md: 4 }} pt={isMobile ? '6px' : '36px'} pb={8}>
      
      <Box
              bg={isMobile ? '#F8FAFC' : 'white'}
              width={{ base: '100%', lg: '941px' }}
              mx="auto"
              borderRadius="8px"
              pt={isMobile ? '15px' : '30px'}
              pb="30px"
              px={isMobile ? '0' : 124}
              border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
          >        {/* <Box
          borderWidth={{md: "1px"}}
          borderColor={{md: "gray.200"}}
          borderRadius="lg"
          
          boxShadow="sm"
        > */}
          <Text
            letterSpacing="-1.2%"
            variant="head"
            textAlign={{ base: 'left', md: 'center' }}
            mb={2}
            color={'#222B38'}
          >
            Address Verification
          </Text>
          <Text
            variant="sm"
            mb={6}
            textAlign={{ base: 'left', md: 'center' }}
            color={'#222B38'}
          >
            We accept light, water, and waste bills as well as bank statements.
            Bill must not be more than 3 months old. Ensure user&apos;s address
            matches that on their &quot;Proof of address&quot;
          </Text>
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

           <Text
                          textAlign={'center'}
                          mb={3}
                          mt={10}
                          variant={'base'}
                      >
                          Upload Document
                      </Text>
          <DocumentUploader
            onFileSelect={handleFileSelect}
            onUploadClick={onOpen}
            display={fileUrl}
          />

          <Box mt={10}>
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
        {/* </Box> */}
      </Box>

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
    </Flex>
  );
};

export default AddressVerificationFormTemplate;
