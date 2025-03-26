import {IIconProps} from "../interfaces";

const MoreIcon = ({width = 22, height = 21, color = '#64748B', onClick}: IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 22 21" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.5 10.5H4.50875M10.625 10.5H10.6338M16.75 10.5H16.7588M5.375 10.5C5.375 10.9832 4.98325 11.375 4.5 11.375C4.01675 11.375 3.625 10.9832 3.625 10.5C3.625 10.0168 4.01675 9.625 4.5 9.625C4.98325 9.625 5.375 10.0168 5.375 10.5ZM11.5 10.5C11.5 10.9832 11.1082 11.375 10.625 11.375C10.1418 11.375 9.75 10.9832 9.75 10.5C9.75 10.0168 10.1418 9.625 10.625 9.625C11.1082 9.625 11.5 10.0168 11.5 10.5ZM17.625 10.5C17.625 10.9832 17.2332 11.375 16.75 11.375C16.2668 11.375 15.875 10.9832 15.875 10.5C15.875 10.0168 16.2668 9.625 16.75 9.625C17.2332 9.625 17.625 10.0168 17.625 10.5Z"
                stroke="#A1A1AA" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


    )
}
export default MoreIcon;


