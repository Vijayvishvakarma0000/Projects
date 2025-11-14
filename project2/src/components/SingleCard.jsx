import "./SingleCard.css"
function SingleCard({item}) {

    return (
        <div  className="single-card">
            <img src={item?.img} alt={item.name} />
            <h1>{item?.name}</h1>
            <p>{item?.dsc}</p>
            <p className="price">₹{item?.price}</p>
            <button className="btn">Read More</button>
        </div>
    )
}

export default SingleCard