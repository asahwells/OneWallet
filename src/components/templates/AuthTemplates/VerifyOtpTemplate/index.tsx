import React from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';
import Logo from '../../../../img/oneWalletLogo.png';
import VerifyOtpForm from 'components/organisms/forms/VerifyOtpForm';
import { IoChevronBack } from 'react-icons/io5';

const VerifyOtpTemplate: React.FC = () => {
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
                <VerifyOtpForm />
            </Box>
        </Flex>
    );
};

export default VerifyOtpTemplate;
