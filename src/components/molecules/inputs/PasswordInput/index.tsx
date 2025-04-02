import React, { useState } from 'react';
import EyeIcon from 'components/atoms/icons/EyeIcon';
import BaseInput from 'components/molecules/inputs/BaseInput';
import { IPasswordInputProps } from '../interfaces';
import EyeClosedIcon from "../../../atoms/icons/EyeClosedIcon";

const PasswordInput = ({ placeholder, value, onChange, onFocus, onBlur }: IPasswordInputProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <BaseInput
            type={isVisible ? 'text' : 'password'}
            // placeholder={placeholder || "Enter Password"}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            icon={
                isVisible ? (
                    <EyeIcon
                        onClick={toggleVisibility}
                        cursor={'pointer'}
                    />
                ) : (
                    <EyeClosedIcon
                        onClick={toggleVisibility}
                        cursor={'pointer'}
                    />
                )
            }
        />
    );
};

export default PasswordInput;
