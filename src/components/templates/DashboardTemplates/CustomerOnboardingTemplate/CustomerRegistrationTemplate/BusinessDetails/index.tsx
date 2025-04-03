import { Box, Flex, Heading, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import BaseInput from 'components/molecules/inputs/BaseInput';
import React, { useMemo, useState } from 'react';
import BaseFormControlButton from 'components/molecules/buttons/FormControlButton';
import BaseButton from 'components/molecules/buttons/BaseButton';

interface ListProps {
  value?: string;
  name?: string;
  id?: string | number;
}

interface BusinessDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const BusinessDetails = ({ onBack, onNext }: BusinessDetailsProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [storeName, setStoreName] = useState('');
  const [industryCategory, setIndustryCategory] = useState<ListProps | null>(null);
  const [industrySubCategory, setIndustrySubCategory] = useState<ListProps | null>(null);

  const handleChange = (item: ListProps, field: string) => {
    if (field === 'category') {
      setIndustryCategory(item);
    } else if (field === 'subcategory') {
      setIndustrySubCategory(item);
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !storeName || !industryCategory || !industrySubCategory;
  }, [storeName, industryCategory, industrySubCategory]);

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} />
      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={isMobile ? '100%' : '940px'}
          mx="auto"
          h={isMobile ? 'auto' : '482px'}
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
            Enter Business Address
          </Heading>

          <Text
            fontSize="14px"
            color="#344256"
            fontWeight={400}
            mb={6}
            textAlign={isMobile ? 'left' : 'center'}
          >
            Enter the address of the business/store
          </Text>

          <VStack gap={'24px'}>
            <BaseFormControl border={'0px'} label={'Market Name'}>
              <BaseInput
                placeholder=""
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </BaseFormControl>

            <BaseFormControlButton
              label="Industry Category"
              items={[
                { name: 'Nigeria', value: 'nigeria', id: 'NG' },
                { name: 'Ghana', value: 'ghana', id: 'GH' },
                { name: 'Libya', value: 'libya', id: 'LIB' },
              ]}
              onChange={(item) => handleChange(item, 'category')}
            />

            <BaseFormControlButton
              label="Industry SubCategory"
              items={[
                { name: 'Electronics', value: 'electronics', id: 'ELEC' },
                { name: 'Clothing', value: 'clothing', id: 'CLOTH' },
                { name: 'Groceries', value: 'groceries', id: 'GROC' },
              ]}
              onChange={(item) => handleChange(item, 'subcategory')}
            />
            <BaseButton
            variant={'ghost'}
            text={'Continue'}
            onClick={onNext}
            borderRadius={'8px'}
            border={'1.2px solid #6F8F95'}
            w={'full'}
            disabled={isButtonDisabled}
            mt={'36px'}
            _focus={{ outline: 'none' }}
            h={'56px'}

          />
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default BusinessDetails;