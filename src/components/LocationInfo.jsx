import React from 'react'

const LocationInfo = ({location}) => {
 
  return (
    <>
      <article className='article'>
        <div className="article__info">
          <h2 className='article__title'>{location?.name}</h2>
          <ul className="article__list">
            <li><span>Type: </span><span>{location?.type}</span></li>
            <li><span>Dimension: </span><span>{location?.dimension || 'unknown'}</span></li>
            <li><span>Population: </span><span>{location?.residents.length}</span></li>
          </ul>
        </div>
      </article>
    </>
  )
}

export default LocationInfo