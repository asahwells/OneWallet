import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  ModalCloseButton,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { INotificationModalProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';
import InfoIcon from 'components/atoms/icons/InfoIcon';
import QuestionIcon from 'components/atoms/icons/QuestionIcon';

const UnsaveChangesModal = ({
  isOpen,
  onClose = () => {},
  icon,
  cancelText,
  acceptText,
  onYesClick,
  onNoClick,
  textStyles,
  titleText,
  ...props
}: INotificationModalProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backgroundColor="rgba(0,0,0, 0.6)"  />
      <ModalContent
        borderRadius="26.81px"
        boxShadow="xl"
        maxW={'700px'}
        w="full"
        borderTopRadius={'26.81px'}
        borderBottomRadius={'26.81px'}
        position="relative"
        pb={4}
        mx={4}
      >
      <ModalCloseButton
                          color="#475569"
                          _focus={{ boxShadow: 'none' }}
                          _hover={{ bg: '#F1F5F9' }}
                          display={{base: 'none', md: 'flex'}}
                      /> 
       <ModalBody p={{md: '20px'}} >
       <Flex 
              justify={{base: "space-between", md: "center"}}
              align="center"
              w="100%"
              position="relative"
            >
              <QuestionIcon />
              
              <ModalCloseButton 
                position="relative"
                top="unset" 
                right="unset"
                display={{base: 'inline-block', md: 'none'}}
              />
            </Flex>

          <VStack  spacing={6} align="center" pt="2px" pb={6}>
            {/* {icon && React.isValidElement(icon) ? icon : <InfoIcon />} */}

            {titleText}

            <VStack spacing={4} width="full">
                <BaseButton
                    variant={'outline'}
                  text={cancelText}
                  onClick={onNoClick}
                  borderRadius={'8px'}
                  color="#FFF"
                  width={{base: "full", md: "458px"}}
                  backgroundColor="#0F454F"
                  _focus={{ outline: 'none' }}
                  h={'56px'}
  
                />
                
              <BaseButton
                  variant={'ghost'}
                bg={'#FFFFFF'}border={'1.2px solid #0F454F'}
                text={acceptText}
                onClick={onYesClick}
                borderRadius={'8px'}
                width={{base: "full", md: "458px"}}
                h={'56px'}
              />
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UnsaveChangesModal;