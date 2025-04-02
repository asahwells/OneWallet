import {IIconProps} from "../interfaces";


const ExclamationIcon = ({width = 16, height = 16, onClick}: IIconProps) => {
    return (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 16 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.9987 1.3335C4.3187 1.3335 1.33203 4.32016 1.33203 8.00016C1.33203 11.6802 4.3187 14.6668 7.9987 14.6668C11.6787 14.6668 14.6654 11.6802 14.6654 8.00016C14.6654 4.32016 11.6787 1.3335 7.9987 1.3335ZM8.66536 11.3335H7.33203V7.3335H8.66536V11.3335ZM8.66536 6.00016H7.33203V4.66683H8.66536V6.00016Z"
                fill="#0F454F"/>
        </svg>


    )
}
export default ExclamationIcon;