import React from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import v from "../assest/video.mp4"
const Player = () => {
    const navigate = useNavigate();
  return (
    <Container>
       
    <video src={v} autoPlay controls className='video'></video>
    <button>
    <BsArrowLeft onClick={()=>navigate("/")}/>
    </button>
    


    </Container>
  )
}
const Container=styled.div`
position: relative;
.video{
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}
button{
    position: absolute;
    top: 5vh;
    left: 6vh;
    cursor: pointer;
    font-size: 3rem;
    border: none;
    background-color: transparent;
    color: white;
    z-index: 1;
}

`;


export default Player