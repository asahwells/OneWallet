import React from 'react';
import { Button } from '@chakra-ui/react'
import {IButtonProps} from "../interfaces";
import DownloadIcon from 'components/atoms/icons/DownloadIcon';

const DownloadButton = ({
  text, onClick, ...props
}: IButtonProps ) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      width="166px"
      height="56px"
      border="2px"
      borderColor="#E2E8F0"
      bg = '#FFFFFF'
      padding="12px, 36px, 12px, 36px"
      gap="12px"
      borderRadius="8px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      _hover={{ bg: '#F1F5F9' }}
    >
      {text}
      <DownloadIcon/>
    </Button>
  );
};

export default DownloadButton;

