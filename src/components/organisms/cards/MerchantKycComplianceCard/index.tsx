import {HStack, Stack, Text} from "@chakra-ui/react";
import UserAnalyticsCard from "../../../molecules/card/UserAnalyticsCard";
import { useRouter } from "next/navigation";
import {IKycComplianceCard} from "../interfaces";

const MerchantKycComplianceCard = ({suspendedUsers, pendingApproval} : IKycComplianceCard) => {
    const router = useRouter();

    const handlePending = () => {
        router.push('/admin/pending');
    };

    const handleSuspended = () => {
        router.push('/admin/suspended-merchants');
    };
    return (
        <Stack bg={'white'} spacing={2} p={3} border={'0.88px solid #E4E4E7'} borderRadius={'8px'}
               w={'full'}
               maxW={'418px'}
               maxH={'114px'}
               h={'auto'}
        >

            <Text variant={'chartLabel'}>
                KYC Compliance
            </Text>


            <HStack w={'full'} justifyContent={'space-between'}>

                <UserAnalyticsCard onClick={handlePending} title={'PENDING APPROVAL'} value={pendingApproval || '0'} color={'#EF4444'} />
                <UserAnalyticsCard onClick={handleSuspended} title={'SUSPENDED MERCHANT'} value={suspendedUsers || '0'} color={'#C5B27D'} />

            </HStack>




        </Stack>


    )
}

export default MerchantKycComplianceCard