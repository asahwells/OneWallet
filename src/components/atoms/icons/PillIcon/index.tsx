

import {IIconProps} from "../interfaces";


const PillIcon = ({ width = 28 , height = 15, color='#64748B', onClick} : IIconProps) => {
    return (
            <svg width={width} height={height} onClick={onClick}  viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="15" rx="7.5" fill={color}/>
            </svg>


            )
            }
            export default PillIcon;