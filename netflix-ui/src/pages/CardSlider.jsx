  import React, { useRef, useState } from 'react'
  import Card from './Card';
  import styled from 'styled-components';
  import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


  const CardSlider = ({title,data}) => {
    const listRef=useRef();
    const [SliderPosition, setSliderPosition] = useState(0);
  const [showControls, setshowControls] = useState(false);

  const Direction=(d)=>{

    let distance = listRef.current.getBoundingClientRect().x-70;

    if(d=== "left" && SliderPosition >0){
      listRef.current.style.transform=`translateX(${230 + distance}px)`;
      setSliderPosition(SliderPosition-1);
    }

    if(d=== "right" && SliderPosition <4){
      listRef.current.style.transform=`translateX(${-230 + distance}px)`;
      setSliderPosition(SliderPosition+1);
    }


    


  }



  

    return (
      <Container 
      className='flex column'
      onMouseEnter={()=>setshowControls(true)}
      onMouseLeave={()=>setshowControls(false)}
      >
          <h1>{title}</h1>
        <div className="wrapper">
          <div className={`slider-action left
          flex j-center a-center
          ${!showControls?"none":""}
          `}>

          <AiOutlineLeft onClick={()=>Direction("left")} />
          </div >
          <div className='slider flex'  ref={listRef}>
          { 
              data.map((movie,index)=>{
                return <Card key={movie.id} movieData={movie} index={index} />
              })
              
            }
          </div>
          <div className={`slider-action right
          flex j-center a-center
          ${!showControls?"none":""}
          `}>


            <AiOutlineRight  onClick={()=>Direction("right")}/>
          </div>

        </div>

      </Container>
    )
  }
  const Container=styled.div`

  gap: 1rem;
  padding: 2rem 0;
  position: relative;
  h1{
    margin-left: 50px;
  }

  .wrapper{
    .slider{
    width: max-content;
    gap: 1rem;
    transform: translate(0px);
    transition: 0.3s ease-in-out;
    margin-left:50px;


    }
    .slider-action{
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
        transition: 0.3s ease-in-out;
        svg {
          font-size: 2rem;
        }
      
    }
    .left{
      
      left: 0;

    }
    .right{
    
      right: 0;



    }


  }


  .none{
    display: none;
  }

  `;


  export default CardSlider