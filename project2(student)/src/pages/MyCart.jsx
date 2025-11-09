import "../components/Home.css"
import SingleCard from "../components/SingleCard.jsx"
function MyCart({ cartData, setCartData }) {
  console.log("cardData", cartData)
  return (
    <div className="card-con">
      <div className="card-container">

        {cartData && cartData.length > 0 ? (
          cartData?.map((product, index) => (
            <SingleCard key={index} item={product} setCartData={setCartData} cartData={cartData} />
          ))
        ) : (
          <p className="no-data">No products found.</p>
        )}
      </div>
    </div>
  )
}

export default MyCart