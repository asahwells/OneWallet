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
            paddingY={{base: '16px', md: '127px'}}
            paddingX={{base: '16px', md: '197px'}}
            bg={'#F8FAFC'}
        >
            <Flex
                width={'100%'}
                position={'relative'}
                justifyContent={'center'}
                sx={{
                    flexDirection: 'row',
                    '@media (max-width: 768px)': {
                        flexDirection: 'column-reverse',
                    },
                }}
                alignItems={'center'}
            >
                <Flex
                    alignItems={'center'}
                    gap={'8px'}
                    position={{base: 'relative', md: 'absolute'}}
                    left={0}
                    marginRight={'auto'}
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
                borderBottom={{base: '0.1px solid #CBD5E1', md: 'none' }}
                w={'100vw'}
                pb={{base: '26.42px', md: 0}}
                pt={{base: '57.14px', md: 0 }}
                mb={{base: '20px', md: 0}}
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
                    } variant={'otvVerifyTitle'}> Phone Number Verification</Text>}
                    label={<Text w='full'
                        sx={responsiveText}
                      variant={'otvVerifySubTitle'}>Enter the code we sent to your phone number</Text>}
                 />
            </Box>
        </Flex>
    );
};

export default VerificationTemplate;
