import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react';
import ForgotPasswordIcon from 'components/atoms/icons/forgotPasswordIcon';
import { IForgotPasswordModalProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';

const ForgotPasswordModal = ({
  isOpen,
  onClose,
  ...props
}: IForgotPasswordModalProps) => {
    const modalSize = useBreakpointValue({ base: 'xs', md: 'md' });
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
      <ModalOverlay />
        <ModalContent borderRadius="26.81px" boxShadow="xl" maxW={"700px"} w="full" borderTopRadius={'26.81px'} borderBottomRadius={'26.81px'} position="relative" pb={4} mx={4}>
       <ModalCloseButton
                          color="#475569"
                          _focus={{ boxShadow: 'none' }}
                          _hover={{ bg: '#F1F5F9' }}
                          display={{base: 'none', md: 'flex'}}
                      />
      <ModalBody p={{md: '20px'}}>
          <VStack alignItems={{base:'flex-start', md: 'center'}} position={'relative'} spacing={4}>
          <Flex 
              justify={{base: "space-between", md: "center"}}
              align="center"
              w="100%"
              position="relative"
            >
              <ForgotPasswordIcon />
              
              <ModalCloseButton 
                position="relative"
                top="unset" 
                right="unset"
                display={{base: 'inline-block', md: 'none'}}
              />
            </Flex>
            <Text fontSize="16px" fontWeight={500} lineHeight="24.63px" letterSpacing="-1.2%" color="#344256">
              Forgot Password?
            </Text>
            <Text fontSize="14px" fontWeight={400} lineHeight="22px" letterSpacing="-1%" color="#222B38">
              Please contact Admin
            </Text>

            <BaseButton
              variant={"ghost"}
              text={'Okay'}
              onClick={() => onClose()}
              backgroundColor="#FFFFFF"
              color="#0F454F"
              borderRadius={"8px"}
              border={'1.2px solid #0F454F'}
              h={"56px"}
              w={{base: 'full', md: '458px'}}
              />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
