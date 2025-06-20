// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/molecules/card/Card';
// Custom components
import SwitchField from '../../../../components/molecules/fields/SwitchField';
import Menu from '../../../../components/organisms/menu/MainMenu';

export default function Notifications(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card mb='20px' {...rest}>
			<Flex align='center' w='100%' justify='space-between' mb='30px'>
				<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mb='4px'>
					Notifications
				</Text>
				<Menu />
			</Flex>
			<SwitchField
				isChecked={true}
				reversed={true}
				fontSize='sm'
				mb='20px'
				id='1'
				label='Item update notifications'
			/>
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='2' label='Item comment notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='3' label='Buyer review notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='4' label='Rating reminders notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='5' label='Meetups near you notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='6' label='Company news notifications' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='7' label='New launches and projects' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='8' label='Monthly product changes' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='9' label='Subscribe to newsletter' />
			<SwitchField reversed={true} fontSize='sm' mb='20px' id='10' label='Email me when someone follows me' />
		</Card>
	);
}
