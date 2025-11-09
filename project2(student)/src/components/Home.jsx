import SingleCard from "./SingleCard.jsx";
import "./Home.css";
function Home({ data, cartData, setCartData}) {


  return (
    <div className="card-con">
      <div className="card-container">

        {data?.length > 0 ? (
          data?.map((product, index) => (
            <SingleCard key={index} item={product} cartData={cartData} setCartData={setCartData}
             />
          ))
        ) : (
          <p className="no-data">No products found.</p>
        )}
      </div>
    </div>

  );
}

export default Home;
