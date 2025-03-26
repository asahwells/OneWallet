import React from 'react';
import { Box, Image, IconButton} from '@chakra-ui/react';
import { IImageCardProps } from '../interfaces';
import ViewIcon from 'components/atoms/icons/ViewIcon';
import SaveIcon from 'components/atoms/icons/SaveIcon';

const ImageCard = ({ src, onRemove, onView }: IImageCardProps) => {
  return (
    <Box
      border="1px solid #E2E8F0"
      padding="7px"
      width="217px"
      height="93px"
      position="relative"
      overflow="hidden"
      bg="#CBD5E1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Image src={src} alt="Uploaded image" borderRadius={'4px'} objectFit="cover" width="100%" height="100%" />
      <Box
        position="relative"
        top="0"
        right="0"
        display="flex"
        flexDirection="column"
        gap="4px"
        p="4px"
      >
        <IconButton
          icon={<ViewIcon color="white" />}
          size="sm"
          variant="ghost"
          onClick={onView}
          aria-label="View image"
        />
        <IconButton
          icon={<SaveIcon color="white" />}
          size="sm"
          variant="ghost"
          onClick={onRemove}
          aria-label="Remove image"
        />
      </Box>
    </Box>
  );
};

export  default ImageCard;