import {IIconProps} from "../interfaces";


const FailedStatusIcon = ({ width = 24 , height = 24, onClick} : IIconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_943_94230" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="3" y="1" width="18" height="22">
            <path d="M19 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.5 15H15.5M8.5 18H12M10 10.5L14 6.5M14 10.5L10 6.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </mask>
            <g mask="url(#mask0_943_94230)">
            <path d="M0 0H24V24H0V0Z" fill="#EF4444"/>
            </g>
        </svg>

    )
}
export  default  FailedStatusIcon;