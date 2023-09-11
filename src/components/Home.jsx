import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFech";
import Loader from "../spinner/Loader";
import getRandomNumber from "../utils/getRandomNumber";
import LocationInfo from "./LocationInfo";
import CardCharacters from "./CardCharacters";
import BackgroundHome from "../spinner/BackgroundHome";
import PaginationResidents from "./PaginationResidents";
import HasError from "./HasError";
import { RickyMortyContext } from "../context/RickyMortyContext";
import AutoComplete from "./AutoComplete";

const Home = () => {
  const {location, loading,hasError} = useContext(RickyMortyContext)
  // -----------------------------------------------------------------------------------------//
  // Paginacion
  const itemsPerPage = 8; // card por pagina
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

 //currentItems: cortes por pagina
  const currentItems = location?.residents.slice(itemOffset, endOffset);  
  // pageCount: pagina extra en caso que quede una card sola
  const pageCount = Math.ceil(location?.residents.length / itemsPerPage); 

  const handleChange = (event, value) => {
    const value2 = value - 1;
    const newOffset = value2 * itemsPerPage;

    setItemOffset(newOffset);
  };
  // -----------------------------------------------------------------------------------------//
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {hasError ? (
        <HasError/>
      ) : (
        <>
          <nav className="navbar__init">
            <div className="navbar__logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png" alt="logo" />
            </div>        
              <AutoComplete/>              
          </nav>

          <LocationInfo  />

          <main className="card__global">
            <div className="card__general__residents">
              {currentItems?.map((residentUrl) => (
                <CardCharacters residentUrl={residentUrl} key={residentUrl} />
              ))}
            </div>
          </main>
          <BackgroundHome />
          {
            location.residents.length >  itemsPerPage &&(
              <PaginationResidents 
              pageCount={pageCount}
              handleChange={handleChange}
            />
            )
          }     
        </>
      )}
    </div>
  );
};

export default Home;
