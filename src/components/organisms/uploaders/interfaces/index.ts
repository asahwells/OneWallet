import { RefObject } from 'react';

export interface ImageUploaderProps {
    images: (File | string)[];
    onUpload: (file: any) => void;
    onRemove?: (index: number) => any;
    onView?: (src: string) => any;
}

export interface DocumentUploaderProps {
    onFileSelect: (file: File) => void;
    onUploadClick?: () => void;
    fileTypes?: string | string[];
    maxFileSize?: number;
    isMobile?: boolean;
    fileInputRef?: RefObject<HTMLInputElement>;
  }