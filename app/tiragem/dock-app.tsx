import { CardsNames } from "@/anime/cards";
import { Box, Container, Grid, Paper } from "@mui/material";
import { Dock } from "./dock";
import { tarotPositions } from "./positions";
import EscolherTiragem from "./escolher_tiragem";

function DockApp() {
    const numberOfTarotCards = 78;
    const cardBack = "/images/BackCard.png";
    const cardNames = CardsNames.cards;
    const cardsToDraw = 10;
    const selectedTarotSpread = "celticCross";
    const deckPosition = tarotPositions[selectedTarotSpread];
  
    return (
      <Box sx={{ bgcolor: '#27272a', height: '70vw', width: '98.72vw' }}>
        <EscolherTiragem/>
          <div>
            <Dock
              numberOfCards={numberOfTarotCards}
              cardBack={cardBack}
              cardNames={cardNames}
              cardsToDraw={cardsToDraw}
              deckPosition={deckPosition}
            />
          </div>
        </Box>
         

    );
  }
  
  export default DockApp;