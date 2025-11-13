import CardContainer from "./CardContainer"
import Navbar from "./Navbar"

function MainContainer({colorTheme, colorChangeTheme,companyName,getDataInApp}) {
    return (
        <div className="main-conatiner">
            <Navbar colorTheme={colorTheme} colorChangeTheme={colorChangeTheme} />
            <CardContainer companyName={companyName} getDataInApp={getDataInApp}/>
        </div>
    )
}

export default MainContainer