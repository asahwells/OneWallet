import { RefObject } from 'react';

export interface ImageUploaderProps {
    images: (File | string)[];
    onUpload: (file: any) => void;
    onRemove?: (index: number) => any;
    onView?: (src: string) => any;
}

export interface DocumentUploaderProps {
    onFileSelect: (file: File | string) => void;
    onUploadClick?: () => void;
    fileTypes?: string | string[];
    maxFileSize?: number;
    fileInputRef?: RefObject<HTMLInputElement>;
  }