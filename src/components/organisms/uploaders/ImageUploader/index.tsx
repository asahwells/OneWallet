import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import AddIcon from "../../../atoms/icons/AddIcon";
import { ImageUploaderProps } from "../interfaces";
import ImageCard from "../../cards/ImageCard";

const ImageUploader = ({ images, onUpload, onView, onRemove }: ImageUploaderProps) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const customToast = useToast();

    useEffect(() => {
        // Generate image URLs from File objects or use the passed URLs directly
        const newPreviews = images.map((file, index) => {
            console.log(`File at index ${index}:`, file); // Debugging output
    
            if (typeof file === "string") {
                return file; // Already a URL
            }
    
            if (file instanceof File) {
                return URL.createObjectURL(file); // Create URL from File
            }
    
            console.error(`Invalid file type at index ${index}:`, file);
            return null; // Handle unexpected file type
        });
    
        // Filter out any null values that may have been added due to errors
        const validPreviews = newPreviews.filter(url => url !== null);
    
        setImagePreviews(validPreviews);
    
        // Cleanup object URLs on unmount to avoid memory leaks
        return () => {
            validPreviews.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [images]);
    

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        // Check if file is larger than 2MB
        if (file && file.size > 2 * 1024 * 1024) { 
            customToast({
                title: "File too large.",
                description: "Please upload a file smaller than 2MB.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return; 
        }

        if (file) {
            onUpload((prev: Array<File | string>) => [...prev, file]); // Keep both File and URL
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        onUpload(updatedImages);
    };

    const handleViewImage = (src: string) => {
        console.log('View image:', src);
        window.open(src); // Optional: Open the image in a new tab
    };

    return (
        <Flex gap="12px" border="2px dashed #CBD5E0" p="16px" borderRadius="8px" w="full" alignItems="center">
            {imagePreviews.map((src, index) => (
                <ImageCard
                    key={index}
                    src={src} // Use the generated preview URL
                    onRemove={() => handleRemoveImage(index)}
                    onView={() => handleViewImage(src)}
                />
            ))}

            {/* Image Upload Button */}
            <Box
                width="full"
                height="auto"
                bg="gray.50"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                position="relative"
            >
                <Box
                    w='30%'
                    textAlign='center'
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                >
                    <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        position="absolute"
                        px="7px"
                        top="0"
                        left="0"
                        opacity="0"
                        width="100%"
                        height="100%"
                        cursor="pointer"
                        onChange={handleUpload}
                    />
                    <AddIcon cursor="pointer" />
                    <Text fontSize="12px" color="#344256" mt="8px">
                        JPEG & PNG not more than 2MB
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

export default ImageUploader;