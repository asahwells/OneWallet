// chakra imports
import { Box, Flex, Stack, VStack } from '@chakra-ui/react';
//   Custom components
import Links from './Links';
import { IRoute } from '../../../../types/navigation';
import LogoutCard from 'components/organisms/cards/LogoutCard';

// FUNCTIONS

interface SidebarContentProps {
	routes: IRoute[];
	onClose?: ()=>void;
}

function SidebarContent(props: SidebarContentProps) {
	const { routes, onClose } = props;
	// SIDEBAR
	return (
		<VStack h={'91%'} justify={'space-between'} align={'start'}>
			<Flex w={'full'} direction='column' height='100%' borderRadius='30px'>
				<Stack direction='column' mt='8px' mb='auto'>
					<Box w={'full'}>
						<Links routes={routes} onClose={onClose} />
					</Box>
				</Stack>
			</Flex>

			<LogoutCard />
		</VStack>
	);
}

export default SidebarContent;
