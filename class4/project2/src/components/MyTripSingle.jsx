
import { useState } from "react";
function MyTripSingle({ trip, setMyTripData, myTripData }) {
    const [defaultBtnState, setDefaultBtnState] = useState(true);
    function removeTrip(data) {
        console.log( myTripData.filter((item) => item !== data))
        let filterTripAfterDeletion = myTripData.filter((item) => item !== data);


        setMyTripData(filterTripAfterDeletion)
    }
    return (

        <div className="card">
            <img src={trip.image} alt={trip.name} />
            <div className="card-content">
                <h2>{trip.name}</h2>
                <p>
                    {
                        defaultBtnState ? (<span>{trip.description.substr(0, 100)}</span>) : (<span>{trip.description}</span>)

                    }
                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                        setDefaultBtnState(!defaultBtnState)
                    }}>

                        {
                            defaultBtnState ? ("readmore ...") : ("readless")
                        }
                    </span>
                </p>
                <button onClick={() => {
                    removeTrip(trip)
                }} >Remove Trip {trip.name}

                </button>
            </div>
        </div>
    )
}

export default MyTripSingle