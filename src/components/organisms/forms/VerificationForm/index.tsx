import React, { useState, useEffect } from "react";
import {
  Flex,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import BasePinInput from "components/molecules/inputs/BasePinInput";
import BaseButton from "components/molecules/buttons/BaseButton";
import { VerificationFormProps } from "../interfaces";
import { usePhoneNumberVerification, useResendOTP } from "api-services/auth-services";
import { useAppSelector } from "../../../../redux/store";
import { useFetchLoggedInUser } from "api-services/dashboard-services";

// Helper to format seconds as mm:ss
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  // pad with leading zero if needed
  const sDisplay = s < 10 ? `0${s}` : s;
  return `${m}:${sDisplay}`;
}

const VerificationForm = ({
  title,
  label,
}: VerificationFormProps) => {
  const { userDetails } = useAppSelector((state) => state.user);
  
  const [otp, setOtp] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // 3 minutes = 180 seconds
  const [timeLeft, setTimeLeft] = useState(180);

  const customToast = useToast();
  const router = useRouter();

  const { mutateAsync: verifyPhone, isPending: isPhoneNumberVerifying } = usePhoneNumberVerification();
  const { mutateAsync: resendOTP, isPending: isResendingOTP } = useResendOTP();
  const { mutateAsync: fetchUser, isPending: isFetchingUser } = useFetchLoggedInUser();

  // Decrement the countdown once per second if timeLeft > 0
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Update the disabled state for the Verify button
  useEffect(() => {
    setIsDisabled(otp.length < 4);
  }, [otp]);

  // Handle verifying the OTP
  const handleClick = async () => {
    if (!otp) {
      return customToast({
        status: "warning",
        description: "Please enter OTP",
        title: "Error",
      });
    }

    const data = { otp };
    await verifyPhone(data);
    await fetchUser();

    // If successful
    router.replace("/admin/dashboard");
  };

  // Handle resending the OTP and restart the timer
  const handleResend = async () => {
    if (!userDetails?.phone) {
      customToast({
        status: "error",
        description: "No phone number available to resend OTP",
        title: "Error",
      });
      return;
    }

    const data = { phone: userDetails.phone };

    const resp = await resendOTP(data);
    if (resp) {
      setTimeLeft(180); // Reset countdown to 3 minutes
    }
  };

  return (
    <Flex
      flex={1}
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
      p={{ base: 0, md: 8 }}
      w={{ base: "100%", md: "704px" }}
      mt={{ base: "23px", md: "24px" }}
      maxHeight={{ base: "auto", md: "407px" }}
      border={{ base: "none", md: "1px solid #CBD5E1" }}
      bgColor={{ base: "transparent", lg: "#FFFFFF" }}
    >
      <VStack pt="23px" w="full">
        {/* Title & label */}
        <VStack w="full" gap="8px" mb="35px">
          {title}
          {label}
        </VStack>

        {/* 4-digit pin input */}
        <BasePinInput count={4} onChange={setOtp}>
          {/* If BasePinInput expects children, you can place them here.
              If not needed, just remove this empty fragment. */}
          <></>
        </BasePinInput>

        <VStack w="100%" gap="24px">
          {/* Countdown Timer */}
          <Flex
            justifyContent="center"
            marginTop={timeLeft > 0 ? "36px" : 0}
            alignItems="center"
          >
            {timeLeft > 0 && (
              <Text fontWeight="500" color="#C5B27D" fontSize="18px">
                {formatTime(timeLeft)} 
                {/* e.g. "3:00" at start, then "2:59", etc. */}
              </Text>
            )}
          </Flex>

          {/* Verify Button */}
          <BaseButton
            variant="ghost"
            text="Verify"
            isLoading={isPhoneNumberVerifying}
            onClick={handleClick}
            backgroundColor={isDisabled ? "#CFDADC" : "#0F454F"}
            color={isDisabled ? "#171C23" : "#FCFCFC"}
            borderRadius="8px"
            h="56px"
            w={{ base: "100%", md: "520px" }}
            disabled={isDisabled}
          />

          {/* Resend Button / Text */}
          <Text mb="38px" fontWeight="400" fontSize="16px" color="#0F454F">
            Didn&apos;t receive the code?
            <Text
              ml="20px"
              fontWeight="600"
              fontSize="16px"
              color={timeLeft > 0 ? "#A0AEC0" : "#0F454F"}
              cursor={timeLeft > 0 ? "not-allowed" : "pointer"}
              opacity={timeLeft > 0 ? 0.6 : 1}
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
