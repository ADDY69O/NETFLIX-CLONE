    import React, { useState } from 'react'
    import { BsCheck} from 'react-icons/bs'
    import { BiChevronDown} from 'react-icons/bi'
    import { useNavigate } from 'react-router-dom'
    import styled from 'styled-components'
    import v from "../assest/video.mp4"
    import {IoPlayCircleSharp} from 'react-icons/io5'
    import {RiThumbUpFill,RiThumbDownFill} from 'react-icons/ri'
    import {AiOutlinePlus} from 'react-icons/ai'
import { async } from '@firebase/util'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import axios from 'axios';
import { removeMovieFromLiked } from '../store'
import { useDispatch } from 'react-redux'


    const Card = ({movieData,index,islinked=false}) => {
      const [Hover, setHover] = useState(false)
      const navigate=useNavigate();
      const [email, setemail] = useState(undefined);

        const dispatch=useDispatch();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser){
      setemail(currentUser.email);
    }
    else{
      navigate("/login")
    }
  });

    const addToList=async()=>{
      try {
        await axios.post("http://localhost:5000/api/user/add",{
          email,
          data:movieData});
          console.log("in add to list");
        
      } catch (error) {
          console.log(error);
      }

    }

      return (
        <Container onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>


      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="" />      

        {Hover &&(
          <div className='hover'>
          <div className="image-video-container">

            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" onClick={()=>navigate("/player")} />      
            <video
            src={v} autoPlay loop muted 
            onClick={()=>navigate("/player")}
            />

            </div>
  
    <div className="info-container flex column">

    <h3>{movieData.name}</h3>

    <div className="icons flex j-between">

      <div className='controls flex'>
      <IoPlayCircleSharp
      title='play'
      onClick={()=>navigate("/player")}

      />
      <RiThumbUpFill title='like'/>

      <RiThumbDownFill title='Dislike'/>
    
     

      {islinked ?(


        <BsCheck title='Remove from the List'   onClick={() =>
          dispatch(
            removeMovieFromLiked({ movieId: movieData.id, email })
          )
        } />

        ):(     < AiOutlinePlus title='Add to my List' onClick={addToList} />)}    

       </div>

        <div className="info">

        <BiChevronDown title="More Info"/>


   </div>

        </div>

    <div className="genres flex">
      <ul className="flex">
       {movieData.genres.map(({genre})=>{
        console.log(genre);
        <li>{genre}</li>
       })}
       <li>Fantastic</li>
       <li>Adventure</li>
       <li>Action</li>
      </ul>

        </div>
      
          </div>



          </div>


        )}
        



        </Container>
      )
    }
    const Container = styled.div`
      max-width: 230px;
      height: 100%;
      width: 230px;
      cursor: pointer;
      position: relative;
      img{
        border-radius:0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;
      }

      .hover{
        width: 20rem;
        z-index: 99;
        height: max-content;
        top: -18vh;
        left: 0;
        position: absolute;
        border-radius: 0.3rem;
        box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3s ease-in-out;

        .image-video-container{
          position: relative;
          height: 140px;




          img{
            width: 100%;
            height: 140px;
            object-fit: cover;
            position: absolute;
            z-index: 4;
            top: 0;
            border-radius: 0.3rem;
      
            
          }
          video{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 5;
            position: absolute;
          }
        }
        .info-container{
         gap: 0.5rem;
         padding: 1rem;
        }
        .icons{
          .controls{
            display: flex;
            gap: 1rem;
          }
          svg{
            font-size:2rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
              color: #b8b8b8;
            }
          }

        }

        .genres{
          ul{
            gap: 1rem;
            li{
              padding-right:0.7rem;
              &:first-of-type{
                list-style-type: none;
              }
            }
          }

        }

      }
      


    `;


    export default Card