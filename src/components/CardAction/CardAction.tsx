import { useEffect, useRef, useState } from "react";
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
    onOpen: (c: compromissoDTO) => void
}


export default function CardAction({ compromisso, onOpen }: OdeioReact) {
    // Isso aqui vai ser a lógica que vai manter o tamanho do card quando tiver sendo arrastado
    // Por padrão ele acabava zuando, por eu estar usando porcentagem
    const cardActionRef = useRef<HTMLDivElement>(null);
    const sizes = {
        width: cardActionRef.current?.getBoundingClientRect().width,
        height: cardActionRef.current?.getBoundingClientRect().height
    }

    const { draggable, isDragging } = useDraggable({
        kind: "compromisso",
        data: { compromisso },
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