import React, { useState } from 'react';
import EyeIcon from 'components/atoms/icons/EyeIcon';
import BaseInput from 'components/molecules/inputs/BaseInput';
import { IPasswordInputProps } from '../interfaces';

const PasswordInput = ({ placeholder, value, onChange, onFocus, onBlur }: IPasswordInputProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <BaseInput
            type={isVisible ? 'text' : 'password'}
            placeholder={placeholder || "Enter Password"}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            icon={<EyeIcon onClick={toggleVisibility} />}
        />
    );
};

export default PasswordInput;
