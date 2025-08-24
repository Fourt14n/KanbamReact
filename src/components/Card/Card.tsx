import { Icon } from "@iconify/react";
import CardAction from "../CardAction/CardAction";
import "../global.css";
import "./Card.css";
import { useEffect, useRef, useState } from "react";
import ModalCompromisso from "../Modals/ModalCompromisso";
import moment from "moment";
import { useDisclosure } from "@chakra-ui/react";


interface DayOfWeek {
    day: string,
    isToday: boolean,
    cardId: number
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


export default function Card({ day, isToday, cardId }: DayOfWeek) {
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const [objCompromisso, setObjCompromisso] = useState<compromissoDTO>({ id: 0, titulo: "", descricao: "", horario: "" });
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [horario, setHorario] = useState("");
    const [actionsCard, setActionsCard] = useState<CardActionDTO>([{ id: 0, titulo: "", descricao: "", horario: "" }]);

    const cardRef = useRef<HTMLDivElement>(null);
    let idActionCard = 0;

    useEffect(() => {
        setObjCompromisso({ id: 0, titulo: "", descricao: "", horario: "" });
    }, [onClose]);

    // Ações do CRUD
    function adicionarCompromisso(c: compromissoDTO) {
        c.id = getLastId();
        idActionCard = c.id;
        setActionsCard(prev => [...prev, c]);
    }

    function alterarCompromisso(c: compromissoDTO, novasProps?: Partial<typeof actionsCard[0]>) {
        idActionCard = c.id;
        setActionsCard(prev =>
            prev.map(compromisso => compromisso.id === idActionCard ? { ...compromisso, ...novasProps } : compromisso)
        );
    }

    function excluirCompromisso(c: compromissoDTO) {
        idActionCard = c.id;
        setActionsCard(prev =>
            prev.filter(compromisso => compromisso.id !== idActionCard)
        );
    }

    // Handlers diversos
    function handleOpen(c: compromissoDTO) {
        setObjCompromisso(c);
        onOpen();
    }

    function handleSave(c: compromissoDTO) {
        if (c.id > 0)
            alterarCompromisso(c, { titulo, descricao, horario })
        else
            adicionarCompromisso(c);
    }

    function handleClose() {
        idActionCard = 0;
        setObjCompromisso({ id: 0, titulo: "", descricao: "", horario: "" });
        setTitulo("");
        setDescricao("");
        setHorario("");
        onClose();
    }

    function getLastId() {
        var ids = actionsCard.map(item => item.id);
        var last = Math.max(...ids) + 1;
        return last;
    }

    return (
        <div className={`flex cardContainer ${isToday ? "today" : ""}`}>
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
                    <div className="flex actionsCard" ref={cardRef}>
                        {
                            actionsCard.filter(item => item.titulo !== "").map(item => {
                                return (
                                    <CardAction key={item.id} onOpen={handleOpen} compromisso={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
