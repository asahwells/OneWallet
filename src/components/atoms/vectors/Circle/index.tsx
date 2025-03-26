import {Box} from "@chakra-ui/react";
import {ICircle} from "../interfaces";

const Circle = ({w = '7px', h = '7px', ...props}: ICircle) => {

    return (
        <Box bg={'#C5B27D'} w={w} h={h} borderRadius={'full'}
             {...props}
        >

        </Box>
    )
}

export default Circle;