import { Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import LogoutIcon from 'components/atoms/icons/LogoutIcon';
import { StorageToken } from 'constants/token';
import { useRouter } from 'next/navigation';
import LogoutConfirmationModal from 'components/organisms/logout/LogoutConfirmModal';
import { useAppSelector } from '../../../../redux/store'; 

const LogoutCard = () => {
    const { userDetails } = useAppSelector(state => state.user)
    const router = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogout = () => {
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
        <Flex w={{sm: 'full', lg: '70%'}} align="center" bg="" px={5} borderRadius="lg" cursor={'pointer'} onClick={onOpen}>
            <Image
                boxSize="40px"
                src="/img/auth/logout.png" 
                alt="Easin Arafat"
                mr={2}
            />
            <Box flex="1">
                <Text fontSize={'12.65px'} fontWeight={500} color={'#FFFFFF'} variant={'logout'}>
                   {userDetails?.firstName ?? "N/A"} 
                </Text>
                <Text fontSize={'10.54px'} fontWeight={400} color={'#FFFFFF'} variant={'logoutBase'}>
                    Admin
                </Text>
            </Box>
            <Box>
                <LogoutIcon/>
            </Box>
            {isOpen && <LogoutConfirmationModal isOpen={isOpen} onClose={onClose} onLogout={handleLogout}/>}
        </Flex>
    );
};

export default LogoutCard;
