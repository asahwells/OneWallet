import { IIconProps } from "../interfaces";

const DownloadIcon = ({ width = 25 , height = 24, onClick} : IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1556_4865)">
                <path d="M4.5 17V19C4.5 19.5304 4.71071 20.0391 5.08579 20.4142C5.46086 20.7893 5.96957 21 6.5 21H18.5C19.0304 21 19.5391 20.7893 19.9142 20.4142C20.2893 20.0391 20.5 19.5304 20.5 19V17" stroke="#344256" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 11L12.5 16L17.5 11" stroke="#344256" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 4V16" stroke="#344256" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_1556_4865">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                </clipPath>
            </defs>
        </svg>
    )
}
export  default  DownloadIcon;