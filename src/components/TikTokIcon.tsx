interface TikTokIconProps {
  size?: number;
  className?: string;
}

export function TikTokIcon({ size = 24, className = "" }: TikTokIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.46-.76-.53-1.43-1.18-1.93-1.94V14.5c.07 2.35-1.2 4.67-3.39 5.62-2.21.96-4.92.54-6.77-1.15-2.04-1.87-2.52-5.01-1.21-7.52 1.15-2.19 3.66-3.44 6.13-3.15.02 1.48-.03 2.96-.03 4.44-.14-.04-.28-.07-.42-.09-1.22-.17-2.48.33-3.11 1.38-.63 1.05-.38 2.5.56 3.32.93.81 2.36.85 3.33.11.84-.65 1.18-1.74 1.15-2.8V.02z" />
    </svg>
  );
}
