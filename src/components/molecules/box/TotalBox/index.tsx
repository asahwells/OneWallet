import React from 'react';
import {Box, Spinner, Text} from '@chakra-ui/react'
import { IBoxProps } from "../../buttons/interfaces";
import DownloadIcon from 'components/atoms/icons/DownloadIcon';

const TotalBox = ({
                    onClick, title, total, isLoading, ...props
}: IBoxProps ) => {
  return (
    <Box
      {...props}
      onClick={onClick}
      width="121px"
      height="56px"
      bg = '#F1F5F9'
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="4px"
    >

      {isLoading ?

          <Spinner/> : <Text fontWeight={600} fontSize="20px" lineHeight="32px" letterSpacing="-1.4%" textAlign="center"
                             color="#344256">
            {total}
          </Text>
      }

    </Box>
  );
};

export default TotalBox;

