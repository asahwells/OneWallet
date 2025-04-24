// components/molecules/inputs/SelectField.tsx

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import SelectInput from 'components/molecules/inputs/SelectInput';
import SelectNumber from 'components/molecules/inputs/SelectNumber';

// 1) Calendar + its default styles
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { IFilterFieldProps } from '../interfaces';

type Props = IFilterFieldProps & {
    value?: any;
    onChange?: any
};

const SelectField: React.FC<Props> = ({
                                          type,
                                          bg,
                                          disabled,
                                          placeholder,
                                          options = [],
                                          errorMessage,
                                          value,
                                          onChange,
                                      }) => {
    return (
        <Box mb="16px" w="full" bg={bg}>
            {type === 'select' ? (
                <SelectInput placeholder={placeholder} options={options} value={value} onChange={onChange} />
            ) : type === 'date' ? (
                    <Calendar
                        // the Calendar component expects a JS Date
                        date={value ?? new Date()}
                        onChange={(date: Date) => onChange?.(date)}
                        // @ts-ignore
                        style={{ width: '100%' }}
                    />
            ) : type === 'number' ? (
                <SelectNumber placeholder={placeholder} />
            ) : null}

            {errorMessage && (
                <Text variant="error" mt={2} ml={1}>
                    {errorMessage}
                </Text>
            )}
        </Box>
    );
};

export default SelectField;
