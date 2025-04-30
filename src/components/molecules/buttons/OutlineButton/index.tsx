import React from 'react';
import {Box, Button, Text} from '@chakra-ui/react'
import {IButtonProps} from "../interfaces";

const OutlineButton = ({
  text, icon, color, textVariant, fontSize, h, ...props
}: IButtonProps ) => {
  return (
    <Button
        borderRadius={'8px'}
        border={'1.2px solid #0F454F'}
        variant={'outline'}
        _disabled={{ bg: '#A0AEC0', cursor: 'not-allowed' }}
        minH={h || '48px'}
        w={'full'}
      {...props}

    >
      <Text variant={textVariant || 'base'} fontSize={fontSize} color={color || '#000'}>{text}</Text>
      {icon && (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            {icon}
        </Box>
      )}

    </Button>
  );
};

export default OutlineButton;

