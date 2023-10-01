import React, { useEffect, useState } from "react";
import { Card } from "./card";
import {
  Button,
} from "@nextui-org/react";
import "./styles.css";

interface DockProps {
  cardsToDraw: number;
  numberOfCards: number;
  cardBack: string;
  cardNames: string[];
  deckPosition: any;
}

const DOCK_ZOOM_LIMIT = [1, 1.1];

export function Dock({
  numberOfCards,
  cardBack,
  cardNames,
  cardsToDraw,
  deckPosition,
}: DockProps): React.JSX.Element {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [deck, setDeck] = useState<number[]>([]); // Representa o índice das cartas no deck

  useEffect(() => {
    // Inicializa o deck quando o componente é montado
    setDeck(Array.from({ length: numberOfCards }, (_, index) => index));
  }, [numberOfCards]);

  const shuffleDeck = () => {
    setIsShuffled(true);
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
    setTimeout(() => {
      setIsShuffled(false);
    }, 1000);
  };

  const handleClickCard = (index: number) => {
    if (selectedCards.includes(index)) {
      // Se a carta já estiver selecionada, remova-a
      setSelectedCards(
        selectedCards.filter((cardIndex) => cardIndex !== index)
      );
    } else {
      // Se a carta não estiver selecionada e houver menos cartas selecionadas do que o limite, adicione-a
      if (selectedCards.length < cardsToDraw) {
        setSelectedCards([...selectedCards, index]);
      }
    }
    setHoveredCardIndex(index);
  };
  const totalWidth = numberOfCards * 22.3;
  const horizontalPosition = (window.innerWidth - totalWidth) / 2;

  return (
    <div className="">
      <div className="justify-center">
        <Button color="warning" onClick={shuffleDeck}>
          Embaralhar
        </Button>
      </div>
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <div
          key={index}
          className={`absolute transition-transform transform duration-300 ease-in-out cursor-pointer ${
            selectedCards.includes(index) ? "selected-card" : ""
          }, ${isShuffled ? "shuffle-animation" : ""}`}
          style={{
            transform: `translate(${horizontalPosition + index * 20}px, ${
              window.innerHeight - 150
            }px) scale(${
              hoveredCardIndex === index || selectedCards.includes(index)
                ? DOCK_ZOOM_LIMIT[1]
                : DOCK_ZOOM_LIMIT[0]
            })`,
          }}
          onMouseOver={() => setHoveredCardIndex(index)}
          onMouseOut={() => setHoveredCardIndex(null)}
          onClick={() => handleClickCard(index)}
        >
          <div
            className={`w-24 h-32 bg-white rounded shadow-md ${
              isShuffled ? "" : ""
            }`}
          >
            <Card src={cardBack} className="w-full h-full " />
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center h-screen">
        {selectedCards.map((selectedCardIndex, index) => (
          <Card
            key={selectedCardIndex}
            src={`/Cards-png/${cardNames[selectedCardIndex]}.png`}
            className={deckPosition[index]}
          />
        ))}
      </div>
    </div>
  );
}
