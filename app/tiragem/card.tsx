import * as React from "react";
import Image from "next/image";

interface CardProps {
  src: string;
  className: string;
}

export const Card = ({ src, className}: CardProps) => (
  <div>
    <Image src={src} alt="" width={100} height={200} className={className}/>
  </div>
);
