import React, { useEffect, useState } from 'react';
import {Box, Text, VStack, Link, useDisclosure, useToast} from '@chakra-ui/react';
import { MdOutlineLocationOn } from "react-icons/md";
import { LuBellDot } from "react-icons/lu";
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

    const {isOpen: isLocationModalOpen, onClose: onLocationModalClose, onOpen: onLocationModalOpen} = useDisclosure()
    const {
        isOpen: isNotificationModalOpen,
        onClose: onNotificationModalClose,
        onOpen: onNotificationModalOpen
    } = useDisclosure()

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
            return onLocationModalOpen();
        }

        if (!notificationPermission) {
            return onNotificationModalOpen();
        }
        
      }, []);

      const handlePermissionClick = (permissionType: 'locationPermission' | 'notificationPermission', value: 'granted' | 'denied') => {
        sessionStorage.setItem(permissionType, value);

        if (permissionType === 'locationPermission') {
            onLocationModalClose();
            onNotificationModalOpen();
            return
        }

          onNotificationModalClose();
    };

    return (
        <>

            {
                isLocationModalOpen && <GenericPopUpModal
                    cancelText='No'
                    onNoClick={() => handlePermissionClick('locationPermission', 'denied')}
                    onYesClick={() => handlePermissionClick('locationPermission', 'granted')}
                    acceptText='Yes'
                    isOpen={isLocationModalOpen}
                    icon={<MdOutlineLocationOn size={28} color='#0F454F'/>}
                    width={["90%", "40%", "48%"]}
                    minWidth={["90%", "40%", "48%"]}
                    titleText={
                        <Text fontSize="md" fontWeight="medium" textAlign="center">
                            Allow <Text fontWeight={'700'} fontSize={'18px'} as={'span'}>OneWallet</Text> to access this
                            device’s precise location?
                        </Text>
                    }

                />
            }


            {isNotificationModalOpen &&


                <GenericPopUpModal
                    cancelText='No'
                    onNoClick={() => handlePermissionClick('notificationPermission', 'denied')}
                    onYesClick={() => handlePermissionClick('notificationPermission', 'granted')}
                    titleText={<Text fontSize="md" fontWeight="medium" textAlign="center">
                        <Text fontWeight={'700'} fontSize={'18px'} as={'span'}>OneWallet</Text> Would Like to Send You
                        Notifications?
                    </Text>}
                    acceptText='Yes'
                    isOpen={isNotificationModalOpen}
                    icon={<LuBellDot size={28} color='#0F454F'/>}
                    width={["90%", "40%", "48%"]}
                    minWidth={["90%", "40%", "48%"]}
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
                    maxWidth={{base: '100%', md: '678.9px'}}
                    alignSelf={'center'}
                    marginX={{base: '26px', md: 0}}
                    maxHeight={{base: 'auto', md: '383.17px'}}
                    borderRadius="26.81px"
                    paddingX={{base: '20px', md: '61px' }}
                    paddingY={{base: '32.18px', md: '33px' }}
                />}
            </Box>
        </>

    );
};

export default LoginForm;
