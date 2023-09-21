import React from 'react'
import CategorySection from '../../components/categorySection/CategorySection'
import HeroCurusal from '../../components/carousel/HeroCarousel'
// import ElectronicsCarousel from '../../components/ElectronicsCarousel'
import Carousel from '../../components/carousel/Carousel'
import { electronicsData } from '../../assests/electronicData'
import {beauty_food} from '../../productCategoryData'

function Home() {
  return (
    <div>
      <CategorySection/>
      <HeroCurusal/>
      <Carousel categoryFor='Best of Electronics' data={electronicsData}/>
      <Carousel categoryFor='Beauty, Food, Toys & more' data={beauty_food}/>
      <Carousel categoryFor='Best Quality' data={electronicsData}/>
      <Carousel categoryFor='Top Rated' data={electronicsData}/>
      <Carousel categoryFor='Home & Kitchen Essentials' data={electronicsData}/>
      <Carousel categoryFor='Monsoon Essentials' data={electronicsData}/>
      <Carousel categoryFor='Sports, Healthcare & more' data={electronicsData}/>
      <Carousel categoryFor='Discounts category for You' data={electronicsData}/>
      <Carousel categoryFor='Pick Your Styles' data={electronicsData}/>
      <Carousel categoryFor='Get Set category for Sportsdata' data={electronicsData}/>
    </div>
  )
}

export default Home
