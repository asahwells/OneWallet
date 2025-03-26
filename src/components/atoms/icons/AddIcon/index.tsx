import {IIconProps} from "../interfaces";


const AddIcon = ({ width = 24 , height = 24, cursor = 'pointer', onClick} : IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} cursor={cursor} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9834 22C18.7193 22 23.3692 17.5228 23.3692 12C23.3692 6.47715 18.7193 2 12.9834 2C7.24752 2 2.59766 6.47715 2.59766 12C2.59766 17.5228 7.24752 22 12.9834 22Z" stroke="#344256" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.9844 8V16" stroke="#344256" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.82812 12H17.1367" stroke="#344256" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}
export  default  AddIcon;