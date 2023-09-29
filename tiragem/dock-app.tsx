import { CardsNames } from "@/anime/cards";
import { Box, Grid, Paper } from "@mui/material";
import { Dock } from "./dock";
import { tarotPositions } from "./positions";

function DockApp() {
    const numberOfTarotCards = 78;
    const cardBack = "/Cards-png/BackCard.jpg";
    const cardNames = CardsNames.cards;
    const cardsToDraw = 10;
    const selectedTarotSpread = "celticCross";
    const deckPosition = tarotPositions[selectedTarotSpread];
  
    return (
      <Grid  item xs={6} justifyContent="center" alignItems="center" >
           <Box
          sx={{
            display: "flex",
            borderRadius: 2,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 1900,
              height: 830,
            },
            overflow: "hidden",
          }}
        >
          <Paper elevation={12} >
              <div className="">
            <Dock
              numberOfCards={numberOfTarotCards}
              cardBack={cardBack}
              cardNames={cardNames}
              cardsToDraw={cardsToDraw}
              deckPosition={deckPosition}
            />
            </div>
          </Paper>
        </Box>
      </Grid>
    );
  }
  
  export default DockApp;