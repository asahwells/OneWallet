"use client"

import {Box, Flex, HStack, IconButton, Text, useBreakpointValue} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import React from "react";
import {HeaderBackButtonProps} from "../interfaces";

const HeaderBackButton = ({ onBack}: HeaderBackButtonProps) => {
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
                    borderBottom="1px solid #E2E8F0"
                    position="relative"
                    bg="white"
                    w={'full'}
                    px={4}

                >
                    <Box cursor={'pointer'} onClick={onBack}>
                        <ArrowBackIcon w={5}  h={5}/>
                    </Box>
                   <Box>
                       <Text variant={'md'}>
                           Register a User
                       </Text>
                   </Box>

                    <Box>

                    </Box>

                </Flex>
            ) : (
                // Desktop: Back button outside the card
                <HStack as="header" p={4} cursor={'pointer'}   onClick={onBack}>
                    <ArrowBackIcon w={5}  h={5}/>
                    <Text variant={'md'}>
                       Back
                    </Text>
                </HStack>
            )}

        </>
    )
}

export default HeaderBackButton;