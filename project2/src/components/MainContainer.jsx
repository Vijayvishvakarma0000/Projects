import CardContainer from "./CardContainer.jsx"
function MainContainer({ colorTheme, colorChangeTheme, CartData, loader, }) {
  return (
    <div>
      <CardContainer CartData={CartData} loader={loader} />
    </div>
  )
}

export default MainContainer