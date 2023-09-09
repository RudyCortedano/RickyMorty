import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFech";
import Loader from "../spinner/Loader";
import getRandomNumber from "../utils/getRandomNumber";
import LocationInfo from "./LocationInfo";
import CardCharacters from "./CardCharacters";
import BackgroundHome from "../spinner/BackgroundHome";

const Home = () => {
  const [inputValue, setInputValue] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${
    inputValue || "hola"
  }`;
  const [location, getLocation, hasError, loading] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, [inputValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setInputValue(inputSearch.current.value.trim());
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {hasError ? (
        <h2>❌ Hey! you must provide an id from 1 to 126 😭</h2>
      ) : (
        <>
          <nav className="navbar__init">
            <form onSubmit={handleSubmit}>
              <div className="navbar__input">
                <input
                  className="navbar__style__input"
                  ref={inputSearch}
                  type="text"
                />
              </div>

              {/* <button>Search</button> */}
            </form>
          </nav>

          <LocationInfo location={location} />
          <main className="card__global">
            <div className="card__general__residents">
              {location?.residents.map((residentUrl) => (
                <CardCharacters residentUrl={residentUrl} key={residentUrl} />
              ))}
            </div>
          </main>
          <BackgroundHome />
        </>
      )}
    </div>
  );
};

export default Home;
