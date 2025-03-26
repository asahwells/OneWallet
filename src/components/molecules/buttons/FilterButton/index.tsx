import React from 'react';
import { Button } from '@chakra-ui/react'
import {IButtonProps} from "../interfaces";
import DownloadIcon from 'components/atoms/icons/DownloadIcon';
import FilterIcon from 'components/atoms/icons/FilterIcon';

const FilterButton = ({
  onClick, ...props
}: IButtonProps ) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      width="56px"
      height="56px"
      border="2px"
      borderColor="#E2E8F0"
      bg = '#FFFFFF'
      gap="12px"
      borderRadius="8px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      _hover={{ bg: '#F1F5F9' }}
    >
      <FilterIcon/>
    </Button>
  );
};

export default FilterButton;

