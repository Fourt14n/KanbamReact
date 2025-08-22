import { Icon } from "@iconify/react";
import CardAction from "../CardAction/CardAction";
import "../global.css";
import "./Card.css";
import { useEffect, useState } from "react";
import CriarNovoCompromisso from "../Modals/CriarNovoCompromisso";
import moment from "moment";


interface DayOfWeek {
    day: string,
    isToday: boolean
}

export default function Card({ day, isToday }: DayOfWeek) {


    const [actualDay, setActualDay] = useState({
        backgroundColor: "#E9E9E9"
    });

    const [actionsCard, setActionsCard] = useState([{}]); // As ações vão ser uma lista de objetos vazios

    function VerificaDiaAtual() {
        isToday ? setActualDay({
            backgroundColor: "#BEA0FF"
        }) : false; // Altero o estado do dia atual
    }

    useEffect(() => {
        VerificaDiaAtual();



    }, [actionsCard]);
    return (
        <div style={{ backgroundColor: actualDay.backgroundColor }} className="flex cardContainer">
            <div className="flex cardHeader">
                <p>{day}</p>
                <CriarNovoCompromisso data={moment(day, "DD/MM/YYYY").format("DD/MM/YYYY")} />
            </div>
            <div className="flex cardContent">
                <div>
                    <div className="flex actionsCard">
                    </div>
                </div>
            </div>
        </div>



    )
}