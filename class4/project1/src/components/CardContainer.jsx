import { useState } from "react"
import SingleCard from "./SingleCard"

function CardContainer({ companyName,getDataInApp }) {
    const [containerName, setContainerName] = useState("");
    function cardContainerFunction(data) {
        setContainerName(data)
    }
    return (
        <div>
            <h1 id="card-container-heading">
                Card Container Name: {containerName}</h1>
            <div className="card-container">

                <SingleCard companyName={companyName} getDataInApp={getDataInApp}
                cardContainerFunction={cardContainerFunction} />
            </div>
        </div>
    )
}

export default CardContainer