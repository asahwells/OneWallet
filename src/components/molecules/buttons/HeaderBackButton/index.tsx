"use client"

import {Box, Flex, HStack, IconButton, Text, useBreakpointValue} from "@chakra-ui/react";
import {ArrowBackIcon, ChevronLeftIcon} from "@chakra-ui/icons";
import React from "react";
import {HeaderBackButtonProps} from "../interfaces";

const HeaderBackButton = ({ onBack, header, iconType}: HeaderBackButtonProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <>

            {/* Mobile Top Bar */}
            {isMobile ? (
                <Flex
                    as="header"
                    alignItems="center"
                    justifyContent="space-between"
                    h="60px"
                    bg="#FFFFFF"
                    borderBottom="1px solid #E2E8F0"
                    position="relative"
                    w={'full'}
                    px={'14px'}

                >
                    <Box cursor={'pointer'} onClick={onBack}>
                        <ChevronLeftIcon w={6}  h={6}/>
                    </Box>
                   <Box>
                       <Text variant={'md'}>
                           {header || `Register a User`}
                       </Text>
                   </Box>

                    <Box>

                    </Box>

                </Flex>
            ) : (
                // Desktop: Back button outside the card
                <HStack as="header" p={4} cursor={'pointer'}   onClick={onBack}>
                    <ChevronLeftIcon w={6}  h={6}/>
                    <Text variant={'md'}>
                       Back
                    </Text>
                </HStack>
            )}

        </>
    )
}

export default HeaderBackButton;