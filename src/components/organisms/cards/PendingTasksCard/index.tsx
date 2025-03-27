import {HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {PendingTasksCardProps} from "../interfaces";
import EmptyTaskIcon from "../../../atoms/icons/EmptyTasksIcon";

const PendingTasksCard = ({pendingTasks}: PendingTasksCardProps) => {


    const getPendingTasksList= () => {
        if(!pendingTasks?.length){
            return (
                <Stack py={16} spacing={4} w={'full'} alignItems={'center'} justifyContent={'center'}>
                    <EmptyTaskIcon />

                    <Text fontSize={'16px'} fontWeight={'500'}>
                        You do no have any pending task at this time
                    </Text>
                </Stack>
            )
        }

        return (
            <>

                {pendingTasks.map((task, index) => {
                    const isLast = index === pendingTasks.length - 1
                    return (
                        <VStack alignItems={'start'} w={'full'} px={5} py={4} spacing={2} justifyContent={'space-between'} borderBottom={isLast? '' : '1px solid #DADDE2'} key={index}>
                            <Text fontWeight={'400'} fontSize={'16px'} letterSpacing={'-1.2%'} color={'#344256'}>{task.title}</Text>
                            <Text fontWeight={'400'} fontSize={'14px'} letterSpacing={'-1%'} color={'#344256'}>Due Date: {task.dueDate}</Text>
                        </VStack>
                    )
                })
                }</>
        )

    }
    return (
        <Stack bg={'white'} w={'full'} borderRadius={'8px'} border={'0.37px solid #E2E8F0'}>

            <HStack w={'full'} px={5} py={5} justifyContent={'space-between'} borderBottom={'1px solid #DADDE2'}>
                <Text fontWeight={'600'} fontSize={'14px'} letterSpacing={'-1%'} color={'#C5B27D'}>Pending Tasks</Text>
                <Text cursor={'pointer'} color={'#344256 '} fontWeight={'500'} letterSpacing={'-1%'} fontSize={'14px'}>View All</Text>

            </HStack>

          <Stack w={'full'}>

              {getPendingTasksList()}

          </Stack>

        </Stack>


    )
}
export default PendingTasksCard