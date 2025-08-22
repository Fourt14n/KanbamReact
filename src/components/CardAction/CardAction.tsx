import "../global.css";
import "./CardAction.css";

export default function CardAction(){
    return(
        <div className="flex pointer cardActionContainer">
            <div className="cardActionTitle">
                REUNIÃO COM O JOÃO DA FERDINANDO FERNANDES LTDA
            </div>

            <div className="cardActionHour">
                08:00 - 10:00
            </div>
        </div>
    )
}