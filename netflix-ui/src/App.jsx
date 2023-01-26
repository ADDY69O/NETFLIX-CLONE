
import './App.css';
import { Routes, Route } from "react-router-dom";

import Netflix from "./pages/Netflix"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

import {BrowserRouter} from 'react-router-dom' 
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVshows from './pages/TVshows';
import UserLiked from './pages/UserLiked';
function App() {
  return (
    < >
    <BrowserRouter>   
      
    
       
      <Routes>
          <Route path="/" element={<Netflix />}/>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/player" element={<Player />} />
            <Route exact path="/movie" element={<Movies />} />
            <Route exact path="/tv" element={<TVshows />} />
            <Route exact path="/mylist" element={<UserLiked />} />
          
        </Routes>
    
    
        </BrowserRouter>
    
      </>
  );
}

export default App;
