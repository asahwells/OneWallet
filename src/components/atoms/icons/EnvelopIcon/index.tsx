import React from 'react';

interface IIconProps {
    color?: string;
    width?: string;
    height?: string;
    onClick?: () => void;
}

const EnvelopIcon = ({ width = '21' , height = '20', onClick }: IIconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.32365 5.88355L10.3203 9.88186L18.317 5.8835C18.2566 4.83315 17.3858 4 16.3203 4H4.32031C3.25483 4 2.38395 4.83318 2.32365 5.88355Z" fill="#344256"/>
            <path d="M18.3203 8.1179L10.3203 12.1179L2.32031 8.11796V14C2.32031 15.1046 3.21574 16 4.32031 16H16.3203C17.4249 16 18.3203 15.1046 18.3203 14V8.1179Z" fill="#344256"/>
        </svg>
    );
};

export default EnvelopIcon;
