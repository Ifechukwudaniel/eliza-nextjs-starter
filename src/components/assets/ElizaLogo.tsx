import clsx from "clsx";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 120, height = 32, className = "" }: LogoProps) {
  return (
    <div className={clsx(["select-none", className])}>
      <Image
        src={"./logo.png"}
        alt="Eliza Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  );
}
