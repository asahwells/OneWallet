
import {IIconProps} from "../interfaces";

const ArrowForwardIcon = ({ width = 24 , height = 24, color='#64748B', onClick} : IIconProps) => {
    return (
            <svg width={width} height={height}  onClick={onClick} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 12H20.25" stroke="#0F454F" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="#0F454F" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>


            )
}

export default ArrowForwardIcon;