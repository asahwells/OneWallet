import React, { useState } from 'react';
import { Box, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import PasswordInput from "../../../molecules/inputs/PasswordInput";
import BaseFormControl from "../../../molecules/forms/BaseFormControl";
import { useResetPassword } from "../../../../api-services/auth-services";
import BaseButton from 'components/molecules/buttons/BaseButton';
import FailedModal from 'components/molecules/modals/FailedModal';
import SuccessModal from 'components/molecules/modals/SuccessModal';

const ResetPasswordForm = () => {
    const customToast = useToast();

    const { isOpen: isOpenOne, onClose: oneCloseOne, onToggle: onToggleOne } = useDisclosure();
    const { isOpen: isOpenTwo, onClose: oneCloseTwo, onToggle: onToggleTwo } = useDisclosure();

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Success and Error callback functions
    const handleSuccess = () => {
        onToggleTwo(); // Trigger success modal
    };

    const handleError = () => {
        onToggleOne(); // Trigger error modal
    };

    const { mutateAsync: resetPassword, isPending: isRessettingPassword } = useResetPassword(handleSuccess, handleError);

    const handleResetPassword = async () => {
        if (confirmNewPassword != password) {
            customToast({
                status: "warning",
                description: "Passwords must match.",
                title: "Error",
            });
            return;
        }

        if (!oldPassword || !password) {
            customToast({
                status: "warning",
                description: "Please enter old and new passwords",
                title: "Error",
            });
            return;
        }

        const data = {
            password,
            oldPassword
        };

        try {
            await resetPassword(data);
        } catch (e) {
            console.warn({ e });
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmNewPassword(e.target.value);
        setPasswordsMatch(password === e.target.value);
    };

    return (
        <Box
            px="24px"
            bg="white"
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            maxW={'665px'}
        >
            <Text variant={'norm'} lineHeight={'48px'} letterSpacing={'-1.2%'} marginBottom={'24px'} onClick={onToggleTwo}>Setup a New Password</Text>

            <VStack
                spacing={4}
                align="stretch"
                width={{ base: 'auto', lg: "665px" }}
                height="240px"
                borderRadius="8px"
                pt={'34px'}
                pb={'34px'}
                px="28px"
                bg="#F1F5F9"
            >

                <BaseFormControl label={'Enter Old Password'} >
                    <PasswordInput
                        value={oldPassword}
                        onChange={(e: any) => setOldPassword(e.target.value)}
                    />
                </BaseFormControl>

                <BaseFormControl label="Enter New Password">
                    <PasswordInput
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </BaseFormControl>

                <BaseFormControl label="Enter Confirm New Password">
                    <PasswordInput
                        value={confirmNewPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </BaseFormControl>

                {/* Display warning message if passwords don't match */}
                {!passwordsMatch && (
                    <Text color="red.500" fontSize="12px">
                        Passwords do not match, please try again
                    </Text>
                )}
            </VStack>

            <BaseButton
                text="Change Password"
                onClick={handleResetPassword}
                disabled={!oldPassword || !password || !confirmNewPassword}
                isLoading={isRessettingPassword}
                marginTop="28px"
                color="white"
                width={{ base: '100%', lg: "665px" }}
                height="56px"
                borderRadius="8px"
                padding="12px 24px"
                gap="8px"
                bg={!oldPassword || !password || !confirmNewPassword ? "#CFDADC" : "#0F454F"}
            />

            {/* Success Modal */}
            {isOpenTwo && <SuccessModal
                isOpen={isOpenTwo}
                onClose={oneCloseTwo}
                title="Congratulations!"
                title2="You have successfully changed your password"
                //width={{ xs: "95%", lg: "843px" }}
                height="240px"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}

            {/* Failed Modal */}
            {isOpenOne && <FailedModal
                isOpen={isOpenOne}
                onClose={oneCloseOne}
                title="Error Message:"
                title2="Password is not correct"
                //width={{ xs: "95%", lg: "843px" }}
                height="240px"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}
        </Box>
    );
};

export default ResetPasswordForm;
