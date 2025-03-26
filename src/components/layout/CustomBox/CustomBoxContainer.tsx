import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";
import { ICustomBoxProps } from "../interfaces";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const CustomBox = ({
    children,
    ...props
}: ICustomBoxProps) => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    return (
        <Box {...props} color="#FAFAFB" pt="26px" w={'full'}>
            <Flex onClick={goBack} cursor={'pointer'} mb={4} color={'black'}align={'center'}>
                <ChevronLeftIcon color={'#344256'} h={7} w={7}/>
                <Text variant={'md'}>Back</Text>
            </Flex>
            {children}
        </Box>
    );
};

export default CustomBox;
