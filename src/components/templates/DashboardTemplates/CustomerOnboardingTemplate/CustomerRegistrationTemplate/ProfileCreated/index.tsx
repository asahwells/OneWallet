import { Box, Flex, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import ProfileCreatedIcon from "components/atoms/icons/ProfilceCreatedIcon";
import BaseButton from "components/molecules/buttons/BaseButton";
import HeaderBackButton from "components/molecules/buttons/HeaderBackButton"

interface ProfileCreatedProps {
    onBack: () => void;
    onNext: () => void;
  }

export const ProfileCreated = ({
    onBack,
    onNext
}: ProfileCreatedProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <Flex direction="column" bg="#F8FAFC" w="full">
            <HeaderBackButton onBack={onBack} />
            <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
                <Box 
                    bg={isMobile ? '#F8FAFC' : 'white'}
                    width={isMobile ? '100%' : '941px'}
                    mx="auto"
                    h={isMobile? 'auto' : '476px'}
                    borderRadius="8px"
                    pt={isMobile ? '15px' : '30px'}
                    pb="30px"
                    px={isMobile ? '0px' : 124}
                    border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
                >
                    <VStack>
                        <ProfileCreatedIcon />

                        <Text fontSize="18px" fontWeight={700} lineHeight="24px" letterSpacing="-1.2%" color="#344256">
                        Unsaved Changes
                        </Text>
                        <Text textAlign={'center'} fontSize="14px" fontWeight={400} lineHeight="22px" w={{base: 'full', md: '387px'}} letterSpacing="-1%" color="#344256">
                        Congratulations, you have successfully created an account for this user
                        </Text>

                        <BaseButton
                            variant={'outline'}
                            bgColor={'#0F454F'}
                            color={'#FCFCFC'}
                        text={'Setup Business'}
                        onClick={onNext}
                        borderRadius={'8px'}
                        w={'full'}
                        mt={24}
                        _focus={{ outline: 'none' }}
                        h={'56px'}
        
                        />
                
                    </VStack>
                </Box>
            </Box>
        </Flex>
    )
}