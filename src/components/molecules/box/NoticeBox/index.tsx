import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react'
import { IBoxProps } from "../../buttons/interfaces";
import InfoCyleIcon from 'components/atoms/icons/InfoCyleIcon';

const NoticeBox = ({
  h, borderRadius, title, ...props
}: IBoxProps ) => {
  return (
    <Box
        display={'flex'}
        gap={'8px'}
      {...props}
      borderRadius={borderRadius || "100px"}
      minHeight={h || '87px'}
    >
        <Box mr={0} mt={0} pt={0}>
            <InfoCyleIcon innerFill='#C5B27D' outerFill='#FFFFFF' />
        </Box>
        <Text fontWeight={400} fontSize="14px" letterSpacing="-1%" textAlign="justify" color="#FFFFFF" lineHeight={'22px'}>
        {title}
        </Text>
    </Box>
  );
};

export default NoticeBox;

