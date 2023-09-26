import React, { useState } from "react";
import { CardsNames } from "./cards";
import { Image } from "@nextui-org/react";
import { Grid, Paper } from "@mui/material";

const cardData = CardsNames.cards.map((cardName, index) => ({
  imageSrc: `./Cards-png/${cardName}.png`,
  cardName,
}));

const tarotDeck: string[] = cardData.map((card) => card.imageSrc);
const celticCrossPositions: Array<{ x: number; y: number }> = [
  { x: 0, y: 0 }, // Posição central
  { x: 1, y: 0 }, // Posição acima
  { x: 0, y: 1 }, // Posição abaixo
  { x: -1, y: 0 }, // Posição esquerda
  { x: 0, y: -1 }, // Posição direita
  { x: 1, y: 1 }, // Posição superior esquerda
  { x: -1, y: 1 }, // Posição superior direita
  { x: -1, y: -1 }, // Posição inferior direita
  { x: 1, y: -1 }, // Posição inferior esquerda
  { x: 2, y: 0 }, // Posição extra 1
  { x: 0, y: 2 }, // Posição extra 2
  { x: -2, y: 0 }, // Posição extra 3
  { x: 0, y: -2 }, // Posição extra 4
];

const CelticCrossSpread: React.FC = () => {
  const [spread, setSpread] = useState<string[]>(Array(12).fill(""));
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [cardPositions, setCardPositions] = useState<Array<{ x: number; y: number }>>(
    Array(12).fill({ x: 0, y: 0 })
  );

  const shuffleDeck = () => {
    const shuffledDeck = [...tarotDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setSpread(shuffledDeck);
  };

  const handleClick = (index: number) => {
    const card = tarotDeck[index];
    if (selectedCards.length < 12 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);

      // Encontra a próxima posição na Cruz Celta
      const nextPosition = celticCrossPositions[selectedCards.length];
      if (nextPosition) {
        setCardPositions([...cardPositions, nextPosition]);
      }
    }
  };

  return (
    <div className="celtic-cross-spread">
      <button
        onClick={shuffleDeck}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Embaralhar
      </button>
      <Grid>
        <Paper>
          <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full">
            {spread.map((card, index) => (
              <div
                key={index}
                className={`col-span-1 row-span-1 text-center p-2 transition-transform ease-in-out transform hover:scale-105 cursor-pointer`}
                onClick={() => handleClick(index)}
                style={{
                  transform: `translate(${cardPositions[index].x}px, ${cardPositions[index].y}px)`,
                }}
              >
                {card ? (
                  <Image
                    src={card}
                    alt={`Card ${index + 1}`}
                    style={{ width: "150px", height: "263px" }}
                  />
                ) : (
                  <Image
                    src={tarotDeck[index]}
                    alt={`Card ${index + 1}`}
                    style={{ width: "150px", height: "263px" }}
                  />
                )}
              </div>
            ))}
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default CelticCrossSpread;
