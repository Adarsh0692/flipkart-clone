import React from 'react'
import CategorySection from '../../components/categorySection/CategorySection'
import HeroCurusal from '../../components/carousel/HeroCarousel'
import Carousel from '../../components/carousel/Carousel'
import { electronicsData } from '../../assests/electronicData'
import {beauty_food, bestOfElectronics, homeAndKitchen, monsoon, pickYorStyle, sportHealth} from '../../productCategoryData'

function Home() {
  return (
    <div>
      <CategorySection/>
      <HeroCurusal/>
      <Carousel categoryFor='Best of Electronics' data={bestOfElectronics}/>
      <Carousel categoryFor='Beauty, Food, Toys & more' data={beauty_food}/>
      <Carousel categoryFor='Pick Your Styles' data={pickYorStyle}/>
      {/* <Carousel categoryFor='Best Quality' data={electronicsData}/> */}
      {/* <Carousel categoryFor='Top Rated' data={electronicsData}/> */}
      <Carousel categoryFor='Home & Kitchen Essentials' data={homeAndKitchen}/>
      <Carousel categoryFor='Monsoon Essentials' data={monsoon}/>
      <Carousel categoryFor='Sports, Healthcare & more' data={sportHealth}/>
      <Carousel categoryFor='Discounts category for You' data={electronicsData}/>

      <Carousel categoryFor='Get Set category for Sportsdata' data={electronicsData}/>
    </div>
  )
}

export default Home
