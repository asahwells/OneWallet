import React, { useState, useEffect } from "react";
import { FormControl, Box, Text } from "@chakra-ui/react";
import FormLabel from "../../../atoms/labels/FormLabel";
import SearchableListModal from "components/molecules/modals/SearchableListModal";
import { IFormControlButton, ListProps } from "../interfaces";
import { ChevronRightIcon } from "@chakra-ui/icons";

const FormControlButton = ({
                             label,
                             items,
                             defaultValue,
                             onChange,
                             click,
                             ...props
                           }: IFormControlButton) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListProps | null>(null);

  // 1️⃣ Initialize from defaultValue whenever items or defaultValue changes
  useEffect(() => {
    if (defaultValue && items.length) {
      const found = items.find((i) => i.value === defaultValue) || null;
      setSelectedItem(found);
    }
  }, [items, defaultValue]);

  const handleClick = () => setIsModalOpen(true);

  const handleSelectItem = (item: ListProps) => {
    setSelectedItem(item);
    setIsModalOpen(false);
    onChange?.(item);
  };

  const hasValue = Boolean(selectedItem);

  return (
      <FormControl {...props} position="relative" h="56px" borderRadius="8px" borderColor="#E2E8F0">
        <FormLabel
            title={label}
            top={hasValue ? (props.labelPt || "-1px") : "50%"}
            left="16px"
            fontSize={hasValue ? "10px" : "16px"}
            color="#344256"
            lineHeight={hasValue ? "16px" : "24px"}
            transform={hasValue ? "none" : "translateY(-50%)"}
            transition="0.2s"
            zIndex="1"
        />

        <Box
            onClick={handleClick}
            display="flex"
            alignItems="center"
            border="1px solid #E2E8F0"
            borderRadius="8px"
            px="16px"
            h="100%"
            cursor="pointer"
            pointerEvents={click ?? "auto"}
            bg='#FFFFFF'
        >
          <Text flex="1" fontSize="16px" fontWeight="400" color={hasValue ? "#344256" : "#A0AEC0"}>
            {selectedItem?.name || ""}
          </Text>
          <ChevronRightIcon w={6} h={6} />
        </Box>

        {isModalOpen && (
            <SearchableListModal
                pt={8}
                minWidth={{ base: "100%", md: "40%", lg: "980px" }}
                isOpen
                onClose={() => setIsModalOpen(false)}
                items={items}
                onSelectItem={handleSelectItem}
            />
        )}
      </FormControl>
  );
};

export default FormControlButton;
