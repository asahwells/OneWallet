export interface ImageUploaderProps {
    images: (File | string)[];
    onUpload: (file: any) => void;
    onRemove?: (index: number) => any;
    onView?: (src: string) => any;
}