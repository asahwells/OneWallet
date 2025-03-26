import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import LoginForm from '../../../organisms/forms/LoginForm';
import LoginImage from '../../../../img/auth/loginImage.png';
import Logo from '../../../../img/oneWalletLogo.png';

const LoginTemplate: React.FC = () => {
    return (
        <Flex
            height="100vh"
            alignItems="center"
            justifyContent="center"
            bg={'white'}
        >
            <Box
                top="0"
                left="0"
                width="40%"
                height="100%"
                zIndex="0"
                position="relative"
                overflow="hidden"
            >
                <Image
                    src={LoginImage.src}
                    alt="Background"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    objectPosition="center"
                />
            </Box>
            <Box
                width="60%"
                h="100%"
                pl="40px"
                pt="37px"
            >
                <Image
                    src={Logo.src}
                    alt="logo"
                    objectFit="contain"
                    width="243.95px"
                    height="37.72px"
                    ml="20px"
                    mb="90px"
                />
                <LoginForm />
            </Box>
        </Flex>
    );
};

export default LoginTemplate;
