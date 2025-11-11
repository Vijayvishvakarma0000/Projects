import { useState } from "react"
import "./SingleCard.css"

function SingleCard({ item, cartData, setCartData }) {
  const [readmore, setReadmore] = useState(true)

  // const [isItemadded, setItemAdded] = useState(false)

  function removeFromCard(data) {
    const filterData = cartData.filter((item) => item.id !== data.id)
    setCartData(filterData)
    // setItemAdded(false)

  }

  function addToCart(data) {
    console.log(data)
    const isExist = cartData?.some((item) => item === data);

    if (isExist) {
      return;
    }
    setCartData([...cartData, data])
    // setItemAdded(true)

  }

  let isTrue=cartData.some(it1=>it1===item);

  return (
    <div>
      <div className="card">
        <img src={item.image} alt={item.title} className="card-img" />

        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
          <p className="card-desc">

            {readmore ?
              (<span>
                {item?.description?.substr(0, 60)} &nbsp;
                <b style={{ color: "blue" }} onClick={() => setReadmore(false)}>readmore</b>
              </span>) :
              <span>
                {item?.description}
                <b style={{ color: "blue" }} onClick={() => setReadmore(true)}>readless</b>
              </span>}

          </p>

          <p className="card-category">{item.category}</p>

          <div className="card-footer">
            <span className="price">${item.price}</span>
            <span className="rating">⭐ {item.rating.rate} ({item.rating.count})</span>
          </div>
          {
            isTrue ?
              <button className="btn" onClick={() => { removeFromCard(item) }}>Remove From Cart</button> :
              <button className="btn" onClick={() => { addToCart(item) }}>Add to Cart</button>
          }

        </div>
      </div>
    </div>
  )
}

export default SingleCard