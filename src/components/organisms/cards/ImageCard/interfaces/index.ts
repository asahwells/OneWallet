export interface IImageCardProps {
    src: string;
    onRemove: () => void;
    onView: (src: string) => void; 
  }

export interface IImageProps {
  previewUrl?: string;
};