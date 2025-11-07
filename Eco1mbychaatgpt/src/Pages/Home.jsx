import React from 'react'
import HeroSection from '../Homesection/HeroSection'
import FeaturedCategories from '../Homesection/FeaturedCategories'
import FeaturedProducts from '../Homesection/FeaturedProducts'
import NewArrivals from '../Homesection/NewArrivals'
import FeaturesSection from '../Homesection/FeaturesSection'
import Testimonials from '../Homesection/Testimonials'
import AboutPreview from '../Homesection/AboutPreview'
import NewsletterSignup from '../Homesection/NewsletterSignup'

function Home() {
  return (
    <div>
<HeroSection/>
<FeaturedCategories/>
<FeaturedProducts/>
<NewArrivals/>
<FeaturesSection/>
<Testimonials/>
<AboutPreview/>
<NewsletterSignup/>


    </div>
  )
}

export default Home