import CardContainer from "./CardContainer"
import Navbar from "./Navbar"

function MainContainer({colorTheme, colorChangeTheme}) {
    // console.log(colorTheme,colorSetTheme,colorChangeTheme)
    return (
        <div className="main-conatiner">
            <Navbar colorTheme={colorTheme} colorChangeTheme={colorChangeTheme} />
            <CardContainer />
        </div>
    )
}

export default MainContainer