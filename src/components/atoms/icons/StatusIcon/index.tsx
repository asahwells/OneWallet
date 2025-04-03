import { useEffect, useRef } from "react";
import { IIconProps } from "../interfaces";

export const PendingStatusIcon = ({ width = 24, height = 24, cursor = 'pointer', onClick }: IIconProps) => {
    const rotation = useRef(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      if (divRef.current) {
        rotation.current += 1;
        divRef.current.style.background = `conic-gradient(from ${rotation.current}deg, rgba(197, 178, 125, 1) 0deg, rgba(220, 209, 177, 0.02) 360deg)`;
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if needed (e.g., cancel animation frame)
    };
  }, []);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" cursor={cursor} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#paint0_angular_943_117910_clip_path)" data-figma-skip-parse="true">
        <g transform="matrix(0 0.012 -0.012 0 12 12)">
          <foreignObject x="-1114.29" y="-1114.29" width="2228.57" height="2228.57">
            <div
                ref={divRef}
              style={{
                background: 'conic-gradient(from 90deg, rgba(197, 178, 125, 1) 0deg, rgba(220, 209, 177, 0.02) 360deg)',
                height: '100%',
                width: '100%',
                opacity: 1,
              }}
            ></div>
          </foreignObject>
        </g>
      </g>
      <path d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM3.98782 12C3.98782 16.425 7.575 20.0122 12 20.0122C16.425 20.0122 20.0122 16.425 20.0122 12C20.0122 7.575 16.425 3.98782 12 3.98782C7.575 3.98782 3.98782 7.575 3.98782 12Z" data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.77254903316497803,&#34;g&#34;:0.69803923368453979,&#34;b&#34;:0.49019607901573181,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.86274510622024536,&#34;g&#34;:0.81960785388946533,&#34;b&#34;:0.69411766529083252,&#34;a&#34;:0.019999999552965164},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.77254903316497803,&#34;g&#34;:0.69803923368453979,&#34;b&#34;:0.49019607901573181,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.86274510622024536,&#34;g&#34;:0.81960785388946533,&#34;b&#34;:0.69411766529083252,&#34;a&#34;:0.019999999552965164},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:1.4695762231022014e-15,&#34;m01&#34;:-24.0,&#34;m02&#34;:24.0,&#34;m10&#34;:24.0,&#34;m11&#34;:1.4695762231022014e-15,&#34;m12&#34;:-1.4695762231022014e-15},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"/>
      <path d="M8 12.0005L10.8287 14.8292L16.4847 9.17188" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <clipPath id="paint0_angular_943_117910_clip_path">
          <path d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM3.98782 12C3.98782 16.425 7.575 20.0122 12 20.0122C16.425 20.0122 20.0122 16.425 20.0122 12C20.0122 7.575 16.425 3.98782 12 3.98782C7.575 3.98782 3.98782 7.575 3.98782 12Z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FailedStatusIcon = ({ width = 24, height = 24, cursor = 'pointer', onClick }: IIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" cursor={cursor} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#EF4444"/>
    <path d="M15.9375 8.0625L8.0625 15.9375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.9375 15.9375L8.0625 8.0625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export const SuccessStatusIcon = ({ width = 24, height = 24, cursor = 'pointer', onClick }: IIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" cursor={cursor} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#22C55E"/>
    <path d="M8 12.0005L10.8287 14.8292L16.4847 9.17188" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  );
};

