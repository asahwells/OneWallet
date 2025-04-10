import { 
  Box, 
  Flex,
  Heading,
  Text, 
  useBreakpointValue 
} from '@chakra-ui/react';
import { 
  FailedStatusIcon, 
  PendingStatusIcon, 
  SuccessStatusIcon 
} from 'components/atoms/icons/StatusIcon';
import OnboardingErrorBox from 'components/molecules/box/OnboardingErrorBox';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import { IOnboardingErrorMessageBoxProps, RegisterSteps, VerificationStatus } from 'components/molecules/buttons/interfaces';
import React, {useEffect, useState} from 'react';
import {useGetCustomerInformation} from "../../../../../../api-services/business-registration-services";
import {useAppSelector} from "../../../../../../redux/store";

interface VerificationInProgressTemplateProps {
  onNext: () => void;
  onBack: (step: RegisterSteps) => void;
}

const VerificationProgressTemplate = ({
                                        onNext,
  onBack
}: VerificationInProgressTemplateProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isDataValid, setIsDataValid] = useState(false)

  const {customerDetails} = useAppSelector(state => state.customer)
  const {data: customerInfo, mutateAsync: fetchCustomerInfo, isPending} = useGetCustomerInformation(customerDetails?.id)

  const getVerificationStatus = () => {
    if (isPending) return VerificationStatus.Pending;

    if (customerInfo?.data?.accountNumber) {
      return VerificationStatus.Complete;
    }

    return VerificationStatus.Failed;

  }

  const verificationSteps = [
    {label: "Verifying User's BVN", status: getVerificationStatus(), step: RegisterSteps.BvnOrNin},
    {label: "Verifying User's Photo", status: getVerificationStatus(), step: RegisterSteps.PhotoUpload},
    {label: "Verifying User's Date of Birth", status: getVerificationStatus(), step: RegisterSteps.SelectBirth},
  ]


  useEffect(() => {
    fetchCustomerInfo()
  }, []);

  useEffect(() => {

    if (customerInfo?.data?.accountNumber) {
      setTimeout(() => {
        onNext();
      }, 2000);
    }

  }, [customerInfo?.data]);


  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.Pending:
        return <PendingStatusIcon />;
      case VerificationStatus.Failed:
        return <FailedStatusIcon />;
      case VerificationStatus.Complete:
        return <SuccessStatusIcon />;
      default:
        return null;
    }
  };

  // Get the first failed verification step
  const failedStep = verificationSteps.find(step => step.status === VerificationStatus.Failed);

  const getErrorMessage = (failedStep?: { label: string; status: VerificationStatus }) => {
    if (!failedStep) return null;

    switch (failedStep.label) {
      case "Verifying User's BVN":
        return {
          title: "Error Message",
          showNote: false,
          message: "We could not verify this user's BVN, please ensure they use their correct BVN or signup using their NIN.",
          details: []
        } as IOnboardingErrorMessageBoxProps;
      case "Verifying User's Photo":
        return {
          title: "Error Message",
          showNote: true,
          message: "We could not verify this photo, please try again.",
          details: [
            "Make sure the user's face is captured properly",
            "Make sure they're not wearing glasses",
            "Make sure the picture is clear"
          ]
        } as IOnboardingErrorMessageBoxProps;
      case "Verifying User's Date of Birth":
        return {
          title: "Error Message",
          showNote: true,
          message: "We could not verify this user's Date of Birth, please check and try again.",
          details: [
            "Ensure the provided Date of Birth matches the official records"
          ]
        } as IOnboardingErrorMessageBoxProps;
      default:
        return null;
    }
  };

  const errorData = getErrorMessage(failedStep);



  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      {isMobile && <HeaderBackButton onBack={() => {}} />}
      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box 
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={isMobile ? '100%' : '941px'}
          mx="auto"
          borderRadius="8px"
          pt={isMobile ? '15px' : '30px'}
          pb="30px"
          px={isMobile ? '0px' : '57px'}
          border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
        >
          <Heading
            as="h1"
            fontSize="18px"
            fontWeight={700}
            color="#222B38"
            textAlign={isMobile ? 'left' : 'center'}
            mb={2}
          >
            Verification in progress
          </Heading>

          <Text
            fontSize="14px"
            color="#344256"
            fontWeight={400}
            mb={6}
            textAlign={isMobile ? 'left' : 'center'}
          >
            We are verifying this user&apos;s information
          </Text>

          <Box
            h="160px"
            bg="#F1F5F9"
            mx="auto"
            px="17px"
            py="19px"
            w={isMobile ? '100%' : "390px"}
            borderRadius="8px"
            mb={failedStep ? '29px' : '80px'}
          >
            {verificationSteps.map(({ label, status }, index) => (
              <Flex key={index} gap="8px" mb={index < verificationSteps.length - 1 ? "24px" : "0"} alignItems="center">
                {getStatusIcon(status)}
                <Text fontWeight={500} fontSize="16px" color="#222B38">
                  {label}
                </Text>
              </Flex>
            ))}
          </Box>

          {failedStep  && <OnboardingErrorBox
            borderRadius="8px"
            bg="#F1F5F9"
            mx="auto"
            w={isMobile ? '100%' : '390px'}
            minHeight="276px"
            h="auto"
            pl="40px"
            pb="26.37px"
            pr="25px"
            onRetry={() => onBack(failedStep.step)}
            verificationStatus={failedStep.status}
            errorDetails={errorData}
          />}
        </Box>
      </Box>
    </Flex>
  );
};

export default VerificationProgressTemplate;
