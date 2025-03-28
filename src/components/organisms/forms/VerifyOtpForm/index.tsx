import {
    Flex,
    VStack,
    Text,
    Box,
    Heading,
    Image,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import BasePinInput from "components/molecules/inputs/BasePinInput";
  import BaseButton from "components/molecules/buttons/BaseButton";
  
  const VerifyOtpForm = () => {
    const [otp, setOtp] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    
    const [timeLeft, setTimeLeft] = useState(34); // Initial countdown in seconds

    

    const handleClick = async () => {}
  
    useEffect(() => {
      setIsDisabled(otp.length < 4);
    }, [otp]);
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);
  

    const responsiveText = {
        textAlign: 'center',
        '@media (max-width: 768px)': {
            textAlign: 'left',
        },
        }
  
    return (
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          borderRadius={'8px'}
          sx={{
            maxHeight: '407px',
            w: '704px',
            mt: '64px',
            p: 8,
            border: '1px solid #CBD5E1',
            '@media (max-width: 768px)': {
                mt: '24px',
                p: 0,
                w: '100%',
                maxHeight: 'auto',
                border: 'none',
        },
        }}
          bgColor={{base: 'transparent',lg :'#FFFFFF'}}
        >
          <VStack pt={"23px"} w='full'>
            <VStack w='full' gap={"8px"} mb={"35px"}>
                <Text w='full' sx={
                    responsiveText
                } variant={'otvVerifyTitle'}>Phone Number Verification</Text>
                <Text w='full'
                    sx={responsiveText}
                  variant={'otvVerifySubTitle'}>Enter the code we sent to your phone number</Text>
            </VStack>
            <BasePinInput count={4} onChange={setOtp} />
  
            <VStack w={'100%'} gap={"24px"}>
              <Flex justifyContent="center" marginTop={timeLeft > 0 ? "36px": 0} alignItems="center">
                {timeLeft > 0 &&<Text fontWeight={"500"} color={"#C5B27D"} fontSize="18px">
                  {`0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
                </Text>}
              </Flex>
              <BaseButton
                variant={"ghost"}
                text={'Verify'}
                onClick={handleClick}
                borderRadius={"8px"}
                h={"152px"}
                sx={{
                  backgroundColor: otp.length < 4 ? "#CFDADC" : "#0F454F",
                  color: otp.length < 4 ? "#171C23" : "#FCFCFC",
                  w: '520px',
                  '@media (max-width: 768px)': {
                        w: '100%',
                    },
                }}
              />
              <Text mb={"38px"} fontWeight={"400"} fontSize={"16px"} color={"#344256"}>
                Didn&apos;t Receive the code?
                <Text
                  ml={"20px"}
                  fontWeight={"400"}
                  fontSize={"16px"}
                  sx={{
                    color: timeLeft > 0 ? "#344256" : "#0F454F",
                  }}
                  as="span"
                >
                  Resend
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Flex>
    );
  };
  
  export default VerifyOtpForm;