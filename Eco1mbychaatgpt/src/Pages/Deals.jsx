import React from 'react'
import HeroBanner from '../DealsSection/HeroBanner'
import SlidingHeroBanner from '../DealsSection/SlidingHeroBanner'
import CountdownTimer from '../DealsSection/CountdownTimer'
import DealsCategories from '../DealsSection/DealsCategories'
import DealsSortingBar from '../DealsSection/DealsSortingBar'
import DealsProductView from '../DealsSection/DealsProductView'
import DealsProductlist from '../DealsSection/DealsProductlist'
import DealSection from '../DealsSection/Dealsection'

function Deals() {
  return (
    <div>
     
      <SlidingHeroBanner/>
      <CountdownTimer endTime="2025-06-05T23:59:59" />
      <DealsCategories/>
      <DealsSortingBar/>
      <DealsProductView/>
      <DealsProductlist/>
      <DealSection/>
    </div>
  )
}

export default Deals