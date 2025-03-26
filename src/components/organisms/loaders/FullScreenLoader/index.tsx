
import {Spinner, Stack} from "@chakra-ui/react";


const FullScreenLoader = () => {

    return (
        <Stack w={'100vw'} h={'100vh'} alignItems={'center'} justifyContent={'center'}>

            <Spinner size={'lg'} color={'#0F454F'} />

        </Stack>

    )
}
export default FullScreenLoader;