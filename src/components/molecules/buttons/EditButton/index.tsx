import React from 'react';
import { Button } from '@chakra-ui/react'
import {IButtonProps} from "../interfaces";
import DownloadIcon from 'components/atoms/icons/DownloadIcon';
import EditIcon from 'components/atoms/icons/EditIcon';

const EditButton = ({
  text, onClick, ...props
}: IButtonProps ) => {
  return (
    <Button 
        {...props}
        size="sm" 
        rightIcon={<EditIcon />}
        color="#0F454F"
        fontSize="14px"
        bg={'transparent'}
    >                  
      Edit
    </Button>
  );
};

export default EditButton;

