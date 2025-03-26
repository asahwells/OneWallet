import React, { useEffect, useState } from 'react';
import {
  Box, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, List, ListItem, Avatar, Flex, Text, IconButton, Icon, Alert, AlertIcon
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon, InfoIcon, CheckCircleIcon } from '@chakra-ui/icons';
import BankInputControl from 'components/molecules/forms/BankInputControl';
import { useFetchBank, useFetchBanks } from 'api-services/debit-services';
import { IBank } from 'api-services/debit-services/interfaces';
import { IBankSelectorProps } from '../interfaces';

const BankSelector = ({ accountNumber, bankCode, bankName, onBankSelect }: IBankSelectorProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedBankCode, setSelectedBankCode] = useState('');
  const [selectedBankLogo, setSelectedBankLogo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  const { data: banks, mutateAsync: fetchBanks } = useFetchBanks();
  const { data: bankDetails, mutateAsync: fetchBankDetails, error: bankError } = useFetchBank();

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);


  useEffect(() => {
    if (accountNumber.length === 10 && selectedBankCode) {
      fetchBankDetails({ accountNumber, bankCode: selectedBankCode })
        .then((response) => {
          console.log("Bank details fetched successfully:", response);
          
          onBankSelect({
            bankName: selectedBank,
            bankCode: selectedBankCode,
            accountName: response?.data?.accountName || '', 
            bankLogo: selectedBankLogo, 
          });
        })
        .catch((e) => {
          console.error("Error fetching bank details:", e);
          setError(e.message);
        });
    }

    if (bankName){
      setSelectedBank(bankName)
    }
  }, [accountNumber, selectedBankCode]);

  useEffect(() => {
    if (accountNumber?.length === 10 && bankCode) {
      fetchBankDetails({ accountNumber, bankCode })
        .then((response) => {
          console.log("Bank details fetched successfully:", response);
          
          onBankSelect({
            bankName: bankName || selectedBank, // Use selectedBank if bankName is not provided
            bankCode,
            accountName: response?.data?.accountName || '', 
            bankLogo: selectedBankLogo, 
          });
        })
        .catch((e) => {
          console.error("Error fetching bank details:", e);
          setError(e.message);
        });
    }

    // Set selected bank if bankName is passed from props
    if (bankName) {
      setSelectedBank(bankName);
    }
  }, [accountNumber, bankCode]);
  

  const handleBankSelect = (bank: IBank) => {
    setSelectedBank(bank.name);
    setSelectedBankCode(bank.code);
    setSelectedBankLogo(bank.logo);
    setIsValid(true);
    onClose();

    // Pass the selected bank details to the parent component
    onBankSelect({
      bankName: bank.name,
      bankCode: bank.code,
      accountName: bankDetails?.data?.accountName || '',
      bankLogo: bank.logo,
    });
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <>
      <Box>
        <Flex alignItems="center" border="none" borderRadius="md" h="56px" onClick={onOpen} cursor="pointer" boxShadow="sm">
          <BankInputControl label={selectedBank ? "Bank Name" : ""} color="#344256" value={selectedBank}>
            <Text flex="1" color="#344256" fontSize="md">
              {selectedBank || "Bank Name"}
            </Text>
            <Icon as={ChevronDownIcon} w="20.5px" h="20.5px" mr={1.5} color="#344256" />
          </BankInputControl>
        </Flex>

        {selectedBank && accountNumber?.length === 10 && (
          <Box mt={2} h="47px">
            {bankDetails?.data?.accountName ? (
              <Alert bg="#FFFFFF" h="47px" border="1px solid #22C55E" color="#22C55E" status="success" borderRadius="md">
                <AlertIcon as={CheckCircleIcon} />
                {bankDetails?.data?.accountName}
              </Alert>
            ) : (
              <Alert bg="#FFFFFF" h="47px" border="1px solid #EF4444" color="#EF4444" status="error" borderRadius="md">
                <AlertIcon as={InfoIcon} />
                {error || "Account Information is not correct"}
              </Alert>
            )}
          </Box>
        )}
      </Box>

      {/* Modal for selecting banks */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered trapFocus={true} autoFocus={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select a Bank</ModalHeader>
            <ModalCloseButton mr={-2} color="red.500" />
            <ModalBody position="relative">
              <Input placeholder="Enter Bank Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                     borderColor="gray.300" focusBorderColor="gray.300" pr="2.5rem" />
              {searchQuery && (
                <IconButton size="sm" aria-label="Clear Search" icon={<CloseIcon w="10.5px" h="10.5px" />}
                            onClick={clearSearch} position="absolute" right="-0.5rem" top="-50%"
                            transform="translateY(-50%)" variant="ghost" color="gray.500" />
              )}
              <Box height="300px" overflowY="auto">
                <List spacing={3}>
                  {Array.isArray(banks?.data) && banks.data.filter(bank => bank.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((bank, index) => (
                      <ListItem key={index} p={3} border="1px" borderColor="gray.200" borderRadius="md" cursor="pointer"
                                _hover={{ bg: 'gray.100' }} onClick={() => handleBankSelect(bank)}>
                        <Flex alignItems="center">
                          <Avatar src={bank.logo} size="sm" mr={3} />
                          <Text fontSize="md" color="black">{bank.name}</Text>
                        </Flex>
                      </ListItem>
                    ))}
                </List>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default BankSelector;
