import * as React from "react";

interface CardProps {
  src: string;
  className: string;
}

export const Card = ({ src, className}: CardProps) => (
  <div>
    <img src={src} alt="" width={100} height={200} className={className}/>
  </div>
);
