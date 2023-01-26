import React from 'react'
import CardSlider from './CardSlider';

const Slider = ({movies}) => {
 const getMovieFromRange=(from,to)=>{
  return movies.slice(from,to);
 }  

 
  return (
 

    <div>
      <CardSlider title="Trending Now" data={getMovieFromRange(0,10)} />
      <CardSlider title="New Release" data={getMovieFromRange(10,20)} />
      <CardSlider title="Blockbuster Movies" data={getMovieFromRange(20,30)} />
      <CardSlider title="Popular on Netflix" data={getMovieFromRange(30,40)} />
      <CardSlider title="Action Movies" data={getMovieFromRange(40,50)} />
      <CardSlider title="Epics" data={getMovieFromRange(50,60)} />



    </div>
  )
}

export default Slider