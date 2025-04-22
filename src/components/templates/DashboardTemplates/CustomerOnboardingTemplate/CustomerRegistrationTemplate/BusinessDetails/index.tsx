import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseFormControl from 'components/molecules/forms/BaseFormControl';
import BaseInput from 'components/molecules/inputs/BaseInput';
import BaseFormControlButton from 'components/molecules/buttons/FormControlButton';
import BaseButton from 'components/molecules/buttons/BaseButton';

import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { setBusiness } from '../../../../../../redux/slices/business';

import { useFetchIndustries } from 'api-services/business-registration-services';
import { ListProps } from 'components/molecules/buttons/interfaces';

interface IIndustry {
  id: string;
  name: string;
}

interface BusinessDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const BusinessDetails = ({ onBack, onNext }: BusinessDetailsProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const dispatch = useAppDispatch();
  const { businessDetails } = useAppSelector((state) => state.business);

  const { mutateAsync: fetchIndustries, isPending: isFetchingIndustry } = useFetchIndustries();

  const [categoryItems, setCategoryItems] = useState<ListProps[]>([]);
  const [subCategoryItems, setSubCategoryItems] = useState<ListProps[]>([]);
  console.log({businessDetails})
  const [storeName, setStoreName] = useState(businessDetails?.businessName || '');
  const [industryCategory, setIndustryCategory] = useState(businessDetails?.industryCategory || '');
  const [industryCategoryId, setIndustryCategoryId] = useState(businessDetails?.industryCategoryId || '');
  const [industrySubCategory, setIndustrySubCategory] = useState(businessDetails?.industrySubCategory || '');

  useEffect(() => {
    async function getIndustries() {
      try {
        const resp = await fetchIndustries();
        const data: IIndustry[] = resp?.data || [];

        const mappedForCategory = data.map((ind) => ({
          name: ind.name, 
          value: ind.name,  
          id: ind.id
        }));

        const mappedForSubCategory = data.map((ind) => ({
          name: ind.name,
          value: ind.name, 
          id: ind.id
        }));

        setCategoryItems(mappedForCategory);
        setSubCategoryItems(mappedForSubCategory);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    }

    getIndustries();
  }, [fetchIndustries]);

  const handleChange = (item: ListProps, field: string) => {
    if (field === 'category') {
      setIndustryCategory(item.value as string);
      setIndustryCategoryId(item.id as string);
      return;
    }
  
    if (field === 'subcategory') {
      setIndustrySubCategory(item.value);
    }
  };

  const onContinue = () => {
    dispatch(
      setBusiness({
        ...businessDetails,
        businessName: storeName,
        industryCategoryId,
        industryCategory,      
        industrySubCategory,   
      })
    );

    onNext();
  };

  console.log({businessDetails})
  const isButtonDisabled = useMemo(() => {
    return !storeName || !industryCategory || !industrySubCategory;
  }, [storeName, industryCategory, industrySubCategory]);

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} header="Business Setup" />

      <Box px={4} pt={isMobile ? '6px' : '36px'} pb={8}>
        <Box
          bg={isMobile ? '#F8FAFC' : 'white'}
          width={{ base: '100%', lg: '941px' }}
          mx="auto"
          h={isMobile ? 'auto' : '482px'}
          borderRadius="8px"
          pt={isMobile ? '15px' : '30px'}
          pb="30px"
          px={isMobile ? '0px' : 124}
          border={isMobile ? 'none' : '0.5px solid #E2E8F0'}
        >
          <Text
            letterSpacing={'-1.2%'}
            variant={'head'}
            textAlign={{
                base: 'left',
                md: 'center',
            }}
            mb={2}
          >
            Enter Business Details
          </Text>

          <Text
            variant={'sm'}
            mb={6}
            textAlign={{
                base: 'left',
                md: 'center',
            }}
          >
            Enter the name of the store and its industry classification
          </Text>

          <VStack gap="24px">
            {/* Store Name */}
            <BaseFormControl border="0px" label="Store Name">
              <BaseInput
                placeholder=""
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </BaseFormControl>

            <BaseFormControlButton
              label="Industry Category"
              items={categoryItems}
              defaultValue={businessDetails?.industryCategory}
              value={industryCategory}
              onChange={(selected) => handleChange(selected, 'category')}
            />

            <BaseFormControlButton
              label="Industry SubCategory"
                defaultValue={businessDetails?.industrySubCategory}
              value={industrySubCategory}
              items={subCategoryItems}     
              onChange={(selected) => handleChange(selected, 'subcategory')}
            />

            <BaseButton
              variant="ghost"
              text="Continue"
              color="#FCFCFC"
              onClick={onContinue}
              borderRadius="8px"
              border="1.2px solid #6F8F95"
              w="full"
              isDisabled={isButtonDisabled || isFetchingIndustry}
              mt="36px"
              _focus={{ outline: 'none' }}
              h="56px"
            />
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default BusinessDetails;
