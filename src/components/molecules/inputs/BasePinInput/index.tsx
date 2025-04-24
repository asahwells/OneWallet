import { HStack, PinInput, PinInputField, PinInputProps } from "@chakra-ui/react";
import { useState } from "react";

interface BasePinInputProps extends PinInputProps {
  count?: number;
  onChange: (value: string) => void;
  value?: string;
}

const BasePinInput: React.FC<BasePinInputProps> = ({ count = 4, onChange, value = "" }) => {
  const [otp, setOtp] = useState(value);

  const handleChange = (val: string) => {
    setOtp(val);
    onChange(val);
  };

  return (
    <HStack spacing="18.04px" justifyContent="center">
      <PinInput value={otp} onChange={handleChange} otp mask>
        {Array.from({ length: count }).map((_, i) => (
          <PinInputField 
            placeholder="" 
            autoFocus={i===0}
            width={{base: '52px', md: '69.13px'}}
            height={{base: '50px', md: '60px'}}
            background={'#FFFFFF'}
            _focus={{
              borderColor: "#0F454F",
              boxShadow: 'none',
              backgroundColor: "#FFFFFF",
            }}
            border={"1px solid #E2E8F0"}
            sx={{
              "&::placeholder": { color: "transparent" },
              "&::-webkit-input-placeholder": { color: "transparent" },
              "&::-moz-placeholder": { color: "transparent" },
              textAlign: "center",
            }}
            key={i} />
        ))}
      </PinInput>
    </HStack>
  );
};

export default BasePinInput;
