import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { textStyles } from './components/text';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';
import {textStyles as Text} from './components/text';
import {radioTheme as Radio} from './components/radio';

export default extendTheme(
	{ breakpoints,
		components: {
			Text,
			Radio
		},

	}, // Breakpoints

	globalStyles,
	badgeStyles, // badge styles
	buttonStyles, // button styles
	linkStyles, // link styles
	progressStyles, // progress styles
	sliderStyles, // slider styles
	inputStyles, // input styles
	textareaStyles, // textarea styles
	switchStyles, // switch styles
	CardComponent, // card component
	textStyles,
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
