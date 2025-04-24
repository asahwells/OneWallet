import { InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import AnimatedInfoIcon from 'components/atoms/icons/AnimatedtInfoIcon';
import BaseButton from 'components/molecules/buttons/BaseButton'
import { IOnboardingErrorBoxProps, RegisterSteps, VerificationStatus } from 'components/molecules/buttons/interfaces'
import React from 'react'

function OnboardingErrorBox({
    h, onRetry, errorDetails, verificationStatus, ...props
}: IOnboardingErrorBoxProps) {
    const getRetryStep = () => {
        if (verificationStatus !== VerificationStatus.Failed) {
          return RegisterSteps.BvnOrNin; // Default if not failed
        }
    
        if (errorDetails?.title !== "Error Message") {
          return RegisterSteps.BvnOrNin; // Default if not error message
        }
    
        if (errorDetails?.message.includes("BVN")) {
          return RegisterSteps.BvnOrNin;
        }
    
        if (errorDetails?.message.includes("photo")) {
          return RegisterSteps.PhotoUpload;
        }
    
        if (errorDetails?.message.includes("Date of Birth")) {
          return RegisterSteps.SelectBirth;
        }
    
        return RegisterSteps.BvnOrNin; // Default if no match
    };
  return (
    <Box 
    {...props}
    >
      <Flex 
      alignItems={'center'}
      justifyContent={'center'}
      direction="column"
      mb={'14px'}
      >
          <AnimatedInfoIcon />
          <Flex direction={"column"} gap="14px">
              <Heading
              fontWeight={500}
              fontSize={'16px'}
              textAlign={'center'}
              color={'#222B38'} as={'h1'}>
                {errorDetails?.title}
              </Heading>
              <Text
              color={'#344256'}
              fontWeight={400}
              fontSize={'14px'}
              textAlign={'center'}
              >
                {errorDetails?.message}
              </Text>
          </Flex>
      </Flex>

      {/* Additional error details */}
      {errorDetails?.details.length > 0 && (
        <Box color={'#344256'} fontWeight={400} fontSize={'14px'} >
            {
                errorDetails.showNote &&
                <Text>
                    Please note:
                </Text>
            }
            <Flex direction="column" gap="14px" mt={4}>
              {errorDetails?.details.map((detail, index) => (
                <Flex key={index} gap="4px">
                    <InfoIcon h={'13.33px'} w={'13.33px'} color={'#0F454F'} />
                    <Text key={index} color={'#344256'} fontWeight={400} fontSize={'14px'}>
                      {detail}
                    </Text>
                </Flex>
              ))}
            </Flex>
        </Box>
      )}

      <BaseButton
        variant={"ghost"}
        text={'Try Again'}
        onClick={() => onRetry(getRetryStep())}
        backgroundColor="#FFFFFF"
        color="#0F454F"
        borderRadius={"8px"}
        border={'1.23px solid #0F454F'}
        h={"56px"}
        mt={'36px'}
        w='full'
        />
    </Box>
  )
}

export default OnboardingErrorBox
