import React from 'react'
import Image from"../assest/login.jpg";
import styled from 'styled-components'

const BackgroundImage = () => {
  return (
    <Wrapper>
      <img src={Image} alt="" />
    </Wrapper>
  )
}
const Wrapper=styled.div`
width:100vw;
height:100vh;
  img{
    height:100vh;
    width:100vw;
  }


`;


export default BackgroundImage