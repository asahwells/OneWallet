/* eslint-disable */

// chakra imports
import { Box, Flex, HStack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from '../../../../types/navigation';
import { usePathname } from 'next/navigation';
import { cloneElement, useCallback } from 'react';

interface SidebarLinksProps {
  routes: IRoute[];
  onClose?: ()=>void;
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes, onClose } = props;
  const isMobile = useBreakpointValue({ base: true, md: false });

  //   Chakra color mode
  const pathname = usePathname();

  let activeColor = useColorModeValue('#FFFFFF', '#FFFFFF');
  let activeBg = useColorModeValue('#6F8F95', '#6F8F95');
  let inactiveColor = useColorModeValue(
    '#FFFFFF',
    '#FFFFFF',
  );
  let activeIcon = useColorModeValue('#FFFFFF', 'white');
  let textColor = useColorModeValue('#FFFFFF', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (route: string) => {
      const fullRoutePath = route.toLowerCase();
      const currentPath = pathname?.toLowerCase();
      return currentPath === fullRoutePath;
    },
    [pathname],
  );

  
  

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, index: number) => {
      if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <Link key={index} href={route.layout + route.path}>
            {route.icon ? (
              <Box onClick={onClose}>
                <HStack
                  spacing={
                    activeRoute((route.layout + route.path).toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  w={'full'}
                  //ps="10px"
                >
                  <Flex w={{sm: "100%", lg: "80%"}} borderRightRadius={'5.27px'} borderLeftRadius={{sm: '5.27px', lg: '0'}} h={'51px'} alignItems="center" justifyContent="center"  bg={{
                    base: activeRoute((route.layout + route.path).toLowerCase()) ? activeBg : 'transparent',
                    lg: activeRoute((route.layout + route.path).toLowerCase()) ? '#0F454F' : 'transparent',
                  }} px={5}>
                    <Box
                      color={
                        isMobile ? 'white':
                        activeRoute((route.layout + route.path).toLowerCase()) ? 'white' : '#3F6A72'
                       }
                      me="18px"
                      mt={1}
                    >
                       {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      variant={'sideBar'}
                      color={{
                        base: activeRoute((route.layout + route.path).toLowerCase())
                        ? activeColor
                        : textColor,
                        md: activeRoute((route.layout + route.path).toLowerCase())
                        ? activeColor
                        : '#0F454F'
                      }}
                      // fontWeight={
                      //   activeRoute((route.layout + route.path).toLowerCase())
                      //     ? 'bold'
                      //     : 'normal'
                      // }
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  {/*<Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute((route.layout + route.path).toLowerCase())
                        ? brandColor
                        : 'transparent'
                    }
                    borderRadius="5px"
                  />*/}
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute((route.layout + route.path).toLowerCase()) ? '22px' : '26px'
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={{
                      base: activeRoute((route.layout + route.path).toLowerCase())
                      ? activeColor
                      : textColor,
                      md: activeRoute((route.layout + route.path).toLowerCase())
                      ? activeColor
                      : '#0F454F'
                    }}
                    fontWeight={
                      activeRoute((route.layout + route.path).toLowerCase()) ? 'bold' : 'normal'
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </Link>
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
