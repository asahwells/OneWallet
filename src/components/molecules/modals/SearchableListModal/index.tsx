// components/molecules/modals/SearchableListDrawer.tsx
import React, { useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  List,
  ListItem,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface ListProps {
  value?: string;
  name?: string;
  id?: string | number;
}

interface SearchableListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ListProps[];
  onSelectItem?: (item: ListProps) => void;
  pt?: number;              // preserve your pt prop if you need it
  minWidth?: string;        // preserve your minWidth prop if you need it
}

const SearchableListModal: React.FC<SearchableListDrawerProps> = ({
                                                                     isOpen,
                                                                     onClose,
                                                                     items,
                                                                     onSelectItem,
                                                                     pt = 8,
                                                                     minWidth,
                                                                   }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredItems = items.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // control drawer width: full on mobile, 40%/980px on desktop
  const drawerWidth = useBreakpointValue({
    base: '100%',
    md: '40%',
    lg: '980px',
  });

  return (
      <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom"
          // prevent full-screen on desktop by overriding width
      >
        <DrawerOverlay />
        <DrawerContent
            pt={pt}
            w={drawerWidth}
            mx="auto"
            borderTopRadius="8px"
            minW={minWidth}
            maxH={'80vh'}
        >
          <DrawerCloseButton />
          <DrawerBody>
            <InputGroup w="full">
              <InputLeftElement pointerEvents="none">
                <Icon as={SearchIcon} w="18px" h="18px" color="#344256" />
              </InputLeftElement>
              <Input
                  w="full"
                  placeholder="Search the list"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  color="#344256"
                  fontSize="16px"
                  lineHeight="24px"
                  letterSpacing="-1.2%"
                  fontWeight={500}
                  aria-label="Search Items"
              />
            </InputGroup>

            <List w="full" spacing={0} mt={4}>
              {filteredItems.map((item, idx) => (
                  <React.Fragment key={item.id ?? idx}>
                    <ListItem
                        cursor="pointer"
                        onClick={() => {
                          onSelectItem?.(item);
                          onClose();
                        }}
                        p={2}
                    >
                      {item.value}
                    </ListItem>
                    {idx < filteredItems.length - 1 && <Divider />}
                  </React.Fragment>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  );
};

export default SearchableListModal;
