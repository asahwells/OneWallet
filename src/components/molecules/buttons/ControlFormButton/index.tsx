import React, { useState } from 'react';
import { Box, Text, Select, FormControl } from '@chakra-ui/react';
import FormLabel from "../../../atoms/labels/FormLabel";
import { ListProps } from '../interfaces';

interface IFormControlButton {
  label: string;
  labelPt?: string;
  items: ListProps[];  // Expecting items to be an array of objects with 'name' and 'value'
  onChange?: (item: ListProps) => void;
}

const ControlFormButton = ({ label, labelPt, items, onChange, ...props }: IFormControlButton) => {
  const [selectedItem, setSelectedItem] = useState<ListProps | null>(null);

  // Log the items for debugging
  console.log("Items passed to Select:", items);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = items.find(item => item.value === selectedValue);
    setSelectedItem(selectedOption || null);
    if (onChange && selectedOption) {
      onChange(selectedOption); // Ensure selected option is passed back
    }
  };

  return (
    <FormControl {...props} position="relative" h="56px" borderRadius="8px" borderColor="#E2E8F0">
      <FormLabel
        title={label}
        top={selectedItem ? (labelPt || "-1px") : "50%"}
        left={"16px"}
        fontSize={selectedItem ? "10px" : "16px"}
        color={"#344256"}
        lineHeight={selectedItem ? "16px" : "24px"}
        transform={selectedItem ? "none" : "translateY(-50%)"}
        transition="0.2s ease-in-out"
        zIndex="1"
      />
      <Select
  value={selectedItem?.value || ""} // Render the value of selected item
  onChange={handleChange}
  borderColor="#E2E8F0"
  borderRadius="8px"
  fontSize="16px"
  padding="0 16px"
  height="100%"
  cursor="pointer"
>
  <option value="" disabled>Select {label}</option>
  {items.map((item) => (
    <option key={item.value} value={item.value}>
      {item.name}  {/* Ensure this is a string */}
    </option>
  ))}
</Select>

    </FormControl>
  );
};

export default ControlFormButton;
