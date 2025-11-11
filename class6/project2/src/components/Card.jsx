
function Card({ product }) {
    return (
        <div className="product-card">
            <div className="product-media">
                <img src={product?.image} alt="Img" />
            </div>

            <div className="product-body">
                <h3 className="product-title">{product?.title}</h3>

                <p className="product-desc">{product?.description}</p>

                <div className="product-footer">
                    <div className="price-rating">
                        <div className="price">₹{product?.price}</div>                                            
                        <div> <p className="product-desc">{product?.rating?.rate}</p></div>

                    </div>


                </div>
            </div>
        </div>
    );
}
export default Card;
