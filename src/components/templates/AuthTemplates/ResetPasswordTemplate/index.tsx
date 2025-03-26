import React from 'react';
import { Box, Image, Flex, Show } from '@chakra-ui/react';
import Logo from '../../../../img/oneWalletLogo.png';
import ResetPasswordForm from 'components/organisms/forms/ResetPasswordForm';

const ResetPasswordTemplate: React.FC = () => {
    return (
        <Flex
            height="100vh"
            alignItems="center"
            justifyContent="center"
            bg={'white'}
        >
            <Box
                width={{xs:"95%", lg:"60%"}}
                h="100%"
                pl={{xs:"0px", lg:"40px"}}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Show above="md">
                    <Image
                        src={Logo.src}
                        alt="logo"
                        objectFit="contain"
                        width="243.95px"
                        height="37.72px"
                        ml="20px"
                        mb="45px"
                    />
                </Show>
                <ResetPasswordForm />
            </Box>
        </Flex>
    );
};

export default ResetPasswordTemplate;
