import { Icon } from "@iconify/react";
import CardAction from "../CardAction/CardAction";
import "../global.css";
import "./Card.css";
import { act, useEffect, useState } from "react";
import ModalCompromisso from "../Modals/ModalCompromisso";
import moment from "moment";
import { useDisclosure } from "@chakra-ui/react";


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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [objCompromisso, setObjCompromisso] = useState<compromissoDTO>({ id: 0, titulo: "", descricao: "", horario: "" });
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [horario, setHorario] = useState("");

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

    function handleOpen(c: compromissoDTO) {
        setObjCompromisso(c);
        onOpen();
    }

    function handleSave(c: compromissoDTO){
        if(c.id > 0)
            alterarCompromisso(c, {titulo, descricao, horario})
        else
            adicionarCompromisso(c);
    }

    function handleClose() {
        id = 0;
        setObjCompromisso({ id: 0, titulo: "", descricao: "", horario: "" });
        setTitulo("");
        setDescricao("");
        setHorario("");
        onClose();
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
        setObjCompromisso({ id: 0, titulo: "", descricao: "", horario: "" });
    }, [actionsCard, onClose]);
    return (
        <div style={{ backgroundColor: actualDay.backgroundColor }} className="flex cardContainer">
            <div className="flex cardHeader">
                <p>{day}</p>
                <Icon onClick={onOpen} className="pointer" icon="mdi:plus-circle" color="black" width={20} />
                <ModalCompromisso
                    onClose={handleClose}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onSave={handleSave}
                    onDelete={() => excluirCompromisso(objCompromisso)}
                    titulo={titulo}
                    setTitulo={setTitulo}
                    horario={horario}
                    setHorario={setHorario}
                    descricao={descricao}
                    setDescricao={setDescricao}
                    objCompromisso={objCompromisso}
                    data={moment(day, "DD/MM/YYYY").format("DD/MM/YYYY")} />
            </div>
            <div className="flex cardContent">
                <div>
                    <div className="flex actionsCard">
                        <CardAction onEdit={handleSave} isOpen={isOpen} onClose={handleClose} onOpen={handleOpen} data={moment(day, "DD/MM/YYYY").format("DD/MM/YYYY")} compromissos={actionsCard.filter(item => item.titulo !== "")} />
                    </div>
                </div>
            </div>
        </div>
    )
}
