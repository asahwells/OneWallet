import { IIconProps } from "../interfaces";

interface InfoIconProps extends IIconProps {
  outerFill?: string;
  innerFill?: string;
}

const InfoCyleIcon = ({
  width = 20,
  height = 20,
  onClick,
  outerFill = "white", // Default outer fill
  innerFill = "black", // Default inner fill
}: InfoIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick} // Pass onClick if provided
    >
      <circle cx="10" cy="10" r="8.33333" fill={outerFill} />
      <path
        d="M10 6.04297C10.3417 6.04297 10.625 6.3263 10.625 6.66797V10.8346C10.625 11.1763 10.3417 11.4596 10 11.4596C9.65834 11.4596 9.375 11.1763 9.375 10.8346V6.66797C9.375 6.3263 9.65834 6.04297 10 6.04297ZM10.7667 13.6513C10.725 13.7596 10.6667 13.843 10.5917 13.9263C10.5083 14.0013 10.4167 14.0596 10.3167 14.1013C10.2167 14.143 10.1083 14.168 10 14.168C9.89167 14.168 9.78333 14.143 9.68334 14.1013C9.58333 14.0596 9.49167 14.0013 9.40833 13.9263C9.33333 13.843 9.275 13.7596 9.23334 13.6513C9.19167 13.5513 9.16667 13.443 9.16667 13.3346C9.16667 13.2263 9.19167 13.118 9.23334 13.018C9.275 12.918 9.33333 12.8263 9.40833 12.743C9.49167 12.668 9.58333 12.6096 9.68334 12.568C9.88334 12.4846 10.1167 12.4846 10.3167 12.568C10.4167 12.6096 10.5083 12.668 10.5917 12.743C10.6667 12.8263 10.725 12.918 10.7667 13.018C10.8083 13.118 10.8333 13.2263 10.8333 13.3346C10.8333 13.443 10.8083 13.5513 10.7667 13.6513Z"
        fill={innerFill}
      />
    </svg>
  );
};

export default InfoCyleIcon;