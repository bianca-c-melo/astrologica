import React, { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { CardsNames } from './cards';

const MyPixiComponent = () => {
  const [revealedCards, setRevealedCards] = useState([]);
  const [isSelectingCards, setIsSelectingCards] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const app = new PIXI.Application({
      backgroundColor: '#1099bb',
      view: canvas,
    });

    const cardContainer = new PIXI.Container();
    app.stage.addChild(cardContainer);

    const cardTextures = [];
    for (const cardName of CardsNames.cards) {
      const texture = PIXI.Texture.from(`Cards-png/CardBacks.png`);
      cardTextures.push(texture);
    }

    const cardSprites = [];
    for (const texture of cardTextures) {
      const cardSprite = new PIXI.Sprite(texture);
      cardSprite.anchor.set(0.5);
      cardSprite.eventMode = 'static';
      cardSprite.on('pointerdown', (event) => {
        if (isSelectingCards && revealedCards.length < 3) {
          setRevealedCards([...revealedCards, cardSprite]);
          if (revealedCards.length === 2) {
            setIsSelectingCards(false);
            setTimeout(() => {
              revealSelectedCards();
            }, 1000);
          }
        }

        // Use event.pointerType em vez de event.mozInputSource
        const pointerType = event.pointerType;
        console.log('Tipo de ponteiro:', pointerType);
      });
      cardSprites.push(cardSprite);
    }

    const spacing = 100;
    cardSprites.forEach((card, index) => {
      card.x = (index + 1) * spacing;
      card.y = app.renderer.screen.height / 2;
      cardContainer.addChild(card);
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      app.renderer.resize(window.innerWidth, window.innerHeight);
      canvas.style.cursor = 'pointer';
    });

    function revealSelectedCards() {
      console.log('Cartas escolhidas:', revealedCards);
    }

    return () => {
      app.destroy();
      document.body.removeChild(canvas);
    };
  }, [revealedCards, isSelectingCards]);

  return null;
};

export default MyPixiComponent;
