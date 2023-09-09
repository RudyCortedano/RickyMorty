import React, { useEffect } from 'react'
import useFetch from '../hooks/useFech'

const CardCharacters = ({residentUrl}) => {

  const [resident, getResidents] = useFetch(residentUrl);
 
  useEffect (() => {
    getResidents()
  }, [])
  
  return (
    <>    
      <article className='card__resident'>
        <header className='card__header'>
          <img className='card__image' src={resident?.image} alt="" />
          <div className='card__status'>
            <span className={resident?.status}></span>
            <span>{resident?.status}</span>
          </div>
        </header>
        <section>
          <h3 className='card__name'>{resident?.name}</h3>
          <hr />
            <ul className='card__list'>
              <li className='card__item'><span className='card__info'>specie: </span><span>{resident?.species}</span></li>
              <li className='card__item'><span className='card__info'>Origin: </span><span>{resident?.origin.name}</span></li>
              <li className='card__item'><span className='card__info'>Episodes whre appear: </span><span>{resident?.episode.length}</span></li>
            </ul>
        </section>
      </article>    
    </>
  )
}

export default CardCharacters