import React, { useState } from 'react';
import {Box, Text, VStack, Link, useDisclosure, useToast} from '@chakra-ui/react';
import Button from '../../../molecules/buttons/BaseButton';
import ForgotPasswordModal from '../../../molecules/modals/ForgotPasswordModal';
import BaseInput from "../../../molecules/inputs/BaseInput";
import PasswordInput from "../../../molecules/inputs/PasswordInput";
import BaseFormControl from "../../../molecules/forms/BaseFormControl";
import {useFetchLoggedInUser, useLogin} from "../../../../api-services/auth-services";
import {useRouter} from "next/navigation";

const LoginForm = () => {

    const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
    const { mutateAsync: fetchUser, isPending: isFetchingUser } = useFetchLoggedInUser();
    const router = useRouter()
    const customToast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

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

    return (
        <Box
            padding="24px"
            bg="white"
        >
            <Text fontSize={'40px'} color={'#344256'} lineHeight={'48px'} fontWeight={500} letterSpacing={'-2.8%'} marginBottom={'8px'}>Welcome Back</Text>
            <Text fontSize={'20px'} color={'#344256'} lineHeight={'32px'} fontWeight={400} letterSpacing={'-1.4%'} marginBottom={'16px'}>Login to continue</Text>

            <VStack
                spacing={4}
                align="stretch"
                width={{base: 'auto', lg: "665px"}}
                height="240px"
                borderRadius="8px"
                pt={'34px'}
                px="28px"
                bg="#E8EDEE"
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
                marginTop="28px"
                color="white"
                width={{base: '100%', lg: "665px"}}
                height="56px"
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
    );
};

export default LoginForm;
