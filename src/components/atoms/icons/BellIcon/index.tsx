import {IIconProps} from "../interfaces";


const BellIcon = ({ width = 25 , height = 25, onClick} : IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.75 17.625H20.75L19.3451 16.2201C18.9641 15.8391 18.75 15.3223 18.75 14.7835V11.625C18.75 9.01257 17.0804 6.79009 14.75 5.96642V5.625C14.75 4.52043 13.8546 3.625 12.75 3.625C11.6454 3.625 10.75 4.52043 10.75 5.625V5.96642C8.41962 6.79009 6.75 9.01257 6.75 11.625V14.7835C6.75 15.3223 6.53595 15.8391 6.15493 16.2201L4.75 17.625H9.75M15.75 17.625V18.625C15.75 20.2819 14.4069 21.625 12.75 21.625C11.0931 21.625 9.75 20.2819 9.75 18.625V17.625M15.75 17.625H9.75" stroke="#3F3F46" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}
export  default  BellIcon;