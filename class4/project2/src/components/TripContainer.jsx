
import { trip_data } from "../utils/TripData"
import SingleTrip from './SingleTrip.jsx'

function TripContainer({ setMyTripData, myTripData }) {
    return (
        <div className='card-main'>
            <div className="card-container">
                {
                    trip_data?.map((single, index) => {

                        return (<div key={index}><SingleTrip trip={single}
                            setMyTripData={setMyTripData}
                            myTripData={myTripData} /></div>)
                    })
                }
            </div>
        </div>
    )
}

export default TripContainer