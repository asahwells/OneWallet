import React, { useState } from 'react';
import { Box, Button, Text, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IButtonProps } from '../interfaces';

const SelectOutlineButton = ({ text, icon, color, onClick, textVariant, fontSize, h, ...props }: IButtonProps) => {
return (
    <Button
        onClick={onClick}
        borderRadius={'8px'}
        border={'1px solid #EF4444'}
        variant={'outline'}
        minH={'48px'}
        w={'full'}
        display="flex"
        justifyContent="center"
        alignItems="center"
        {...props}
    >
        <Text color={'#EF4444'} fontSize={'16px'}>{text}</Text>
        {icon}
    </Button>
);
};

export default SelectOutlineButton;