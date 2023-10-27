import React, { useEffect, useState } from "react";
import { Card } from "./card";
import "./styles.css";
import { Container, Grid } from "@mui/material";

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
  const [deck, setDeck] = useState<number[]>([]); // Representa o índice das cartas no deck

  useEffect(() => {
    // Inicializa o deck quando o componente é montado
    setDeck(Array.from({ length: numberOfCards }, (_, index) => index));
  }, [numberOfCards]);

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
  const totalWidth = numberOfCards * 15;
  const horizontalPosition = (window.innerWidth - totalWidth) / 2;

  return (
    <Grid>
      <Container fixed>
        <div className="">
          <Grid>
            <div className="">
              {Array.from({ length: numberOfCards }).map((_, index) => (
                <div
                  key={index}
                  className={`absolute transition-transform duration-300 ease-in-out cursor-pointer ${selectedCards.includes(index) ? "selected-card" : ""
                    }`}
                  style={{
                    transform: `translate(${horizontalPosition + index * 10}px, ${window.innerHeight - 0
                      }px) scale(${hoveredCardIndex === index || selectedCards.includes(index)
                        ? DOCK_ZOOM_LIMIT[1]
                        : DOCK_ZOOM_LIMIT[0]
                      })`,
                  }}
                  onMouseOver={() => setHoveredCardIndex(index)}
                  onMouseOut={() => setHoveredCardIndex(null)}
                  onClick={() => handleClickCard(index)}
                >
                  <div
                    className={`bg-white rounded shadow-md mb-20`}
                  >
                    <Card src={cardBack} className="" />
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid>
            <div className="justify-start">
              {selectedCards.map((selectedCardIndex, index) => (
                <Card
                  key={selectedCardIndex}
                  src={`/../Cards-png/${cardNames[selectedCardIndex]}.png`}
                  className={deckPosition[index]}
                />
              ))}
            </div>
          </Grid>
        </div>

      </Container >
    </Grid>
  );
}
