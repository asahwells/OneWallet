


import {IIconProps} from "../interfaces";


const ForwardtoIcon = ({ width = 20 , height = 21, onClick} : IIconProps) => {
    return (


            <svg width={width} height={height} onClick={onClick}  viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.61523" y="3.08008" width="16.9706" height="16.9706" rx="4" fill="#0F454F"/>
                <path
                    d="M12.155 9.53646L7.08333 14.6081L6.25 13.7748L11.3217 8.70312L6.85167 8.70313L6.85167 7.52479L13.3333 7.52479L13.3333 14.0065L12.155 14.0065L12.155 9.53646Z"
                    fill="white"/>
            </svg>

            )
}

export default ForwardtoIcon;