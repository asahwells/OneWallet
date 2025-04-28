// components/molecules/buttons/FormControlButton.tsx

import React, { useState, useEffect } from "react";
import { FormControl, Box, Text } from "@chakra-ui/react";
import FormLabel from "../../../atoms/labels/FormLabel";
import SearchableListModal from "components/molecules/modals/SearchableListModal";
import { IFormControlButton, ListProps } from "../interfaces";
import { ChevronRightIcon } from "@chakra-ui/icons";

const FormControlButton: React.FC<IFormControlButton> = ({
                                                             label,
                                                             items,
                                                             notSearchable,
                                                             defaultValue,
                                                             onChange,
                                                             click,         // preserves any external pointerEvents override
                                                             labelPt,
                                                                isDisabled,
                                                                value,
                                                             ...props
                                                         }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ListProps | null>(null);

    // 1️⃣ initialize from defaultValue
    useEffect(() => {
        if (defaultValue && items.length) {
            const found = items.find((i) => i.value === defaultValue) || null;
            setSelectedItem(found);
        }
    }, [items, defaultValue]);

    // 2️⃣: **New**—re‐sync whenever the controlled `value` prop changes
    useEffect(() => {
        if (value != null && items.length) {
            const found = items.find((i) => i.value === value) || null;
            setSelectedItem(found);
        }
    }, [value, items]);

    const hasValue = Boolean(selectedItem);
    const isFocused = isModalOpen;

    const open = () => {
        if (!isDisabled) {
            setIsModalOpen(true);
        }
    }
    const close = () => setIsModalOpen(false);

    const handleSelect = (item: ListProps) => {
        setSelectedItem(item);
        close();
        onChange?.(item);
    };

    return (
        <FormControl
            position="relative"
            h="56px"
            borderRadius="8px"
            bg={'white'}
            border="1px solid"
            borderColor={isFocused ? "#CBD5E1" : "#E2E8F0"}
            _hover={{ borderColor: isFocused ? "#CBD5E8" : "#CBD5E1" }}
            _focusWithin={{ borderColor: "#0F454F" }}

            // add fontweight medium to place holder
            fontWeight={hasValue ? '400' : 'medium'}
            {...props}

        >
            {/* Floating Label */}
            <FormLabel
                title={label}
                left="16px"
                top={isFocused || hasValue ? (labelPt || "6px") : "50%"}
                fontSize={{base: isFocused || hasValue ? "10px" : "14px", lg: isFocused || hasValue ? "10px" : "16px"}}
                fontWeight={(isFocused || hasValue)  && '400'}
                lineHeight={isFocused || hasValue ? "16px" : "24px"}
                color="#344256"
                transform={isFocused || hasValue ? "none" : "translateY(-50%)"}
                transition="0.2s ease-in-out"
                bg="white"

                zIndex="1"
            />

            {/* Clickable area */}
            <Box
                onClick={open}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px="16px"
                h="100%"
                cursor={click ?? "pointer"}
                pointerEvents={click}
            >
                <Text
                    flex="1"
                    mt={5}
                    fontSize="16px"
                    fontWeight="400"
                    color={hasValue ? "#344256" : "#A0AEC0"}
                >
                    {selectedItem?.name || ""}
                </Text>
                <ChevronRightIcon w={6} h={6} color="#94A3B8" />
            </Box>

            {/* Modal */}
            {isModalOpen && (
                <SearchableListModal
                    notSearchable={notSearchable}
                    pt={8}
                    isOpen
                    onClose={close}
                    items={items}
                    onSelectItem={handleSelect}
                />
            )}
        </FormControl>
    );
};

export default FormControlButton;
