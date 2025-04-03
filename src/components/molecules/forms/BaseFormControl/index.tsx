import React, { useState, useEffect } from "react";
import { FormControl } from "@chakra-ui/react";
import FormLabel from "../../../atoms/labels/FormLabel";
import { IFormControl } from "../interfaces";

const BaseFormControl = ({ label, children,labelPt, ...props }: IFormControl) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        // Check if the input has value to manage the label position
        if (children && React.isValidElement(children)) {
            setHasValue(!!children.props.value);
        }
    }, [children]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (children && React.isValidElement(children)) {
            setHasValue(!!children.props.value);
        }
    };

    return (
        <FormControl
            {...props}
            position="relative"
            h="56px"
            // border="2px"
            borderRadius="8px"
            borderColor="#E2E8F0"
        >
            <FormLabel
                title={label}
                top={isFocused || hasValue ? (labelPt || '-1px') : '50%'}
                left={'16px'}
                fontSize={isFocused || hasValue ? '10px' : '16px'}
                color={'#344256'}
                lineHeight={isFocused || hasValue ? '16px' : '24px'}
                transform={isFocused || hasValue ? 'none' : 'translateY(-50%)'}
                transition="0.2s ease-in-out"
                zIndex="1"
            />
            {React.cloneElement(children as React.ReactElement<any>, {
                onFocus: handleFocus,
                onBlur: handleBlur,
            })}
        </FormControl>
    );
};

export default BaseFormControl;
