      import React, { useState } from 'react'
      import { Link, Navigate, useNavigate } from 'react-router-dom'
      import styled from 'styled-components'
      import logo from "../assest/logo.png"
      import {FiSearch} from "react-icons/fi"
      import {FaPowerOff, FaSignOutAlt} from "react-icons/fa"
      import { firebaseAuth } from "../utils/firebase-config";
    import { onAuthStateChanged, signOut } from 'firebase/auth'
      const Navbar = ({scrolled}) => {
        const Navigate=useNavigate();

        const links=[
          {name:"Home",link:"/"},
          {name:"TV Shows",link:"/tv"},
          {name:"Movies",link:"/movie"},
          {name:"My Lists",link:"/mylist"}

        ]
        onAuthStateChanged(firebaseAuth, (currentUser) => {
          if (!currentUser) Navigate("/login");
        });
      
        const [showSearch, setshowSearch] = useState(false); 
        const [inputHover, setinputHover] = useState(false);

        return (


          <Container >
            <nav className={`main ${scrolled ? "scrolled":""} flex a-center j-between`}>



            <nav className="left a-center flex ">

              <div className="brand flex a-center" onClick={()=> Navigate("/")} >

                <img src={logo} alt="logo"  />

              </div>

              <ul className='flex a-center link '>
              {
                links.map(({name,link})=>{
                  return(
                  <li key={name}><Link to={link}>{name}</Link></li>
                  );
                })
              }

              </ul>



            </nav>

              <nav className="right a-center flex">
                <div className={`search ${showSearch?"show-search":""}`}>

                <button 
                onFocus={()=>setshowSearch(true)}
                onBlur={()=>{
                  if(!inputHover){
                    setinputHover(false);
                  }
                }
                }
                >
                <FiSearch  />
                </button>
                <input type="text"  placeholder='search'
                onMouseEnter={()=>setinputHover(true)}
                onMouseLeave={()=>setinputHover(false)}
                onBlur={()=>{
                  setinputHover(false);
                  setshowSearch(false);
                }}
                  
                />
              
                </div>
                <button onClick={()=>signOut(firebaseAuth)}>
                <FaPowerOff />
                </button>
              

                </nav>

            
              
              
              
          </nav>


          </Container>
        )
      }

      const Container=styled.div`
      .scrolled{
        background-color: black;

      }
      .brand{
        cursor: pointer;
      }
      .main{
        position: sticky;
      top: 0;
      height: 5rem;
      width: 100%;
      justify-content: space-between;
      position: fixed;
      top: 0;
      z-index: 2;
      padding: 0 4rem;
      align-items: center;
      transition: 0.3s ease-in-out;


      

        padding: 0 4rem;
      color: white;
      align-items: center;
      transition: 0.3s ease-in-out;
      //left part of the navabr
      .left{
      gap:2rem;
        .brand{
          img{
        height:4rem;
      }

        }

      .link{
        gap: 2rem;
        list-style-type: none;
        li{
          a{
            text-decoration: none;
            color: white;
          }
        }

      }
    }

    //right part of the navbar 

    .right{
      gap: 1rem;

        button{

          background-color: transparent;
        cursor: pointer;
        border: none;
        padding: 0.25rem;
          &:focus{
            outline: none;
          }
          svg{
          color: red;
            font-size:1.25rem;
          }

      }
      .search{
        display: flex;
        justify-content: center;
        padding: 0.2rem;
          padding-left: 0.5rem;
        button{
          background-color: transparent;
          border: none;
          
          svg{
            color:white;
            
          }
          &:focus{
            outline: none;
          }
        }

        input{
          width: 0;
          opacity: 0;
          transition: 0.3s ease-in-out;
          font-size: 1rem;
          visibility: hidden;
          border: none;
          color: white;
          
          background-color: rgba(0,0,0,0.6);

            &:focus{
            outline: none;
          }
        }

      } 

      .show-search{
      
        border: 1px solid white;
        background-color: rgba(0,0,0,0.6);
        
        input{
          width: 100%;
          visibility: visible;
          background-color: rgba(0,0,0,0.6);
          padding: 0.3rem;
          opacity: 1;

        }

      }

    }
    }







      `;

      export default Navbar