import { Box, Flex, Heading, Text, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
import NoticeBox from "components/molecules/box/NoticeBox";
import BaseButton from "components/molecules/buttons/BaseButton";
import HeaderBackButton from "components/molecules/buttons/HeaderBackButton";
import { RegisterSteps } from "components/molecules/buttons/interfaces";
import BaseFormControl from "components/molecules/forms/BaseFormControl";
import BaseInput from "components/molecules/inputs/BaseInput";
import UnsaveChangesModal from "components/molecules/modals/UnsavedChangesModal";
import { useEffect } from "react";

interface UserBvnDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const UserBvnDetails = ({
    onBack,
    onNext
}: UserBvnDetailsProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        const handleBackButton = (event: PopStateEvent) => {
            event.preventDefault();
            onOpen(); // Show exit confirmation modal
            window.history.pushState(null, "", window.location.href); // Prevent immediate navigation
        };

        window.history.pushState(null, "", window.location.href); // Push state to track navigation
        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [onOpen]);
    
    return (
        <Flex direction="column" bg="#F8FAFC" w="full">
            <HeaderBackButton onBack={onOpen} />
            <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
                <Box 
                    bg={isMobile ? '#F8FAFC' : 'white'}
                    width={isMobile ? '100%' : '941px'}
                    mx="auto"
                    h={isMobile? 'auto' : '749px'}
                    borderRadius="8px"
                    pt={isMobile ? '15px' : '30px'}
                    pb="30px"
                    px={isMobile ? '0px' : '57px'}
                    border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
                >
                    <Heading
                        as="h1"
                        fontSize="18px"
                        fontWeight={700}
                        color="#222B38"
                        textAlign={isMobile ? 'left' : 'center'}
                        mb={2}
                    >
                        User’s BVN details
                    </Heading>

                    <Text
                        fontSize="14px"
                        color="#344256"
                        fontWeight={400}
                        mb={6}
                        textAlign={isMobile ? 'left' : 'center'}
                    >
                        Confirm user&apos;s BVN Information.
                    </Text>

                    <Flex 
                        gap={'24px'}
                        w={isMobile ? '100%' : '580px'} direction={'column'} mx={'auto'}>
                        <NoticeBox
                        pl={'18px'}
                        pr={'11px'}
                        py={'8px'}
                        bg={'#C5B27D'}
                        borderRadius={'4px'}
                        w={'full'}
                        title="Kindly ask the user to confirm the information below before proceeding. If the information is incorrect, ask the user to visit the bank to update the information before proceeding."
                        />

                        <BaseFormControl labelPt={'2px'} border={'1px solid #CBD5E1'} bg={'#E2E8F0'} label={'First Name'}>
                            <BaseInput  color={'#344256'} border={'none'} bg={'#CBD5E1'} placeholder="" value={'Emmanuek'} />
                        </BaseFormControl>
                        <BaseFormControl labelPt={'2px'} border={'1px solid #CBD5E1'} bg={'#E2E8F0'} label={'Last Name'}>
                            <BaseInput color={'#344256'} border={'none'} bg={'#CBD5E1'} placeholder="" value={'Emmanuek'} />
                        </BaseFormControl>
                        <BaseFormControl labelPt={'2px'} border={'1px solid #CBD5E1'} bg={'#E2E8F0'} label={'Date of Birth'}>
                            <BaseInput color={'#344256'} border={'none'} bg={'#CBD5E1'} placeholder="" value={'01051994'} />
                        </BaseFormControl>
                        <BaseFormControl labelPt={'2px'} border={'1px solid #CBD5E1'} bg={'#E2E8F0'} label={'Gender'}>
                            <BaseInput color={'#344256'} border={'none'} bg={'#CBD5E1'} placeholder="" value={'Male'} />
                        </BaseFormControl>

                        <VStack w={'full'} gap={'34px'} mt={'8.5px'}>
                        <BaseButton 
                        onClick={onNext}
                        text="Yes, This is Correct"
                        backgroundColor="#0F454F"
                        color="#FFF"
                        borderRadius={"8px"}
                        border={'1.2px solid #0F454F'}
                        h={"56px"}
                        w="full"
                        />

                        <BaseButton
                        backgroundColor="#FFFFFF"
                        color="#0F454F"
                        borderRadius={"8px"}
                        _hover={{ outline: 'none' }}
                        border={'1.2px solid #0F454F'}
                        h={"56px"}
                        w="full"
                        text="No, This is not Correct"
                        />
                        </VStack>
                    </Flex>
                </Box>
            </Box>

            {isOpen && 
            <UnsaveChangesModal 
            cancelText="No Continue"
            onNoClick={onClose}
            onYesClick={onBack}
            acceptText="Yes Exit Page"
            px={{base: '1.5px', md: '24px'}}
            isOpen={isOpen}
            minHeight={'auto'}
            minWidth={{base:"100%", md: "40%", lg: "940px"}}
            titleText={
                <VStack 
                w={'full'}
                alignItems={{base: 'flex-star', md: 'center'}}>
                <Text fontSize="16px" fontWeight={500} lineHeight="24.63px" letterSpacing="-1.2%" color="#344256">
                Unsaved Changes
                </Text>
                <Text fontSize="14px" fontWeight={400} lineHeight="22px" letterSpacing="-1%" color="#222B38">
                Are you sure you want to exit this page?
                </Text>
                </VStack>
            }
            />
            }
        </Flex>
    )
}

export default UserBvnDetails;