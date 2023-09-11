import React, { useContext } from 'react'
import { RickyMortyContext } from '../context/RickyMortyContext'

const LocationInfo = () => {
  const {location} = useContext(RickyMortyContext)

  return (
    <>
      <article className='article'>
        <div className="article__info">
          <h2 className='article__title'>{location?.name}</h2>
          <ul className="article__list">
            <li className='article__item'><span className='article__descrip'>Type: </span><span>{location?.type}</span></li>
            <li className='article__item'><span className='article__descrip'>Dimension: </span><span>{location?.dimension || 'unknown'}</span></li>
            <li className='article__item'><span className='article__descrip'>Population: </span><span>{location?.residents.length}</span></li>
          </ul>
        </div>
      </article>

      {location?.residents.length === 0 &&(
        <h2 className='article__locationName'>No hay nadie en {location?.name}</h2>
      )}
    </>
  )
}

export default LocationInfo