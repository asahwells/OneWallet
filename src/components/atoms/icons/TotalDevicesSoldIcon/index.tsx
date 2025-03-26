import {IIconProps} from "../interfaces";


const TotalDevicesSoldIcon = ({width = 36, height = 36, onClick}: IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 36 36" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="8" fill="#FFF7E1"/>
            <g clip-path="url(#clip0_1381_30713)">
                <path
                    d="M12.9375 14.25C12.9375 12.3887 14.4512 10.875 16.3125 10.875C18.1738 10.875 19.6875 12.3887 19.6875 14.25C19.6875 16.1113 18.1738 17.625 16.3125 17.625C14.4512 17.625 12.9375 16.1113 12.9375 14.25ZM11.25 21.5625V24.375H16.875L16.8907 19.875C16.9363 19.4621 17.082 19.0791 17.3025 18.75H14.0625C12.5094 18.75 11.25 20.0094 11.25 21.5625ZM21.9375 22.6875H20.8125V22.125H18V24.375H24.75V22.125H21.9375V22.6875ZM23.3438 18.75H23.0625V18.4688C23.0625 18.0036 22.6839 17.625 22.2188 17.625H20.5312C20.0661 17.625 19.6875 18.0036 19.6875 18.4688V18.75H19.4062C18.6311 18.75 18 19.3811 18 20.1562V21H24.75V20.1562C24.75 19.3811 24.1189 18.75 23.3438 18.75Z"
                    fill="#FFC327"/>
            </g>
            <defs>
                <clipPath id="clip0_1381_30713">
                    <rect width="13.5" height="13.5" fill="white" transform="translate(11.25 10.875)"/>
                </clipPath>
            </defs>
        </svg>


    )
}
export default TotalDevicesSoldIcon;