import React from 'react'
import CategorySection from '../../components/categorySection/CategorySection'
import HeroCurusal from '../../components/HeroCarousel'
import ElectronicsCarousel from '../../components/ElectronicsCarousel'
import Carousel from '../../components/carousel/Carousel'
import { electronicsData } from '../../assests/electronicData'

function Home() {
  return (
    <div>
      <CategorySection/>
      <HeroCurusal/>
      <Carousel for='Best of Electronics' electronicsData={electronicsData}/>
      <Carousel for='Beauty, Food, Toys & more' electronicsData={electronicsData}/>
      <Carousel for='Best Quality' electronicsData={electronicsData}/>
      <Carousel for='Top Rated' electronicsData={electronicsData}/>
      <Carousel for='Home & Kitchen Essentials' electronicsData={electronicsData}/>
      <Carousel for='Monsoon Essentials' electronicsData={electronicsData}/>
      <Carousel for='Sports, Healthcare & more' electronicsData={electronicsData}/>
      <Carousel for='Discounts for You' electronicsData={electronicsData}/>
      <Carousel for='Pick Your Styles' electronicsData={electronicsData}/>
      <Carousel for='Get Set For Sports' electronicsData={electronicsData}/>
    </div>
  )
}

export default Home
