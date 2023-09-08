import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFech";
import Loader from "../spinner/Loader";
import getRandomNumber from "../utils/getRandomNumber";
import LocationInfo from "./LocationInfo";
import CardCharacters from "./CardCharacters";

const Home = () => {
  const [inputValue, setInputValue] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
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
          <form onSubmit={handleSubmit}>
            <input ref={inputSearch} type="text" />
            {/* <button>Search</button> */}
          </form>
          <LocationInfo location={location} />
          <div className="card__general">
            {location?.residents.map((residentUrl) => (
              <CardCharacters residentUrl={residentUrl} key={residentUrl} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
