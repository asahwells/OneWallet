import { Box } from '@chakra-ui/react';
import React from 'react';
import { IFilterBoxProps } from '../interfaces';
import FilterBox from '../FilterBox';
import FilterMerchantBox from '../FilterBoxMerchant';
import FilterSuspendBox from '../FilterSuspendBox';

const SelectFilterBox = ({ type, onClose, onFilterChange, options = [] }: IFilterBoxProps) => {
    return (
        <Box mb="16px" w="full">
            {type === 'tier3' ? (
                <FilterBox onClose={onClose} onFilterChange={onFilterChange}/>
            ) : type === 'merchant' ? (
                <FilterMerchantBox onClose={onClose} onFilterChange={onFilterChange}/>
            ) : type === 'suspend' ? (
                <FilterSuspendBox onClose={onClose} onFilterChange={onFilterChange}/>
            ) : null}
        </Box>
    );
};

export default SelectFilterBox;
