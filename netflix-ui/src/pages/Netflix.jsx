    import React, { useEffect, useState } from 'react'
    import Navbar from "../pages/Navbar"
    import styled from 'styled-components'
    import backgroundImage from "../assest/home.jpg"
    import Title from "../assest/homeTitle.webp"
    import { FaPlay } from 'react-icons/fa'
    import { AiOutlineInfoCircle } from 'react-icons/ai'
import Player from './Player'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchMovies, getGenres } from '../store'
import Slider from './Slider'
import { firebaseAuth } from '../utils/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

    const Netflix = () => {
      const dispath = useDispatch();
      const [scrolled, setscrolled] = useState(false);
      const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
      const movies=useSelector((state)=>state.netflix.movies);
      const navigate = useNavigate();
      window.onscroll=()=>{

        setscrolled(window.pageYOffset==='0'?false:true);
        return()=> (window.onscroll=null);
      };
      useEffect(() => {
        
        dispath(getGenres());

      }, [])

      useEffect(()=>{
        if(genresLoaded)dispath(fetchMovies({type:"all"}))
      },[])
      
      console.log(movies);
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
      });

    

      return (
        <Container>

          <Navbar scrolled={scrolled}/>

          <div className="hero">
            <img src={backgroundImage} alt="" />
          </div>

          <div className="container">
            <div className="logo">
          <img src={Title} alt="" />
          </div>
          <div className="buttons flex">


          <button className='flex a-center j-center'
           onClick={()=>navigate("/player")}>
            <FaPlay/> Play
          </button>

          <button className='flex a-center j-center'>
            <AiOutlineInfoCircle/> More Info
          </button>
          </div>

          </div>

          <Slider movies={movies} />

        </Container>
      )
    }

    const Container = styled.div`
    
    .hero{
      position: relative;

      img{
        filter: brightness(60%);
        height: 100vh;
        width: 100vw;
      }
    }
    .container{
  
      position: absolute;
      bottom: 20vh;
      left: 5vw;
      .logo{
        img{
          width: 100%;
          height: 100%;
          

        }
        
      }
      .buttons{
        margin-top: 3rem;
        gap: 2rem;
        button{
          gap: 0.5rem;
          width: 9rem;
          height: 3rem;
          cursor: pointer;
          font-size: 1.3rem;
          border: none;
          :nth-of-type(2){
          background-color: grey;
          color: white;
        }
        }
        


      }
    }
    


    `;



    export default Netflix