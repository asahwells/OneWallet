import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { MdOutlineLocationOn } from 'react-icons/md';
import { LuBellDot } from 'react-icons/lu';
import Button from '../../../molecules/buttons/BaseButton';
import ForgotPasswordModal from '../../../molecules/modals/ForgotPasswordModal';
import BaseInput from '../../../molecules/inputs/BaseInput';
import PasswordInput from '../../../molecules/inputs/PasswordInput';
import BaseFormControl from '../../../molecules/forms/BaseFormControl';
import { useLogin } from '../../../../api-services/auth-services';
import { useRouter } from 'next/navigation';
import GenericPopUpModal from 'components/molecules/modals/GenericPopUpModal';
import { useFetchLoggedInUser } from 'api-services/dashboard-services';
import ErrorModal from 'components/molecules/modals/ErrorModal';

const LoginForm = () => {
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const { mutateAsync: fetchUser, isPending: isFetchingUser } =
    useFetchLoggedInUser();
  const router = useRouter();
  const customToast = useToast();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    isOpen: isLocationModalOpen,
    onClose: onLocationModalClose,
    onOpen: onLocationModalOpen,
  } = useDisclosure();
  const {
    isOpen: isNotificationModalOpen,
    onClose: onNotificationModalClose,
    onOpen: onNotificationModalOpen,
  } = useDisclosure();
  const {
    isOpen: isLoginModalOpen,
    onClose: onLoginModalClose,
    onOpen: onLoginModalOpen,
  } = useDisclosure();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleLogin = async () => {
    if (!phone || !password) {
      customToast({
        status: 'warning',
        description: 'Please enter email and password',
        title: 'Error',
      });
      return;
    }

    const data = { phone, password };

    try {
      const resp = await login(data);
      await fetchUser();

      if (!resp?.data?.lastLoginDate) {
        router.replace('/auth/verify-phone');
        return;
      }

      router.replace('/admin/dashboard');
    } catch (e: any) {
      onLoginModalOpen();
      setErrorMessage(e.message);
      console.warn({ e });
    }
  };

  useEffect(() => {
    const locationPermission = sessionStorage.getItem('locationPermission');
    const notificationPermission = sessionStorage.getItem(
      'notificationPermission',
    );

    if (!locationPermission) return onLocationModalOpen();
    if (!notificationPermission) return onNotificationModalOpen();
  }, []);

  const handlePermissionClick = (
    permissionType: 'locationPermission' | 'notificationPermission',
    value: 'granted' | 'denied',
  ) => {
    sessionStorage.setItem(permissionType, value);

    if (permissionType === 'locationPermission') {
      onLocationModalClose();

      // Ensure Notification modal is triggered after location permission is granted
      if (value === 'granted') {
        setTimeout(() => {
          onNotificationModalOpen();
        }, 300); // Add a slight delay to trigger the notification modal after closing the location modal
      }
      return;
    }

    onNotificationModalClose();
  };

  // Request location permission using the Geolocation API
  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      customToast({
        status: 'error',
        description: 'Geolocation is not supported by this browser.',
        title: 'Error',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => handlePermissionClick('locationPermission', 'granted'),
      () => handlePermissionClick('locationPermission', 'denied'),
    );
  };

  // Request notification permission using the Notification API
  const requestNotificationPermission = () => {
    if (!('Notification' in window)) {
      customToast({
        status: 'error',
        description: 'Notifications are not supported by this browser.',
        title: 'Error',
      });
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted')
        return handlePermissionClick('notificationPermission', 'granted');
      handlePermissionClick('notificationPermission', 'denied');
    });
  };

  return (
    <>
      {/* Show login error modal */}
      {isLoginModalOpen && (
        <ErrorModal
          maxWidth={{ base: '100%', md: '674px' }}
          alignSelf={'center'}
          marginX={{ base: '26px', md: 0 }}
          minHeight={{ base: 'auto', md: '277.44px' }}
          borderRadius="26.81px"
          paddingX={{ base: '2px', md: '41px' }}
          pt={{ base: '20px', md: '18.76px' }}
          pb={'33.89px'}
          onClose={onLoginModalClose}
          errorMessage={errorMessage}
          isOpen={isLoginModalOpen}
        />
      )}
      {/* Location Permission Modal */}
      {isLocationModalOpen && (
        <GenericPopUpModal
          cancelText="No"
          onNoClick={() =>
            handlePermissionClick('locationPermission', 'denied')
          }
          onYesClick={() => requestLocationPermission()} // Trigger location permission request
          acceptText="Yes"
          isOpen={isLocationModalOpen}
          icon={<MdOutlineLocationOn size={28} color="#0F454F" />}
          width={{
            base: '90%',
            md: '50%',
          }}
          titleText={
            <Text
              lineHeight={'130%'}
              fontSize="md"
              fontWeight="medium"
              textAlign="center"
            >
              Allow{' '}
              <Text variant={'headerBold'} as="span">
                OneWallet
              </Text>{' '}
              to access this device’s precise location?
            </Text>
          }
        />
      )}

      {/* Notification Permission Modal */}
      {isNotificationModalOpen && (
        <GenericPopUpModal
          cancelText="No"
          onNoClick={() =>
            handlePermissionClick('notificationPermission', 'denied')
          }
          onYesClick={() => requestNotificationPermission()} // Trigger notification permission request
          titleText={
            <Text lineHeight={'130%'} variant={'headerBold'} textAlign="center">
              <Text variant={'headerBold'} as="span">
                OneWallet
              </Text>{' '}
              Would Like to Send You Notifications?
            </Text>
          }
          acceptText="Yes"
          isOpen={isNotificationModalOpen}
          icon={<LuBellDot size={28} color="#0F454F" />}
          width={{
            base: '90%',
            md: '50%',
          }}
        />
      )}

      {/* Forgot Password Modal */}
      {isOpen && (
        <ForgotPasswordModal
          isOpen={isOpen}
          onClose={onClose}
          maxWidth={{ base: '100%', md: '678.9px' }}
          alignSelf={'center'}
          marginX={{ base: '26px', md: 0 }}
          maxHeight={{ base: 'auto', md: '383.17px' }}
          borderRadius="26.81px"
          paddingX={{ base: '20px', md: '61px' }}
          paddingY={{ base: '32.18px', md: '33px' }}
        />
      )}

      {/* Login Form */}
      <Box
        h={{ base: 'auto', md: '323px' }}
        padding={{ base: '21px', md: '28px' }}
        bg="#F1F5F9"
        width={{ base: '100%', md: '665px' }}
        alignSelf="center"
        display="flex"
        flexDirection="column"
        borderRadius="8px"
        justifyContent="center"
        alignItems="center"
      >
        <VStack w="full" align="stretch" borderRadius="8px" bg="transparent">
          <BaseFormControl
            mb={{ base: '20px', md: '24px' }}
            label={'Phone Number'}
          >
            <BaseInput
              placeholder=""
              type="tel"
              inputMode="numeric"
              pattern="\d*"
              maxLength={11}
              value={phone}
              onChange={(e: any) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                setPhone(digitsOnly);
              }}
            />
          </BaseFormControl>

          <BaseFormControl label="Enter Password">
            <PasswordInput
              placeholder=""
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </BaseFormControl>

          <Box
            mt={'14px'}
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
          disabled={!phone || !password}
          isLoading={isLoggingIn || isFetchingUser}
          color={!password || !phone ? '#6F8F95' : 'white'}
          w="full"
          height="56px"
          mt={'36px'}
          border={'1.2px solid'}
          borderColor={!phone || !password ? '#6F8F95' : '#0F454F'}
          borderRadius="8px"
          padding="12px 24px"
          bg={!phone || !password ? '#CFDADC' : '#0F454F'}
        />
      </Box>
    </>
  );
};

export default LoginForm;
