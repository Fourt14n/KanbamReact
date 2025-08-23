import { Icon } from "@iconify/react";
import CardAction from "../CardAction/CardAction";
import "../global.css";
import "./Card.css";
import { act, useEffect, useState } from "react";
import CriarNovoCompromisso from "../Modals/ModalCompromisso";
import moment from "moment";


interface DayOfWeek {
    day: string,
    isToday: boolean
}

interface compromissoDTO {
    id: number,
    titulo: string,
    descricao: string,
    horario: string
}

interface CardActionDTO extends Array<{
    id: number,
    titulo: string;
    descricao: string;
    horario: string;
}> { }


export default function Card({ day, isToday }: DayOfWeek) {
    const [actionsCard, setActionsCard] = useState<CardActionDTO>([{ id: 0, titulo: "", descricao: "", horario: "" }]);
    let id = 0;

    function adicionarCompromisso(c: compromissoDTO) {
        c.id = getLastId();
        id = c.id;
        setActionsCard(prev => [...prev, c]);
    }

    function alterarCompromisso(c: compromissoDTO, novasProps?: Partial<typeof actionsCard[0]>) {
        id = c.id;
        setActionsCard(prev => 
            prev.map(compromisso => compromisso.id === id ? { ...compromisso, ...novasProps } : compromisso)
        );
    }

    function excluirCompromisso(c: compromissoDTO) {
        id = c.id;
        setActionsCard(prev => 
            prev.filter(compromisso => compromisso.id !== id)
        );
    }

    const [actualDay, setActualDay] = useState({
        backgroundColor: "#E9E9E9"
    });

    function getLastId() {
        var ids = actionsCard.map(item => item.id);
        var last = Math.max(...ids) + 1;

        return last;

    }

    function VerificaDiaAtual() {
        isToday ? setActualDay({
            backgroundColor: "#BEA0FF"
        }) : false; // Altero o estado do dia atual
    }

    useEffect(() => {
        VerificaDiaAtual();
        console.log(actionsCard);
    }, [actionsCard]);
    return (
        <div style={{ backgroundColor: actualDay.backgroundColor }} className="flex cardContainer">
            <div className="flex cardHeader">
                <p>{day}</p>
                <CriarNovoCompromisso onSave={ id > 0 ? alterarCompromisso : adicionarCompromisso} id={id} data={moment(day, "DD/MM/YYYY").format("DD/MM/YYYY")} />
            </div>
            <div className="flex cardContent">
                <div>
                    <div className="flex actionsCard">
                        <CardAction compromissos={actionsCard.filter(item => item.titulo != undefined)} />
                    </div>
                </div>
            </div>
        </div>
    )
}
