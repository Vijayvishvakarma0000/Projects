import SingleCard from "./SingleCard"

function CardContainer() {
    return (
        <div className="card-container">
            <SingleCard />
            {/* Agar hum map method ka use nhi krenge to multiple times single card ko mount krna padega or isse code repeat hojayega. */}
            {/* <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard /> */}

            {/* this is the best way... */}
            {/* {
                [1,2,3,4,5].map((single)=><SingleCard/>)
            } */}
        </div>
    )
}

export default CardContainer