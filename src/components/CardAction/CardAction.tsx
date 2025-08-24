import "../global.css";
import "./CardAction.css";

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
    return (
        <>
            <div onClick={() => onOpen(compromisso)} className={`flex pointer cardActionContainer`}>
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