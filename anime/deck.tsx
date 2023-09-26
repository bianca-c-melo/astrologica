// Deck.tsx

import React from 'react';
import Card from './card';

const tarotDeck = [
  { name: 'Card 1', description: 'Description 1' },
  { name: 'Card 2', description: 'Description 2' },
  // Adicione todas as cartas do tarot aqui
];

const Deck: React.FC = () => {
  return (
    <div className="deck">
      {tarotDeck.map((card, index) => (
        <Card key={index} name={card.name} description={card.description} />
      ))}
    </div>
  );
};

export default Deck;
