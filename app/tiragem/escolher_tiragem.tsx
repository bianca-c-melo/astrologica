import React from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { GiCardPlay, GiCardBurn, GiCardRandom } from "react-icons/gi"
import { TbCards } from "react-icons/tb"

export default function EscolherTiragem() {
    const cruzCelta =
        "A Cruz Celta é uma tiragem de tarô que fornece insights e orientações em questões complexas, oferecendo clareza e entendimento profundo.";

    const treeCartas =
        "Uma tiragem de 3 cartas no tarô é uma abordagem simples, mas poderosa, que fornece uma visão do passado, presente e futuro de uma situação.";

    const temploAfrodite = "A tiragem Templo de Afrodite é uma abordagem específica para consultas que envolvem questões de relacionamento, amor e sensualidade."

    return (
        <div className="w-60 mt-20 fixed">
            <Accordion variant="shadow">
                <AccordionItem key="anchor" aria-label="Anchor" indicator={<TbCards />} title="Cruz Celta">
                    {cruzCelta}
                    <ButtonTiragem />
                </AccordionItem>
                <AccordionItem key="moon" aria-label="Moon" indicator={<TbCards />} title="3 Cartas">
                    {treeCartas}
                    <ButtonTiragem />
                </AccordionItem>
                <AccordionItem key="sun" aria-label="Sun" indicator={<TbCards />} title="Templo de Afrodite">
                    {temploAfrodite}
                    <ButtonTiragem />
                </AccordionItem>
            </Accordion>
        </div>
    );
}

function ButtonTiragem() {
    return (
        <div className="pl-20">
            <Button startContent={<GiCardBurn />} color="warning" variant="shadow">Tirar</Button>
        </div>
    );
}



