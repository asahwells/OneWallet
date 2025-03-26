import React, { useEffect, useState } from 'react';
import {Box, Text, VStack, Link, useDisclosure, useToast} from '@chakra-ui/react';
import { MdOutlineLocationOn } from "react-icons/md";
import Button from '../../../molecules/buttons/BaseButton';
import ForgotPasswordModal from '../../../molecules/modals/ForgotPasswordModal';
import BaseInput from "../../../molecules/inputs/BaseInput";
import PasswordInput from "../../../molecules/inputs/PasswordInput";
import BaseFormControl from "../../../molecules/forms/BaseFormControl";
import {useFetchLoggedInUser, useLogin} from "../../../../api-services/auth-services";
import {useRouter} from "next/navigation";
import GenericPopUpModal from 'components/molecules/modals/GenericPopUpModal';

const LoginForm = () => {

    const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
    const { mutateAsync: fetchUser, isPending: isFetchingUser } = useFetchLoggedInUser();
    const router = useRouter()
    const customToast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);

    const {isOpen, onClose, onToggle} =  useDisclosure();

    const handleLogin = async () => {
        if(!email || !password) {
            customToast({
                status: "warning",
                description: "Please enter email and password",
                title: "Error",
            });
            return
        };

        const data = {
            email,
            password
        }

        try {
            await login(data);
            await fetchUser();
            router.replace('/admin/dashboard')

        } catch (e) {
            console.warn({e})
        }

    };

    useEffect(() => {
        // Check if the user has already made a location permission decision
        const locationPermission = sessionStorage.getItem('locationPermission');
        const notificationPermission = sessionStorage.getItem('notificationPermission');

        if (!locationPermission) {
        setShowLocationModal(true);
        } else if (!notificationPermission) {
        setShowNotificationModal(true);
        }
        
      }, []);

    const handleYesClick = () => {
        sessionStorage.setItem('locationPermission', 'granted');
        setShowLocationModal(false);
      };
    
      const handleNoClick = () => {
        sessionStorage.setItem('locationPermission', 'denied');
        setShowLocationModal(false);
    };

    const handleNotificationYesClick = () => {
        sessionStorage.setItem('notificationPermission', 'granted');
        setShowNotificationModal(false);
    };
    
      const handleNotificationNoClick = () => {
        sessionStorage.setItem('notificationPermission', 'denied');
        setShowNotificationModal(false);
     };

    return (
        <React.Fragment>
            {showLocationModal && <GenericPopUpModal
            cancelText='No'
            hasAllow={true}
            onClose={() => {}}
            onNoClick={handleNoClick}
            onYesClick={handleYesClick}
            title='OneWallet to access this device’s precise location?'
            acceptTextC='#171C23'
            titleC='#344256'
            cancelTextC='#171C23'
            acceptText='Yes'
            isOpen={showLocationModal}
            icon={<MdOutlineLocationOn size={28} color='#0F454F'/>}
            modalWidth={["90%", "40%", "48%"]}
             />}
            {showNotificationModal && <GenericPopUpModal
            cancelText='No'
            hasAllow={false}
            onClose={() => {}}
            onNoClick={handleNotificationNoClick}
            onYesClick={handleNotificationYesClick}
            title='OneWallet Would Like to Send You Notifications?'
            acceptTextC='#171C23'
            titleC='#344256'
            cancelTextC='#171C23'
            acceptText='Yes'
            isOpen={showNotificationModal}
            icon={<MdOutlineLocationOn size={28} color='#0F454F'/>}
            modalWidth={["90%", "40%", "48%"]}
             />}
            <Box
                padding={{base: '24px', lg: '40px'}}
                bg="#F1F5F9"
                width={{base: '100%', lg: '80%'}}
                alignSelf={'center'}
                display={'flex'}
                flexDirection={'column'}
                borderRadius={'8px'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <VStack
                    spacing={4}
                    align="stretch"
                    width={{base: '100%', lg: "100%"}}
                    height="240px"
                    gap={4}
                    borderRadius="8px"
                    mb={'-10.5px'}
                    bg="transparent"
                >
                    <BaseFormControl label={'Enter Email'} >
                        <BaseInput
                            placeholder=""
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </BaseFormControl>
                    <BaseFormControl label="Enter Password">
                        <PasswordInput
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </BaseFormControl>
                    <Box
                        color="#344256"
                        fontSize={'14px'}
                        fontWeight={500}
                        lineHeight={'22px'}
                        letterSpacing={'-1%'}
                        alignSelf="flex-end"
                        onClick={onToggle}
                        cursor="pointer"
                    >
                        Forgot Password?
                    </Box>
                </VStack>
                <Button
                    text="Login"
                    onClick={handleLogin}
                    disabled={!email || !password}
                    isLoading={isLoggingIn || isFetchingUser}
                    color={!password || !email ? '#6F8F95' : "white"}
                    width={{base: '100%', lg: "100%"}}
                    height="56px"
                    border={'1px'}
                    borderColor={!email || !password ? '#6F8F95' : '#0F454F'}
                    borderRadius="8px"
                    padding="12px 24px"
                    gap="8px"
                    bg={!email || !password ? "#CFDADC" : "#0F454F"}
                />
                {/* Forgot Password Modal */}
                {isOpen &&   <ForgotPasswordModal
                    isOpen={isOpen}
                    onClose={onClose}
                    width="843px"
                    height="368px"
                    borderRadius="8px"
                    padding="24px"
                />}
            </Box>
        </React.Fragment>
    );
};

export default LoginForm;
