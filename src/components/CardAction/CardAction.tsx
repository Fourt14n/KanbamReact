import "../global.css";
import "./CardAction.css";

interface OdeioReact {
    compromissos: CardActionDTO
}

interface CardActionDTO extends Array<{
    titulo: string;
    descricao: string;
    horario: string;
}> {}

export default function CardAction(compromissos: OdeioReact) {
    console.log("Compromissos")
    console.log(compromissos);
    return (
        <>
            {compromissos.compromissos.map(item => {
                return (
                    <div className="flex pointer cardActionContainer">
                    <div className="cardActionTitle">
                        {item.titulo}
                    </div>
                    <div className="cardActionHour">
                        {item.horario}
                    </div>
                </div>
                )
            })}
        </>
    )
}