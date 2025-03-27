import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import LoginForm from '../../../organisms/forms/LoginForm';
import LoginImage from '../../../../img/auth/loginImage.png';
import Logo from '../../../../img/oneWalletLogoWhite.png';

const LoginTemplate: React.FC = () => {
    return (
        <Flex
            height="100vh"
            alignItems="center"
            justifyContent="center"
            bg={'#0B343B'}
        >
            <Box
                width={{base: '80%', lg: '60%'}}
                h="100%"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                mx={'auto'}
            >
                <Image
                    src={Logo.src}
                    alt="logo"
                    objectFit="contain"
                    width="243.95px"
                    height="37.72px"
                    mx="auto"
                    mb="5%"
                />
                <LoginForm />
            </Box>
        </Flex>
    );
};

export default LoginTemplate;
