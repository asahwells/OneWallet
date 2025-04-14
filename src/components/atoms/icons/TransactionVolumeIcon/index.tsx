import { IIconProps } from '../interfaces/index';

const TransactionVolumeIcon = ({ width = 36 , height = 36, onClick} : IIconProps) => {
    return (
    <svg
        width={width} 
        height={height}
        onClick={onClick}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <rect opacity="0.1" width="36" height="36" rx="8" fill="#5B93FF" />
      <path
        d="M23.768 10.1641H12.568C11.868 10.1641 11.168 10.7941 11.168 11.5641V13.6711C11.168 14.1751 11.469 14.6091 11.868 14.8541V22.7641C11.868 23.5341 12.638 24.1641 13.268 24.1641H23.068C23.698 24.1641 24.468 23.5341 24.468 22.7641V14.8541C24.867 14.6091 25.168 14.1751 25.168 13.6711V11.5641C25.168 10.7941 24.468 10.1641 23.768 10.1641ZM20.268 18.5641H16.068V17.1641H20.268V18.5641ZM23.768 13.6641H12.568V11.5641H23.768V13.6641Z"
        fill="#5B93FF"
      />
    </svg>
  );
};

export default TransactionVolumeIcon;
