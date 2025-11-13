import React, { useState } from 'react'
  import { toast } from 'react-toastify';

function SingleTrip({ trip, setMyTripData, myTripData }) {
  // console.log()


  const [defaultBtnState, setDefaultBtnState] = useState(true);
  function AddTrip(data) {
    // console.log(data)
    // myTripData=data;
    // step 1 pahle check karo jo card ya trip array me dali hai dubara use nhi dalana hai nmytRip vale me nhi dakna hai
    let isExistTrip = myTripData.some((item) => item === data);
    if (isExistTrip) {
      toast.warning("trip already in my trip cart")
      return;
    }

    // step 2 agar jo data aa rha hai or my trip me nhi hai use dal so mytrip array me


    // myTripData=myTripData.filter((item)=>item!=data)
    setMyTripData([...myTripData, data])
    // console.log(myTripData)
      toast.success("trip added into my trip cart")
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
        <button onClick={() => AddTrip(trip)}>Add Trip {trip.name}
          
        </button>
      </div>
    </div>
  )
}

export default SingleTrip