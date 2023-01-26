import React from 'react'
import styled from 'styled-components'
import { getDatebyGenre } from '../store'
import { useDispatch } from 'react-redux/es/exports'

const SelectGenres = ({genres,type} ) => {
  const dispatch=useDispatch();
  return (
    <Select className='flex' onChange={(e)=>{
    dispatch(

      getDatebyGenre({genre:e.target.value,type})

    )
    }
    }
    >
        {genres.map((genre)=>{

            return <option value={genre.id} key={genre.id} >{genre.name}</option>

        }

        )}


    </Select>
  )
}

const Select=styled.select`
margin-left: 5rem;
font-size: 1.4rem;
color: white;
background-color: rgba(0,0,0,0.4);

`;

export default SelectGenres