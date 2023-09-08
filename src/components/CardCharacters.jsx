import React, { useEffect } from 'react'
import useFetch from '../hooks/useFech'

const CardCharacters = ({residentUrl}) => {

  const [resident, getResidents] = useFetch(residentUrl);

  useEffect (() => {
    getResidents()
  }, [])
  
  return (
    <article className='card__Resident'>
      <header>
        <img src={resident?.image} alt="" />
        <div>
          <span></span>
          <span>{resident?.status}</span>
        </div>
      </header>
      <section>
        <h3>{resident?.name}</h3>
         <hr />
          <ul>
            <li><span>specie: </span><span>{resident?.species}</span></li>
            <li><span>Origin: </span><span>{resident?.origin.name}</span></li>
            <li><span>Episodes whre appear: </span><span>{resident?.episode.length}</span></li>
          </ul>
      </section>
    </article>
  )
}

export default CardCharacters