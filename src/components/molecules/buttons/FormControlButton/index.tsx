import React, { useState, useEffect } from "react";
import { FormControl, Box, Text } from "@chakra-ui/react";
import FormLabel from "../../../atoms/labels/FormLabel";
import SearchableListModal from "components/molecules/modals/SearchableListModal";
import { IFormControlButton, ListProps } from "../interfaces";
import { ChevronRightIcon } from "@chakra-ui/icons";

const FormControlButton = ({ label, labelPt, items, onChange, ...props }: IFormControlButton) => {
  const [hasValue, setHasValue] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListProps | null>(null);

  useEffect(() => {
    setHasValue(!!selectedItem);
  }, [selectedItem]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSelectItem = (item: ListProps) => {
    setSelectedItem(item);
    setIsModalOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <FormControl {...props} position="relative" h="56px" borderRadius="8px" borderColor="#E2E8F0">
      <FormLabel
        title={label}
        top={hasValue ? (labelPt || "-1px") : "50%"}
        left={"16px"}
        fontSize={hasValue ? "10px" : "16px"}
        color={"#344256"}
        lineHeight={hasValue ? "16px" : "24px"}
        transform={hasValue ? "none" : "translateY(-50%)"}
        transition="0.2s ease-in-out"
        zIndex="1"
      />
      <Box
        onClick={handleClick}
        display="flex"
        alignItems="center"
        border="1px solid #E2E8F0"
        borderRadius="8px"
        padding="0 16px"
        height="100%"
        cursor="pointer"
      >
        <Text flex="1" fontSize={'16px'} fontWeight={400} color={selectedItem ? "#344256" : "#A0AEC0"}>
          {selectedItem && selectedItem.name} 
          {!selectedItem && null} 
        </Text>
        <ChevronRightIcon />
      </Box>

      {isModalOpen && (
        <SearchableListModal
            pt={8}
          minWidth={{ base: '100%', md: '40%', lg: '980px' }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={items}
          onSelectItem={handleSelectItem}
        />
      )}
    </FormControl>
  );
};

export default FormControlButton;