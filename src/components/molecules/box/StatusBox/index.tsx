import React from 'react';
import { Box, Text } from '@chakra-ui/react'
import { IBoxProps } from "../../buttons/interfaces";
import DownloadIcon from 'components/atoms/icons/DownloadIcon';

const StatusBox = ({
  onClick, h, borderRadius, title, ...props
}: IBoxProps ) => {
  return (
    <Box
      {...props}
      onClick={onClick}
      //height="30px"
      w='auto'
      bg = {title === 'successful' ? '#22C55E': title === 'pending'? '#C5B27D': title === 'approved'? '#22C55E': title === 'initiated'? '#22C55E' : '#EF4444'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={borderRadius || "100px"}
      px={'20px'}
      h={h || '36px'}
    >
      <Text fontWeight={400} fontSize="16px" lineHeight="24px" letterSpacing="-1.2%" textAlign="center" color="#FFFFFF">
        {title}
      </Text>
    </Box>
  );
};

export default StatusBox;

