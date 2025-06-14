import React from 'react';
import { IIconProps } from './interfaces';


const InfoIcon = ({ width = '16' , height = '16', onClick }: IIconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.0026 1.33203C4.3226 1.33203 1.33594 4.3187 1.33594 7.9987C1.33594 11.6787 4.3226 14.6654 8.0026 14.6654C11.6826 14.6654 14.6693 11.6787 14.6693 7.9987C14.6693 4.3187 11.6826 1.33203 8.0026 1.33203ZM8.66927 11.332H7.33594V7.33203H8.66927V11.332ZM8.66927 5.9987H7.33594V4.66536H8.66927V5.9987Z" fill="#0F454F"/>
        </svg>      
    );
};

export default InfoIcon;
