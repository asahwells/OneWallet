import {Avatar, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {IUserInfoCard} from "../interfaces";
import {UserPaths} from "../mock";
import OutlineButton from "../../../molecules/buttons/OutlineButton";
import { useRouter } from "next/navigation";

const UserInfoCard = ({name, status, setActivePath, activePath =UserPaths[1].path, id}: IUserInfoCard) => {
    const router = useRouter();

    const handlePathClicked = (path: string) => {
        setActivePath(path)
    }

    return (
        <VStack border={'1px solid #E2E8F0'} maxH={'582px'} maxW={'304px'} alignItems={'center'}
                justifyContent={'center'}>

            {/* user name and avatar*/}
            <VStack w={'full'} alignItems={'center'} justifyContent={'center'} spacing={4} p={4}>

                <Avatar size={'xl'} name={'John Doe'} src={'https://bit.ly/broken-link'}/>


                <VStack border={'1px solid #E2E8F0'} w={'full'} p={4}>

                    <HStack w={'full'} justifyContent={'space-between'}>
                        <Text variant={'label'}>
                            Name

                        </Text>

                        <Text variant={'label'}>
                            Status
                        </Text>

                    </HStack>

                    <HStack w={'full'} justifyContent={'space-between'}>
                        <Text variant={'base'}>
                            {name}

                        </Text>

                        <Text color={'#EF4444'} variant={'label'}>
                            {status}
                        </Text>

                    </HStack>

                </VStack>


            </VStack>


            {/*   rest of user info */}

            <VStack w={'full'} spacing={0}>
                {

                    UserPaths.map((userPath, index) => {
                        const isActive = userPath.path == activePath

                        return (
                            <Stack onClick={() => handlePathClicked(userPath.path)} cursor={'pointer'} bg={isActive ? '#0F454F' : '#FFFFFF'} key={index} justifyContent={'center'} h={'56px'} borderTop={'1px solid #E2E8F0'}
                                   w={'full'} p={6}>
                                <Text variant={'tabLabel'} color={isActive ? '#FFFFFF' : undefined} >
                                    {userPath.name}

                                </Text>
                            </Stack>
                        )
                    })
                }

            </VStack>


            <Stack p={6} w={'full'}>

                <OutlineButton onClick={() => router.push(`/admin/suspension-history/${id}`)} text={'Account Suspension'} variant={'outline'}/>
            </Stack>


        </VStack>
    )
}

export default UserInfoCard;