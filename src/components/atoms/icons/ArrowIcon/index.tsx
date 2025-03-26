
import {IIconProps} from "../interfaces";


const ArrowIcon = ({ width = 4 , height = 58, color='#64748B', onClick} : IIconProps) => {
    return (

            <svg width={width} height={height} onClick={onClick}  viewBox="0 0 4 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 0.666667C1.26362 0.666667 0.666667 1.26362 0.666667 2C0.666667 2.73638 1.26362 3.33333 2 3.33333C2.73638 3.33333 3.33333 2.73638 3.33333 2C3.33333 1.26362 2.73638 0.666667 2 0.666667ZM2 54.6667C1.26362 54.6667 0.666664 55.2636 0.666664 56C0.666664 56.7364 1.26362 57.3333 2 57.3333C2.73638 57.3333 3.33333 56.7364 3.33333 56C3.33333 55.2636 2.73638 54.6667 2 54.6667ZM1.75 2L1.75 56L2.25 56L2.25 2L1.75 2Z"
                    fill={color}/>
            </svg>

    )
}

export default ArrowIcon;