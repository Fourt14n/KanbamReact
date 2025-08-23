import moment from "moment";
import "../global.css";
import ModalCompromisso from "../Modals/ModalCompromisso";
import "./CardAction.css";

interface compromissoDTO {
    id: number,
    titulo: string,
    descricao: string,
    horario: string
}

interface OdeioReact {
    compromissos: CardActionDTO,
    data: string,
    onEdit: (compromisso: compromissoDTO) => void,
    isOpen: boolean,
    onOpen: (c : compromissoDTO) => void,
    onClose: () => void
}

interface CardActionDTO extends Array<{
    id: number,
    titulo: string;
    descricao: string;
    horario: string;
}> { }

export default function CardAction({ compromissos, onEdit, isOpen, onOpen, onClose, data }: OdeioReact) {
    console.log(compromissos)
    return (
        <>
            {compromissos.map(item => {
                return (
                    
                    <div onClick={() => onOpen(item)} className="flex pointer cardActionContainer">
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