import React from 'react';
import { Button, HStack, Text, Box } from '@chakra-ui/react';
import { IPaginationProps } from '../interfaces';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { border } from '@chakra-ui/system';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }: IPaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            w="40px"
            h="40px"
            variant="outline"
            fontSize="12px"
            fontWeight={600}
            color={i === currentPage ? 'white' : '#344256'}
            bg={i === currentPage ? '#C5B27D' : 'white'}
            _hover={{
              bg: i === currentPage ? '#C5B27D' : '#F0F0F0',
              color: i === currentPage ? 'white' : '#344256',
            }}
            borderColor={i === currentPage ? '#C5B27D' : 'gray.300'}
            borderRadius="4px"
            _focus={{ boxShadow: 'none' }} 
          >
            {i}
          </Button>
        );
      }
    } else {
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          w="40px"
          h="40px"
          variant="outline"
          fontSize="12px"
          fontWeight={600}
          color={1 === currentPage ? 'white' : '#344256'}
          bg={1 === currentPage ? '#C5B27D' : 'white'}
          _hover={{
            bg: 1 === currentPage ? '#C5B27D' : '#F0F0F0',
            color: 1 === currentPage ? 'white' : '#344256',
          }}
          borderColor={1 === currentPage ? '#C5B27D' : 'gray.300'}
          borderRadius="4px" 
          _focus={{ boxShadow: 'none' }} 
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        pageNumbers.push(<Text key="dots1" fontSize="16px" color="#344256">...</Text>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            w="40px"
            h="40px"
            variant="outline"
            fontSize="12px"
            fontWeight={600}
            color={i === currentPage ? 'white' : '#344256'}
            bg={i === currentPage ? '#C5B27D' : 'white'}
            _hover={{
              bg: i === currentPage ? '#C5B27D' : '#F0F0F0',
              color: i === currentPage ? 'white' : '#344256',
            }}
            borderColor={i === currentPage ? '#C5B27D' : 'gray.300'}
            borderRadius="4px" 
            _focus={{ boxShadow: 'none' }} 
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<Text key="dots2" fontSize="16px" color="#344256">...</Text>);
      }

      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          w="40px"
          h="40px"
          variant="outline"
          fontSize="12px"
          fontWeight={600}
          color={totalPages === currentPage ? 'white' : '#344256'}
          bg={totalPages === currentPage ? '#C5B27D' : 'white'}
          _hover={{
            bg: totalPages === currentPage ? '#C5B27D' : '#F0F0F0',
            color: totalPages === currentPage ? 'white' : '#344256',
          }}
          borderColor={totalPages === currentPage ? '#C5B27D' : 'gray.300'}
          borderRadius="4px" 
          _focus={{ boxShadow: 'none' }} 
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Box
      mt={4}
      mb={4}
      p="8px"
      bg={'white'} 
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <HStack spacing={6}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          variant="ghost"
           w="40px"
          h="40px"
          fontSize="16px"
          fontWeight={600}
          lineHeight="15.73px"
          color="#344256"
          colorScheme="gray"
          borderRadius="4px"
          border="1px solid #E2E8F0"
          bg={'white'}
          _hover={{ bg: '#F0F0F0' }}
          _focus={{ boxShadow: 'none' }}
        >
          <ChevronLeftIcon />
        </Button>

        {renderPageNumbers()}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          variant="ghost"
           w="40px"
          h="40px"
          fontSize="16px"
          fontWeight={600}
          lineHeight="15.73px"
          color="#344256"
          colorScheme="gray"
          borderRadius="4px"
          border="1px solid #E2E8F0"
          bg={'white'}
          _hover={{ bg: '#F0F0F0' }}
          _focus={{ boxShadow: 'none' }}
        >
          <ChevronRightIcon />
        </Button>
      </HStack>
    </Box>
  );
};

export default PaginationComponent;
