import Card from "./components/Card/Card";
import moment from "moment/min/moment-with-locales";
import "./App.css";
import { Heading } from "@chakra-ui/react"


function getSemanaAtual() {
    const inicioSemana = moment().startOf("isoWeek");
    const dias = [];

    for (let i = 0; i < 7; i++) {
        var dia = inicioSemana.clone().add(i, "days").format("dddd, DD/MM/YYYY");
        dia = dia.charAt(0).toUpperCase() + dia.slice(1);
        dias.push(dia);
        console.log(dias);
    }

    return dias;
}

export default function App() {
    let semanaAtual = getSemanaAtual();
    return (
        <section className="flex container">
            <div className="flex title">
                <Heading>Compromissos</Heading>
            </div>
            <div className="flex cardsContainer">
                {
                    semanaAtual.map(dia => {
                        return (
                            <Card cardId={semanaAtual.indexOf(dia)} key={semanaAtual.indexOf(dia)} day={dia} isToday={moment().isSame(moment(dia, "DD/MM/YYYY"), 'day')} />
                        )
                    })
                }
            </div>
        </section>
    )
}