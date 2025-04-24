'use client';


import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Radio,
    RadioGroup,
    Show,
    SimpleGrid,
    Spinner,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, Tag, TagCloseButton, TagLabel,
    Text,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import BaseInput from "../../../../molecules/inputs/BaseInput";
import SearchInput from "../../../../molecules/inputs/SearchInput";
import FilterButton from "../../../../molecules/buttons/FilterButton";
import SelectFilterBox from "../../../../organisms/filter/SelectFilterBox";
import BaseButton from "../../../../molecules/buttons/BaseButton";
import CustomerRegistrationTable from "../../../../organisms/table/CustomerRegistrationTable";
import {MockCustomerRegistration} from "../../../../organisms/table/mockData";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { useFetchAllCustomers } from 'api-services/business-services';
const CustomerRegistrationDashboardTemplate = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const router = useRouter()
    const isMobile = useBreakpointValue({ base: true, md: false });
    // Store applied filters; keys: tierLevel, registrationStatus, state, registrationBusiness, board, fromDate, toDate
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const {
        mutateAsync: fetchCustomers,
        data: customers,
        isPending: isFetchingCustomers,
    } = useFetchAllCustomers();

  useEffect(() => {
    fetchCustomers({ page: currentPage, pageSize, ...filters });
  }, [currentPage, filters]);

    // Update filters based on what the filter box returns.
    const handleFilterChange = (newFilters: { [key: string]: string }) => {
        // Remove keys with empty values
        const applied = Object.fromEntries(
            Object.entries(newFilters).filter(([key, value]) => value && value.trim() !== '')
        );
        setFilters(applied);
    };

    // Remove a single filter key from the state
    const removeFilter = (key: string) => {
        const updated = { ...filters };
        delete updated[key];
        setFilters(updated);
    };

    const navigateToRegisterCustomer = () => {
        router.push('/admin/dashboard/business/customer-onboarding/registration')
    }

    return (
        <Stack bg="white" spacing={5} p={{
            base: 0,
            md: 4
        }}>
            {/* Top Row: Search + Filter + Register Button */}
            <HStack w="full" justifyContent="space-between" alignItems="center">
                <HStack w="full" spacing={4}>
                    <SearchInput placeholder="Search by Customer Name" onChange={console.log} />
                    <Box position="relative">
                        <FilterButton onClick={onToggle} />
                        {/* Desktop Filter Popover */}
                        {!isMobile && isOpen && (
                            <Box position="absolute" top="0" right="5px" zIndex="10">
                                <SelectFilterBox
                                    type="tier3"
                                    onFilterChange={handleFilterChange}
                                    onClose={onClose}
                                />
                            </Box>
                        )}
                    </Box>
                </HStack>
                {
                    !isMobile &&  <BaseButton
                        px={12}
                        py={2}
                        variant="brand"
                        text="Register a Customer"
                        onClick={navigateToRegisterCustomer}
                    />
                }
            </HStack>

            {
                !isMobile &&  <Text fontWeight="600" fontSize="14px" color="#C5B27D">
                    Customer Registration
                </Text>
            }

            <HStack w={'full'}>
                <Box bg="#CBD5E1" px={{
                    base: 2,
                    md: 8
                }} py={3} borderRadius="4px" w={{
                    base: 'full',
                    md: "fit-content"
                }}>
                    {(isFetchingCustomers ?          
                        <Box w={'full'}  display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Spinner size={'md'}/> 
                        </Box>
                        :
                        <Text fontWeight="500" fontSize="18px">
                        Total Number: {customers?.pagination.total ?? 0}
                      </Text>
                      )}
                </Box>

                {isMobile && <BaseButton
                    px={12}
                    py={2}
                    variant="brand"
                    text="Register a Customer"
                    onClick={navigateToRegisterCustomer}
                />}

            </HStack>


            {/* Mobile: Display applied filters as chips */}
            {isMobile && Object.keys(filters).length > 0 && (
                <HStack spacing={2} overflowX="auto">
                    {filters.tierLevel && (
                        <Tag size={'lg'}>
                            <TagLabel>{`Tier: ${filters.tierLevel}`}</TagLabel>
                            <TagCloseButton onClick={() => removeFilter('tierLevel')} />
                        </Tag>
                    )}
                    {filters.registrationStatus && (
                        <Tag  size={'lg'} >
                            <TagLabel>{`Status: ${filters.registrationStatus}`}</TagLabel>
                            <TagCloseButton onClick={() => removeFilter('registrationStatus')} />
                        </Tag>
                    )}
                    {filters.state && (
                        <Tag  size={'lg'}>
                            <TagLabel>{`State: ${filters.state}`}</TagLabel>
                            <TagCloseButton onClick={() => removeFilter('state')} />
                        </Tag>
                    )}
                    {filters.registrationBusiness && (
                        <Tag  size={'lg'}>
                            <TagLabel>{`Business: ${filters.registrationBusiness}`}</TagLabel>
                            <TagCloseButton onClick={() => removeFilter('registrationBusiness')} />
                        </Tag>
                    )}
                    {filters.board && (
                        <Tag  size={'lg'}>
                            <TagLabel>{`Board: ${filters.board}`}</TagLabel>
                            <TagCloseButton onClick={() => removeFilter('board')} />
                        </Tag>
                    )}
                    {filters.fromDate && filters.toDate && (
                        <Tag >
                            <TagLabel>{`${filters.fromDate} - ${filters.toDate}`}</TagLabel>
                            <TagCloseButton
                                onClick={() => {
                                    removeFilter('fromDate');
                                    removeFilter('toDate');
                                }}
                            />
                        </Tag>
                    )}
                </HStack>
            )}

            {/* Customer Registration Table / List */}
            <CustomerRegistrationTable
                data={customers?.data ?? []}
                isLoading={isFetchingCustomers}
                currentPage={customers?.pagination.currentPage}
                totalPages={customers?.pagination.lastPage}
                onPageChange={setCurrentPage}
            />
          

            {/* Mobile Filter Drawer */}
            {isMobile && isOpen &&  (
                <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton mt={2} />
                        <DrawerHeader>Filter</DrawerHeader>
                        <DrawerBody>
                            <SelectFilterBox
                                type="tier3"
                                onFilterChange={handleFilterChange}
                                onClose={onClose}
                            />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            )}
        </Stack>
    );
};

export default CustomerRegistrationDashboardTemplate;
