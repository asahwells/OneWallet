// Chakra imports
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '../../../../components/molecules/card/Card';

export default function Information(props: { title: string; value: number | string; [x: string]: any }) {
	const { title, value, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const bg = useColorModeValue('white', 'navy.700');
	return (
		<Card bg={bg} {...rest}>
			<Box>
				<Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
					{title}
				</Text>
				<Text color={textColorPrimary} fontWeight='500' fontSize='md'>
					{value}
				</Text>
			</Box>
		</Card>
	);
}
