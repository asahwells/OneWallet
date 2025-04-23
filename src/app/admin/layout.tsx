'use client';
// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
  Image,
  Flex,
  HStack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useBreakpointValue,
  Show,
} from '@chakra-ui/react';
import Footer from '../../components/organisms/footer/FooterAdmin';
// Layout components
import navImage from '/public/img/layout/Navbar.png';
import Sidebar from '../../components/organisms/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';
import BellIcon, { BellIconFill } from 'components/atoms/icons/BellIcon';
import ImageIcon from 'components/atoms/icons/ImageIcon';
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {StorageToken} from "../../constants/token";
import FullScreenLoader from "../../components/organisms/loaders/FullScreenLoader";
import { IoMenuOutline } from 'react-icons/io5';
import SidebarContent from 'components/organisms/sidebar/components/Content';
import { useFetchLoggedInUser } from 'api-services/dashboard-services';
import ImageIconDesktop from 'components/atoms/icons/ImageIconDesktop';
import { Armburger } from 'components/atoms/icons/Armburger';
import LogoIcon from 'components/atoms/icons/LogoIcon';
import HeaderLogoIcon from 'components/atoms/icons/HeaderLogo';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Custom Chakra theme
export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const { mutateAsync: fetchUser, isPending: isFetchingUser, isError } = useFetchLoggedInUser();
  const [isRehydratingUser, setIsRehydratingUser] = useState(true)
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components



  useEffect(() => {
    if(isFetchingUser) return

    if(isError) {
      Cookies.remove(StorageToken);
      router.replace("/auth/sign-in");
      return;
    }

  }, [isError]);

  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  });

  useEffect(() => {
    async function handleUserFetch() {
      try {
        await fetchUser(); 
      } catch (error) {
        Cookies.remove(StorageToken);
      } finally {
        setIsRehydratingUser(false);
      }
    }

    handleUserFetch();
  }, [router, fetchUser]);

  const bg = useColorModeValue('#FAFAFB', 'navy.900');
  if(isRehydratingUser) {
    return <FullScreenLoader />
  }

  return (
    <Box h="100vh" w="100vw" bg={bg} >
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />

        {/* <Show above='lg'> */}
          <Box w={'100vw'} display={'flex'} alignItems={'center'} pl={'20px'} pr={'20px'} height={{base: '60px', md:'70px'}}  backgroundColor={'#FFFFFF'} shadow={'sm'}  pos={'relative'} top={0} zIndex={10}>
            <Flex w='full' justifyContent={"space-between"} alignItems={"center"}>
              <IconButton
                icon={<Armburger />}
                display={{ base: 'inline-flex', xl: 'none' }}
                onClick={onOpen}
                aria-label="Open menu"
                size="lg"
                ref={btnRef}
              />
              <HeaderLogoIcon />
              <HStack gap={isMobile? '30px': '28px'} align={'center'}>
                <BellIconFill onClick={()=> router.push('/admin/notifications')} />
                {isMobile && <ImageIcon />}
                {!isMobile &&<ImageIconDesktop />}
              </HStack>
            </Flex>
          </Box>
        

        {isOpen && <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent bgColor={'#0F454F'}>
                <DrawerCloseButton color={'white'} />
                <DrawerBody>
                    <SidebarContent routes={routes} onClose={onClose}  />
                </DrawerBody>
            </DrawerContent>
        </Drawer>}

        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 250px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 250px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"

        >
          <Portal>
            <Box>

              {/*Todo: implement our own navbar*/}
              {/*<Navbar*/}
              {/*  onOpen={onOpen}*/}
              {/*  logoText={'One Wallet'}*/}
              {/*  brandText={getActiveRoute(routes)}*/}
              {/*  secondary={getActiveNavbar(routes)}*/}
              {/*  message={getActiveNavbarText(routes)}*/}
              {/*  fixed={fixed}*/}
              {/*  {...rest}*/}
              {/*/>*/}

            </Box>
          </Portal>

          <Box
            mx="auto"
            // px={{ base: '20px', md: '30px' }}
            // pe="20px"
            minH="100vh"
            //pt="50px"
            bg={'#FAFAFB'}
          >
            {children}
          </Box>
          <Box>
            {/*<Footer />*/}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}