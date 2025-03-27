import {HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {PendingTasksCardProps} from "../interfaces";

const PendingTasksCard = ({pendingTasks}: PendingTasksCardProps) => {

    return (
        <Stack bg={'white'} w={'full'} borderRadius={'8px'} border={'0.37px solid #E2E8F0'}>

            <HStack w={'full'} px={5} py={5} justifyContent={'space-between'} borderBottom={'1px solid #DADDE2'}>
                <Text fontWeight={'600'} fontSize={'14px'} letterSpacing={'-1%'} color={'#C5B27D'}>Pending Tasks</Text>
                <Text cursor={'pointer'} color={'#344256 '} fontWeight={'500'} letterSpacing={'-1%'} fontSize={'14px'}>View All</Text>

            </HStack>

          <Stack w={'full'}>
              {pendingTasks.map((task, index) => {
                  const isLast = index === pendingTasks.length - 1
                  return (
                      <VStack alignItems={'start'} w={'full'} px={5} py={4} spacing={2} justifyContent={'space-between'} borderBottom={isLast? '' : '1px solid #DADDE2'} key={index}>
                          <Text fontWeight={'400'} fontSize={'16px'} letterSpacing={'-1.2%'} color={'#344256'}>{task.title}</Text>
                          <Text fontWeight={'400'} fontSize={'14px'} letterSpacing={'-1%'} color={'#344256'}>Due Date: {task.dueDate}</Text>
                      </VStack>
                  )
              })
              }
          </Stack>

        </Stack>


    )
}
export default PendingTasksCard