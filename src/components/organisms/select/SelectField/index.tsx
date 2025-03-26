import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import SelectInput from 'components/molecules/inputs/SelectInput';
import DateInput from 'components/molecules/inputs/DateInput';
import { IFilterFieldProps } from '../interfaces';
import SelectNumber from 'components/molecules/inputs/SelectNumber';

const SelectField = ({
                         type,
                         bg,
                         disabled,
                         placeholder,
                         options = [],
                         errorMessage,
                         value,
                         onChange
                     }: IFilterFieldProps & { value?: any; onChange?: any }) => {
    return (
        <Box mb="16px" w="full">
            {type === 'select' ? (
                <SelectInput placeholder={placeholder} options={options} value={value} onChange={onChange} />
            ) : type === 'date' ? (
                <DateInput placeholder={placeholder} value={value} onChange={onChange}/>
            ) : type === 'number' ? (
                <SelectNumber placeholder={placeholder} />
            ) : null}

            {errorMessage && (
                <Text variant={'error'} mt={2} ml={1}>
                    {errorMessage}
                </Text>
            )}
        </Box>
    );
};

export default SelectField;
