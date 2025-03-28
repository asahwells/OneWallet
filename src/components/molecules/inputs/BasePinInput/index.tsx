import { HStack, Input } from "@chakra-ui/react";
import { useState, useRef } from "react";

interface BasePinInputProps {
  count?: number;
  onChange: (value: string) => void;
  value?: string;
}

const BasePinInput: React.FC<BasePinInputProps> = ({ count = 4, onChange, value = "" }) => {
  const [otp, setOtp] = useState(Array(count).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value.replace(/\D/, ""); // Only allow digits
    if (val.length > 1) return; // Prevent multiple character input

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to next input if value is entered
    if (val && index < count - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <HStack spacing={'18.04px'} justifyContent="center">
      {Array.from({ length: count }).map((_, i) => (
        <Input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          value={otp[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          variant={'otpInput'}
          autoComplete="off"
          inputMode="numeric"
          maxLength={1}
        />
      ))}
    </HStack>
  );
};

export default BasePinInput;
