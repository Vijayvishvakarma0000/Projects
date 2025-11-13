import MyTripSingle from "./MyTripSingle"


export default function AllTrip({ myTripData, setMyTripData }) {
    console.log("mytrip", myTripData)
    return (
        <div className="trips-wrapper">
            <div className="Tr-main">
                {myTripData?.length <= 0 ? (
                    <div className="empty-state">
                        <p>No Trip Found in My Trip Cart</p>
                    </div>
                ) : (
                    <div className="card-container">
                        {myTripData?.map((data, index) => (
                            <div key={index} className="trip-card">
                                <MyTripSingle trip={data} setMyTripData={setMyTripData} myTripData={myTripData} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}
