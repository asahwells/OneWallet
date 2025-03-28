import {
    Flex,
    VStack,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import React, { useEffect, useRef, useState } from "react";
  import { useRouter } from "next/navigation";

import BasePinInput from "components/molecules/inputs/BasePinInput";
import BaseButton from "components/molecules/buttons/BaseButton";
import { VerificationFormProps } from "../interfaces";
import { useOtpVerification, usePhoneNumberVerification } from "api-services/auth-services";
  
  const VerificationForm = ({
    title,
    label,
    screen = 'otp'
  }: VerificationFormProps) => {
    const [otp, setOtp] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    
    const customToast = useToast();
    const router = useRouter();
    
    const [timeLeft, setTimeLeft] = useState(0
      
    ); // Initial countdown in 0
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    const { mutateAsync: verifyOtp, isPending: isOtpVerifying } = useOtpVerification();
    const { mutateAsync: verifyPhone, isPending: isPhoneNumberVerifying } = usePhoneNumberVerification();


    const startCountdown = () => {
      setTimeLeft(34); // Start countdown at 34 seconds
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };
    

    const handleClick = async () => {
      if (!otp) {
          return customToast({
              status: "warning",
              description: "Please enter OTP",
              title: "Error",
          });
      }
  
      const data = { otp };
  
      if (screen === "otp") {
          startCountdown();
          await verifyOtp(data);
          return router.replace('/admin/dashboard');
      }
  
      if (screen === "phone") {
          startCountdown();
          await verifyPhone(data);
          return router.replace('/admin/dashboard');
      }
    };

    const handleResend = () => {
      startCountdown();
    }
  
  
    useEffect(() => {
      setIsDisabled(otp.length < 4);
    }, [otp]);
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

  
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
                {title}
                {label}
            </VStack>
            <BasePinInput count={4} onChange={setOtp} />
  
            <VStack w={'100%'} gap={"24px"}>
              <Flex justifyContent="center" marginTop={timeLeft > 0 ? "36px": 0} alignItems="center">
              {timeLeft > 0 && (
                <Text fontWeight={"500"} color={"#C5B27D"} fontSize="18px">
                  {`0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
                </Text>
              )}
              </Flex>
              <BaseButton
                variant={"ghost"}
                text={'Verify'}
                isLoading={isOtpVerifying || isPhoneNumberVerifying}
                onClick={handleClick}
                borderRadius={"8px"}
                h={"56px"}
                sx={{
                  backgroundColor: otp.length < 4 ? "#CFDADC" : "#0F454F",
                  color: otp.length < 4 ? "#171C23" : "#FCFCFC",
                  w: '520px',
                  '@media (max-width: 768px)': {
                        w: '100%',
                    },
                }}
              />
              <Text mb={"38px"} fontWeight={"400"} fontSize={"16px"} color={"#0F454F"}>
                Didn&apos;t Receive the code?
                <Text
                  ml={"20px"}
                  fontWeight={"600"}
                  fontSize={"16px"}
                  sx={{
                    color: timeLeft > 0 ? "#A0AEC0" : "#0F454F",
                    cursor: timeLeft > 0 ? "not-allowed" : "pointer",
                    opacity: timeLeft > 0 ? 0.6 : 1
                  }}
                  as="button"
                  disabled={timeLeft > 0}
                  onClick={handleResend}
                >
                  Resend
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Flex>
    );
  };
  
  export default VerificationForm;