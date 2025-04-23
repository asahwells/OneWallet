import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  List,
  ListItem,
  InputGroup,
  InputLeftElement,
  Icon,
  Divider,
  ModalContentProps,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface ListProps {
  value?: string;
  name?: string;
  id?: string | number;
}

interface SearchableListProps extends ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  items: ListProps[];
  onSelectItem?: (item: ListProps) => void; // Optional item selection callback
}

function SearchableListModal({ isOpen, onClose, items, onSelectItem, ...props }: SearchableListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent {...props}>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup w={'full'}>
            <InputLeftElement pointerEvents="none">
              <Icon w={'18px'} h={'18px'} as={SearchIcon} color="#344256" />
            </InputLeftElement>
            <Input
              w={'full'}
              placeholder="Search the list"
              color={'#344256'}
              fontSize={'16px'}
              lineHeight={'24px'}
              letterSpacing={'-1.2%'}
              fontWeight={500}
              aria-label="Search Items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <List w={'full'} spacing={0} mt={4}>
            {filteredItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem
                  key={item.id}
                  cursor="pointer"
                  onClick={() => {
                    if (onSelectItem) {
                      onSelectItem(item);
                    }
                    onClose();
                  }}
                  p={2}
                >
                  {item.value}
                </ListItem>
                {index < filteredItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SearchableListModal;