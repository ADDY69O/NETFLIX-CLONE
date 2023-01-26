    import { current } from '@reduxjs/toolkit'
    import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"

import React, { useState } from 'react'
    import styled from 'styled-components'
    import BackgroundImage from "../components/BackgroundImage"
    import Header from "../components/Header"
    import {firebaseAuth} from "../utils/firebase-config"

    import { useNavigate } from 'react-router-dom';

    const Signup = () => {
      const navigate=useNavigate();
      const [showPass, setshowPass] = useState(false);
      const [formValue, setformValue] = useState({
        email:'',
        password:''

      });

      const handleSubmit=async()=>{
        try{
          const {email,password}=formValue;
          await createUserWithEmailAndPassword(firebaseAuth,email,password);
        }catch(err){
          console.log(err);
        }
      };

      onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser)navigate("/");
      })

      return (

        <Container showPass={showPass}>
          <BackgroundImage/>
          <div className="content">
          <Header login/>
          <div className="body flex a-center j-center flex column ">
              <div className="text flex column">
                <h1>Unlimited movies, TV shows and more.</h1>
            
                <h4>Watch anywhere. Cancel anytime.</h4>
                <h6>Ready to watch? Enter your email to create or restart your membership.</h6>
              </div>

                <div className="form">
                    <input type="email" name="email" id="email" placeholder='Email address' value={formValue.email} onChange={(e)=> setformValue({...formValue,[e.target.name]:e.target.value,
                    })} />
                    {showPass && (
                    <input type="password" name="password" id="password"  placeholder='Password' value={formValue.password}
                    onChange={(e)=> setformValue({...formValue,[e.target.name]:e.target.value,
                    })}/>
                    )

    }
                  { !showPass  && (
                    <button  onClick={()=>setshowPass(true)}>Get Started</button>
                  )
                  }
                    </div>
                  <button onClick={handleSubmit}>Sign up</button>
            
            </div>
            </div>
        </Container>
      )
    }

    const Container = styled.div`
    position:relative;
    

    .content{
    position:absolute;
    background-color:rgba(0,0,0,0.5);
    top:0;
    border:none;
    left:0;
    height:100vh;
    width:100vw;
    color:white;
    display:grid;
    grid-template-rows:15vh 85vh;
      .body{
        gap: 1rem;
        .text{
          gap: 1rem;
          text-align: center;
          font-size: 2rem;
          padding: 0 25rem;
        }
        .form{
          display: grid;
          grid-template-columns:${((showPass)=> 
          showPass?"2fr 1fr":"1fr 1fr")};
          width: 60%;
          input{
            color: black;
            border: 1px solid black;
            padding: 1.5rem;
            font-size: 1.2rem;
            &:focus{
              outline: none;
            }
          }


        }

        button{
          padding: 0.5rem 1rem;
          background-color:#e50914;
          cursor: pointer;
          border: none;
          color: white;
          font-size: 1.05rem;
          font-weight: bolder;
          border-radius: 0.2rem;
        }
      }

    }



    `;



    export default Signup