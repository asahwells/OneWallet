import React from 'react';
import { Button } from '@chakra-ui/react'
import {IButtonProps} from "../interfaces";

const BaseButton = ({
  text, bg, onClick, ...props
}: IButtonProps ) => {
  return (
    <Button
      bg={bg ?? ''}
      onClick={onClick}
      _hover={{ bg: '#0C363E', color: 'white' }}
      fontWeight={400}
      fontSize={'16px'}
      {...props}
    >
      {text}
    </Button>
  );
};

export default BaseButton;

