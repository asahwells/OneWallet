

import {IIconProps} from "../interfaces";


const BusinessIcon = ({ width = 18 , height = 18, onClick} : IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 12.75H12.75V10.5H13.5V9L12.75 5.25H1.5L0.75 9V10.5H1.5V15H8.25V10.5H11.25V12.75ZM6.75 13.5H3V10.5H6.75V13.5ZM1.5 3H12.75V4.5H1.5V3Z" fill="#3F6A72"/>
<path d="M15 13.5V11.25H13.5V13.5H11.25V15H13.5V17.25H15V15H17.25V13.5H15Z" fill="#3F6A72"/>
</svg>

)
}
export  default  BusinessIcon;