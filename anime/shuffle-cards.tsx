'use client';
import React, { useState } from "react";
import { useSprings, animated } from "react-spring";
import { useGesture,  } from "react-use-gesture";
import { CardsNames } from "./cards";
import { EventTypes, NativeHandlers, UserHandlers } from "react-use-gesture/dist/types";

const cardData = CardsNames.cards.map((cardName, index) => ({
  imageSrc: `./Cards-png/${cardName}.png`,
  cardName,
}));

const tarotDeck: string[] = cardData.map((card) => card.imageSrc);


// Embaralhe o deck e selecione 3 cartas aleatórias
function shuffleDeckAndSelect3Cards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, 3);
}

function Deck() {
  const cardData = shuffleDeckAndSelect3Cards(tarotDeck);
  const [gone] = useState(() => new Set()); // Conjunto para rastrear cartas descartadas
  const [props, set] = useSprings(cardData.length, (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -5 + Math.random() * 10,
    delay: i * 100,
  }));

  // Função para lidar com gestos
  const bind = useGesture(({ args: [index], down, delta: [xDelta, yDelta], velocity }) => {
    const trigger = velocity > 0.5;
    const leftOrRight = xDelta < 0 ? -1 : 1;

    if (!down && trigger) gone.add(index);

    set((i) => {
      if (index !== i) return;

      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * leftOrRight : down ? xDelta : 0;
      const y = isGone ? (200 + window.innerWidth) * yDelta : down ? yDelta : 0;
      const rot = xDelta / 100 + (isGone ? leftOrRight * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      const zIndex = down ? 1 : 0;

      return {
        x,
        y,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        zIndex,
      };
    });

    if (!down && gone.size === cardData.length) setTimeout(() => gone.clear() || set((i) => ({ x: 0, y: 0, scale: 1, rot: 0 })), 600);
  });

  return (
    <div className="app">
      {props.map(({ x, y, rot, scale, zIndex }, i) => (
        <animated.div
          key={i}
          {...bind(i)}
          style={{
            transform: x.to((valX) => `translate3d(${valX}px,${y}px,0)`),
            zIndex,
          }}
        >
          <animated.div
            style={{
              transform: rot.to((valRot) => `rotate(${valRot}deg) scale(${scale})`),
              backgroundImage: `url(./Cards-png/${cardData[i]})`, // Substitua com seu caminho real
            }}
          />
        </animated.div>
      ))}
    </div>
  );
}

export default Deck;
