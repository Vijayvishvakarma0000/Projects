
function SingleCard({ companyName,cardContainerFunction,getDataInApp }) {
    const CardContainerName="Grow Tech vala Card Container"
    cardContainerFunction(CardContainerName);
    getDataInApp("me single card vala data hu")
    return (
        <div className="card-parent">
            <div className="single-card">
                <h1>Beautiful Card</h1>
                <p ><b>Company Name:</b><span id="C-Name">{companyName}</span> </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Curabitur sit amet eros ac justo bibendum tincidunt.</p>
                <button className="btn">Read More</button>
            </div>
        </div>

    )
}

export default SingleCard