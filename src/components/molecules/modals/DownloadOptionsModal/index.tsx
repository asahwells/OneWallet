import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Radio,
  RadioGroup,
  Box,
  Circle,
  Divider,
  Flex,
} from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import QuestionIcon from 'components/atoms/icons/QuestionIcon';

interface DownloadOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (option: string) => void;
}

const DownloadOptionsModal: React.FC<DownloadOptionsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleConfirm = () => {
    onConfirm(selectedOption);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay bg="rgba(0, 0, 0, 0.4)" />
      <ModalContent borderRadius="26px" maxW="940px" mx={4}>
        <ModalCloseButton
            color="#475569"
            _focus={{ boxShadow: 'none' }}
            _hover={{ bg: '#F1F5F9' }}
            display={{base: 'none', md: 'flex'}}
        />
        <ModalBody pb={8}>
        <Flex 
                justify={{base: "space-between", md: "center"}}
                align="center"
                w="100%"
                position="relative"
                >
                <VStack justify={"center"} align={{base: "start", lg: "center"}}>
                    <QuestionIcon color="#C2B28E" />
                    <Text variant={'md'} mt={3}>
                        Choose your download option
                    </Text>
                </VStack>
                
                <ModalCloseButton 
                    position="relative"
                    top="unset" 
                    right="unset"
                    mt={-7}
                    display={{base: 'inline-block', md: 'none'}}
                />
                </Flex>
          <RadioGroup onChange={setSelectedOption} value={selectedOption}>
            <VStack align="stretch" spacing={0}>
              <HStack 
                py={5} 
                //px={4} 
                spacing={4} 
                align="center"
                justify={{base: "flex-start", lg:"center"}}
              >
                <HStack w={{lg: '58%'}}>
                    <Radio 
                    value="table-sticker" 
                    size="lg" 
                    colorScheme="gray"
                    borderColor="gray.300"
                    />
                    <Text fontSize={{base:'13px', lg:'16px'}} fontWeight={400} color={'#344256'} lineHeight={'22px'} pt={1}>
                    Download as Table Sticker - For small surfaces like counters & desks (1500 × 2100 px)
                    </Text>
                </HStack>
              </HStack>
              
              <Divider />
              
              <HStack 
                py={5} 
                //px={4} 
                spacing={4} 
                align="center"
                justify={{base: "flex-start", lg:"center"}}
              >
                <HStack w={{lg: '58%'}}>
                    <Radio 
                    value="table-stand" 
                    size="lg" 
                    colorScheme="gray"
                    borderColor="gray.300"
                    />
                    <Text fontSize={{base:'13px', lg:'16px'}} fontWeight={400} color={'#344256'} lineHeight={'22px'} pt={1}>
                    Download as Table Stand - For checkout counters & tables (2400 × 3600 px)
                    </Text>
                </HStack>
              </HStack>
              
              <Divider />
              
              <HStack 
                py={5} 
                //px={4} 
                spacing={4} 
                align="center"
                justify={{base: "flex-start", lg:"center"}}
              >
                <HStack w={{lg: '58%'}}>
                    <Radio 
                    value="hanging-signage" 
                    size="lg" 
                    colorScheme="gray"
                    borderColor="gray.300"
                    />
                    <Text fontSize={{base:'13px', lg:'16px'}} fontWeight={400} color={'#344256'} lineHeight={'22px'} pt={1}>
                    Download as Hanging Signage - For shops & market stalls (3600 × 5400 px)
                    </Text>
                </HStack>
              </HStack>
            </VStack>
          </RadioGroup>
          
          <VStack spacing={3} mt={8}>
            <BaseButton
                text='Yes, Confirm'
                w={{base: 'full', lg: '80%'}}
                h="48px"
                bg="#0F454F"
                color="white"
                borderRadius="8px"
                fontSize="16px"
                fontWeight="600"
                _hover={{ bg: "#0D3A42" }}
                isDisabled={!selectedOption}
                onClick={handleConfirm}
            >
              Yes, Confirm
            </BaseButton>
            
            <BaseButton
              text='No, Go Back'
              w={{base: 'full', lg: '80%'}}
              h="48px"
              bg="white"
              color="#0F454F"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="600"
              border="1px solid #0F454F"
              _hover={{ bg: "#F8FAFC" }}
              onClick={onClose}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadOptionsModal;