import React from 'react';
import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react'
import {IButtonProps} from "../interfaces";
import { ChevronLeftIcon } from '@chakra-ui/icons';

const GoBack = ({
  onClick, ...props
}: IButtonProps ) => {
  return (
    <IconButton
      aria-label="Go back"
      icon={<ChevronLeftIcon w={7} h={7}/>}
      bg={'transparent'}
      position="absolute"
      left="16px"
      onClick={onClick}
  />
  );
};

export default GoBack;