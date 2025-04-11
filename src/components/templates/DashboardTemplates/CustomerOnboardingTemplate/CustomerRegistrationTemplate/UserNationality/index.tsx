import React, { useState } from 'react';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControlButton from 'components/molecules/buttons/FormControlButton'; // Import your BaseFormControlButton
import business, { setBusiness } from '../../../../../../redux/slices/business';
import {useAppDispatch, useAppSelector} from "../../../../../../redux/store";

interface ListProps {
  value?: string;
  name?: string;
  id?: string | number;
}

interface UserNationalityProps {
  onBack: () => void;
  onNext: () => void;
}

const UserNationality = ({ onBack, onNext }: UserNationalityProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useAppDispatch()
  const { businessDetails } = useAppSelector(state => state.business)
  const { customerDetails } = useAppSelector(state => state.customer)

  const handleNationalityChange = (item: ListProps) => {
    dispatch(setBusiness({ 
      ...businessDetails,
      nationality: item.value,
      userId: customerDetails?.id,
    }));
  }

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} header='Business Setup'/>
      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={{base : '100%', lg : '941px'}}
          mx="auto"
          h={isMobile ? 'auto' : '317px'}
          borderRadius="8px"
          pt={isMobile ? '15px' : '30px'}
          pb="30px"
          px={isMobile ? '0px' : 124}
          border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
        >
          <Heading
            as="h1"
            fontSize="18px"
            fontWeight={700}
            color="#222B38"
            textAlign={isMobile ? 'left' : 'center'}
            mb={2}
          >
            What is User&apos;s Nationality?
          </Heading>

          <Text
            fontSize="14px"
            color="#344256"
            fontWeight={400}
            mb={6}
            textAlign={isMobile ? 'left' : 'center'}
          >
            Select User&apos;s Country
          </Text>

          <BaseFormControlButton
            label="Nationality"
            defaultValue={businessDetails?.nationality}
            items={[
              { name: 'Nigeria', value: 'nigeria', id: 'NG' },
              { name: 'Ghana', value: 'ghana', id: 'GH' },
              { name: 'Libya', value: 'libya', id: 'LIB' },
            ]}
            onChange={handleNationalityChange}
          />

          <BaseButton
            variant={'ghost'}
            text={'Continue'}
            onClick={onNext}
            color={'#FCFCFC'}
            border={'1.2px solid #6F8F95'}
            borderRadius={'8px'}
            w={'full'}
            mt={'36px'}
            _focus={{ outline: 'none' }}
            h={'56px'}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default UserNationality;