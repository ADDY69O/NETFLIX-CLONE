            import React, { useEffect, useState } from 'react'
            import Slider from './Slider';
            import styled from 'styled-components'
            import { useDispatch, useSelector } from 'react-redux';
            import { useNavigate } from 'react-router-dom';
            import { fetchMovies, getGenres } from '../store';
            import Navbar from './Navbar';
        import SelectGenres from './SelectGenres';
        import NON from './NON';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
            function Movies() {
                const dispath = useDispatch();
                const [scrolled, setscrolled] = useState(false);
                const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
                const genres=useSelector((state)=>state.netflix.genres);
                const movies=useSelector((state)=>state.netflix.movies);
                const navigate = useNavigate();
                window.onscroll=()=>{

                setscrolled(window.pageYOffset==='0'?false:true);
                return()=> (window.onscroll=null);
                };
                useEffect(() => {
                
                dispath(getGenres());

                }, [])

                
  const [user, setUser] = useState(undefined);
                useEffect(()=>{
                if(genresLoaded)dispath(fetchMovies({type:"movie"}))
                },[genresLoaded])
                
                console.log(movies);
                onAuthStateChanged(firebaseAuth, (currentUser) => {
                    if (currentUser) setUser(currentUser.uid);
                    else navigate("/login");
                  });

            return (
                <Container>
                <div className="navbar">
                    <Navbar scrolled={scrolled}/>
                    </div>        


                <div className="data">
                <SelectGenres genres={genres} type="movie"/>
                    
            {movies.length? <Slider movies={movies} />:<NON/>}
                    </div> 

                </Container>
            )
            }
            const Container=styled.div`
                margin-top: 8rem;

            `;


            export default Movies