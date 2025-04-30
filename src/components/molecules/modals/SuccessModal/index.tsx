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
} from '@chakra-ui/react';
import ForgotPasswordIcon from 'components/atoms/icons/forgotPasswordIcon';
import { IUpdateUserModalProps } from '../interfaces';
import UpdateUserIcon from 'components/atoms/icons/UpdateUserIcon';
import BaseButton from 'components/molecules/buttons/BaseButton';
import Modaltext from 'components/atoms/texts/ModalText';
import FailedIcon from 'components/atoms/icons/FailedIcon';
import OutlineButton from 'components/molecules/buttons/OutlineButton';
import SuccessIcon from 'components/atoms/icons/SuccessIcon';
import { useRouter } from 'next/navigation';

const SuccessModal = ({
  isOpen,
  onClose,
  height,
  title,
  title2,
  btnText,
  ...props
}: IUpdateUserModalProps) => {
  
  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    size="lg"
    trapFocus={true}
    autoFocus={false}
    >
  <ModalOverlay />
<ModalContent borderRadius="26.81px" boxShadow="xl" maxW={"700px"} w="full" borderTopRadius={'26.81px'} borderBottomRadius={'26.81px'} position="relative" pb={4} mx={4}>
  <ModalCloseButton
              color="#475569"
              _focus={{ boxShadow: 'none' }}
              _hover={{ bg: '#F1F5F9' }}
              display={{base: 'none', md: 'flex'}}
          />
    <ModalBody p={{md: '20px'}}>
      <VStack spacing={3} alignItems={{ base: 'start', md: 'center' }}
            justifyContent={{ base: 'start', md: 'center' }}>
        <Flex 
          justify={{base: "space-between", md: "center"}}
          align="center"
          w="100%"
          position="relative"
          >
          <SuccessIcon />
          
          <ModalCloseButton 
              position="relative"
              top="unset" 
              right="unset"
              display={{base: 'inline-block', md: 'none'}}
          />
          </Flex>
              <Modaltext title={title} variant={'md'} lineHeight="24px" textAlign={'center'}/>
              {title2 && <Modaltext title={title2} variant={'sml'} lineHeight="24px" textAlign={{ base: 'start', md: 'center' }} />} 
            <BaseButton 
                text={btnText ?? "Continue"}
                marginTop="28px"
                color="#FCFCFC"
                w={{base: 'full', md: '458px'}}
                height="56px"
                borderRadius="8px"
                padding="12px, 24px, 12px, 24px"
                gap="8px"
                border={"1px solid #0F454F"}
                bg={"#0F454F"}
                onClick={onClose}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
