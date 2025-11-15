import SingleCard from "./SingleCard.jsx";
import "./CardContainer.css";
function CardContainer({ CartData, loader }) {
    return (
        <div >
            {!loader ? <div className="card-container">
                {CartData?.map((data, i) => {
                    return (
                        <div key={i} >
                            <SingleCard item={data} />
                        </div>
                    )
                })
}
            </div> : (<div className="loader"></div>)}
        </div>

    )
}

export default CardContainer