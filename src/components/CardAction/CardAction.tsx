import "../global.css";
import "./CardAction.css";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"; // NEW
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"; // NEW

interface compromissoDTO {
    id: number,
    titulo: string,
    descricao: string,
    horario: string
}

interface OdeioReact {
    compromisso: compromissoDTO,
    onOpen: (c: compromissoDTO) => void,
}


export default function CardAction({ compromisso, onOpen }: OdeioReact) {
    const [isDragging, setIsDragging] = useState(false);

    const cardRef = useRef(null); // Create a ref for the card

    useEffect(() => {
        if (!cardRef.current) return;
        const cardEl = cardRef.current;
        invariant(cardEl); // Ensure the card element exists

        return combine(
            draggable({
                element: cardEl,
                getInitialData: () => ({ type: "card", cardId: compromisso.id }),
                onDragStart: () => setIsDragging(true),
                onDrop: () => setIsDragging(false),
            }),
            // Add dropTargetForElements to make the card a drop target
            dropTargetForElements({
                element: cardEl,
                getData: ({ input, element }) => {
                    // To attach card data to a drop target
                    const data = { type: "card", cardId: compromisso.id };

                    // Attaches the closest edge (top or bottom) to the data object
                    // This data will be used to determine where to drop card relative
                    // to the target card.
                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ["top", "bottom"],
                    });
                },
                getIsSticky: () => true, // To make a drop target "sticky"
                onDragEnter: (args) => {
                    if (args.source.data.cardId !== compromisso.id) {
                        console.log("onDragEnter", args);
                    }
                },
            })
        );
    }, [compromisso]);

    return (
        <>
            <div ref={cardRef} onClick={() => onOpen(compromisso)} className={`flex pointer cardActionContainer ${isDragging ? "dragging" : ""}`}>
                <div className="cardActionTitle">
                    {compromisso.titulo}
                </div>
                <div className="cardActionHour">
                    {compromisso.horario}
                </div>
            </div>
        </>
    )
}