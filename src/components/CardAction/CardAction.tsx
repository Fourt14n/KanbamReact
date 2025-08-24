import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import "../global.css";
import "./CardAction.css";
import { useDraggable } from "snapdrag";

interface compromissoDTO {
    id: number,
    titulo: string,
    descricao: string,
    horario: string
}

interface OdeioReact {
    compromisso: compromissoDTO,
    onOpen: (c: compromissoDTO) => void,
    actionsCard: CardActionDTO,
    setActionsCard: Dispatch<SetStateAction<CardActionDTO>>
}
interface CardActionDTO extends Array<{
    id: number,
    titulo: string;
    descricao: string;
    horario: string;
}> { }

export default function CardAction({ compromisso, onOpen, actionsCard, setActionsCard }: OdeioReact) {
    // Isso aqui vai ser a lógica que vai manter o tamanho do card quando tiver sendo arrastado
    // Por padrão ele acabava zuando, por eu estar usando porcentagem
    const cardActionRef = useRef<HTMLDivElement>(null);
    const sizes = {
        width: cardActionRef.current?.getBoundingClientRect().width,
        height: cardActionRef.current?.getBoundingClientRect().height
    }

    const { draggable, isDragging } = useDraggable({
        kind: "compromisso",
        data: { compromisso, actionsCard, setActionsCard },
        move: true,
        onDragStart({ data }) {
            console.log('drag start')
        },
        component: ({ data }) => {
            return (
                <div style={{width: `${sizes.width}px`, height: `${sizes.height}px`}} className={`flex cardActionContainer`}>
                    <div className="cardActionTitle">
                        {compromisso.titulo}
                    </div>
                    <div className="cardActionHour">
                        {compromisso.horario}
                    </div>
                </div>
            )
        }
    });

    return draggable(
        <div ref={cardActionRef} onClick={() => onOpen(compromisso)} className={`flex pointer cardActionContainer`}>
            <div className="cardActionTitle">
                {compromisso.titulo}
            </div>
            <div className="cardActionHour">
                {compromisso.horario}
            </div>
        </div>
    )
}