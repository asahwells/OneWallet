import React, { useEffect, useState } from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';
import Logo from '../../../../img/oneWalletLogo.png';
import { IoChevronBack } from 'react-icons/io5';
import VerificationForm from 'components/organisms/forms/VerificationForm';
import { VerificationProps } from 'components/templates/interfaces';
import { useRouter } from 'next/navigation';

const VerificationTemplate: React.FC<VerificationProps> = ({
    screen = 'phone'
}) => {
    const [screenTitle, setScreenTitle] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(screen === 'phone') {
            return setScreenTitle('Phone Number Verification')
        }
        return setScreenTitle('OTP Verification')
    }, [])
    const responsiveText = {
            textAlign: 'center',
            '@media (max-width: 768px)': {
                textAlign: 'left',
            },
    }
    return (
        <Flex
            height="100vh"
            width="100vw"
            direction="column"
            alignItems="center"
            sx={{
                paddingY: '127px',
                paddingX: '197px',
                '@media (max-width: 768px)': {
                paddingY: '16px',
                paddingX: '16px'
            },
            }}
            bg={'#F8FAFC'}
        >
            <Flex
                width={'100%'}
                position={'relative'}
                sx={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    '@media (max-width: 768px)': {
                        flexDirection: 'column-reverse',
                        justifyContent: 'center',
                    },
                }}
                alignItems={'center'}
            >
                <Flex
                    alignItems={'center'}
                    gap={'8px'}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        '@media (max-width: 768px)': {
                            position: 'relative',
                            marginRight: 'auto'
                        },
                    }}
                    cursor={'pointer'}
                    onClick={() => router.back()} 
                    
                >
                    <IoChevronBack color='#222B38' size={'20px'} />
                    <Text fontSize={'16px'} fontWeight={'500'} color={'#344256'}>
                        Back
                    </Text>
                </Flex>
                <Box
                display={'flex'}
                sx={{
                    marginBottom: 0,
                    '@media (max-width: 768px)': {
                    marginBottom: '20px',
                    borderBottom: '0.1px solid #CBD5E1',
                    w: '100vw',
                    paddingTop: '57.14px',
                    paddingBottom: '26.42px',
                },
                }}
                >
                    <Image
                        src={Logo.src}
                        alt="logo"
                        objectFit="contain"
                        width="243.95px"
                        height="37.72px"
                        mx="auto"
                        alignSelf={'center'}
                    />
                </Box>
            </Flex>
            <Box
                width={{base: 'full', lg: '402px'}}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                mx={'auto'}
            >
                <VerificationForm
                    screen={screen}
                    title={<Text w='full' sx={
                        responsiveText
                    } variant={'otvVerifyTitle'}> {screenTitle}</Text>}
                    label={<Text w='full'
                        sx={responsiveText}
                      variant={'otvVerifySubTitle'}>Enter the code we sent to your phone number</Text>}
                 />
            </Box>
        </Flex>
    );
};

export default VerificationTemplate;
