// Carta.tsx

import React from 'react';

interface CardProps {
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, description }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
