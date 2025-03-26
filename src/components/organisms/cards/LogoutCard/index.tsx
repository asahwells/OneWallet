import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import LogoutIcon from 'components/atoms/icons/LogoutIcon';
import { StorageToken } from 'constants/token';
import { useRouter } from 'next/navigation';

const LogoutCard = () => {
    const router = useRouter();
    const toast = useToast();

    const logout = () => {
        Cookies.remove(StorageToken);  

        toast({
            title: "Logged out",
            description: "You have been logged out successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });

        router.push('/auth/sign-in');
    };

    return (
        <Flex w={{sm: 'full', lg: '70%'}} align="center" bg="" px={5} borderRadius="lg" cursor={'pointer'} onClick={logout}>
            <Image
                boxSize="40px"
                src="/img/auth/logout.png" 
                alt="Easin Arafat"
                mr={2}
            />
            <Box flex="1">
                <Text variant={'logout'}>
                    Emmanuel
                </Text>
                <Text variant={'logoutBase'}>
                    Admin
                </Text>
            </Box>
            <LogoutIcon/>
        </Flex>
    );
};

export default LogoutCard;
