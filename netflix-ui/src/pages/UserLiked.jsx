        import React from 'react'
        import axios from 'axios';

        import  { useEffect, useState } from 'react'
        import Slider from './Slider';
        import styled from 'styled-components'
        import { useDispatch, useSelector } from 'react-redux';
        import { useNavigate } from 'react-router-dom';
        import { fetchMovies, getGenres, getUserLikedMovies } from '../store';
        import Navbar from './Navbar';
        import SelectGenres from './SelectGenres';
        import NON from './NON';
        import { firebaseAuth } from '../utils/firebase-config';
        import { onAuthStateChanged } from 'firebase/auth';
        import Card from './Card';
        function UserLiked() {
            const dispath = useDispatch();
            const [scrolled, setscrolled] = useState(false);
            
                        const movies=useSelector((state)=>state.netflix.movies);
                        const [email, setEmail] = useState(undefined);
                        const navigate = useNavigate();
                        window.onscroll=()=>{

                        setscrolled(window.pageYOffset==='0'?false:true);
                        return()=> (window.onscroll=null);
                        };

                        onAuthStateChanged(firebaseAuth,(currentUser)=>{
                            if(currentUser)
                            {
                                setEmail(currentUser.email);
                                console.log(email);
                            }
                                else navigate("/login")
                        })
                        useEffect(() => {
                        if(email)  dispath(getUserLikedMovies(email));
                        
                    

                        }, [email])
                    
                    
    


        return (
            <Container>
                <div className="nav">

            <Navbar scrolled={scrolled} />
                </div>

                
            <div className="content">

                <h1>My List </h1>

                <div className=" grid flex">
                    {movies.map((movie,index)=>{
                        return <Card movieData={movie} index={index} key={movie.id} islinked={true}/>
                    })}
                </div>

            </div>





            </Container>
        )
        }

        const Container=styled.div`


            .content{
                margin: 2.3rem;
                margin-top: 8rem;
                h1{
                    margin-left: 3rem;
                }

                .grid{
                    margin-top: 2.4rem;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
            }
            
        `;

        export default UserLiked