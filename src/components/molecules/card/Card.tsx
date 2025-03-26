// import { Box, useStyleConfig} from '@chakra-ui/react';

import { useStyleConfig, chakra, forwardRef } from '@chakra-ui/react';
import { CustomCardProps } from '../../../theme/theme';
const CustomCard = forwardRef<CustomCardProps, 'div'>((props, ref) => {
	const { size, variant, ...rest } = props;
	const styles = useStyleConfig('Card', { size, variant });

	return <chakra.div 
				ref={ref} 
				__css={styles} 
				css={{
					'&::-webkit-scrollbar': {
						display: 'none',
					width: '5px',
					borderRadius: '8px',
					backgroundColor: `rgba(0,0,0,0.05)`,
					},
					'&::-webkit-scrollbar-thumb': {
					backgroundColor: `rgba(0,0,0,0.1)`,
					borderRadius: '8px',
					},
					scrollbarWidth: 'thin',
					scrollbarColor: 'rgba(0,0,0,0.1) rgba(0,0,0,0.05)',
				}} 
				{...rest} 
			/>;
});

export default CustomCard;
