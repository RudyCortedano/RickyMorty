import Autosuggest from "react-autosuggest";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RickyMortyContext } from "../context/RickyMortyContext";

const AutoComplete = () => {
  const { arr, setLocation, value, setValue, handleSubmit } =  useContext(RickyMortyContext);
  
  const [dataResident126, setDataResident126] = useState(); // manipulara los 126 arreglos de residents
  const [autosuggestLocation, setAutosuggestLocation] = useState([]);  // sugerencias mostradas
  
  // ----------------------------------------------------------------------------------//
  //  configurarcion para el filtrado de las ubicaciones
  const filterLocation = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue?.length;
    
    let filtrado = dataResident126?.filter((locationDimension) => {
      let textoCompleto = locationDimension.name;
      
      if (
        textoCompleto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .includes(inputValue)
        ) {
          return locationDimension;
        }
    });
    return inputLength === 0 ? [] : filtrado;
  };
  // ----------------------------------------------------------------------------------//
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setAutosuggestLocation(filterLocation(value));
  };

  const onSuggestionsClearRequested = () => {
    setAutosuggestLocation([]);
  };
  const getSuggestionValue = (suggestion) => {
    return `${suggestion.name}`;
  };

  // ----------------------------------------------------------------------------------//
  //  lo que se muestra en el panel de sugerencias
  const renderSuggestion = (suggestion) => (
    <div
      className="sugerencia"
      onClick={() => {
        axios
          .get(
            `https://rickandmortyapi.com/api/location/?name=${suggestion.name}`
          )
          .then((res) => setLocation(res.data.results[0]));
      }}
    >
      {`${suggestion.id}`}. {`${suggestion.name}`}      
    </div>
  );

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  // ----------------------------------------------------------------------------------//
  //  configuraciones del input
  const inputProps = {
    placeholder: "Location name",
    value,
    onChange,
  };
  // ----------------------------------------------------------------------------------//
  //  mostrar en el panel de sugerencias las 126 ubicaciones
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${arr}`)
      .then((res) => setDataResident126(res?.data));
  }, []);
  // ----------------------------------------------------------------------------------//
  // manipular el panel de sugerencia con el boton enter
  const eventEnter = (e) => {
    if (e.key === "Enter") {
      let currentLocation = dataResident126.filter(
        (p) => p.name == e.target.defaultValue.trim()
      );
      setLocation(currentLocation[0]);
    }
  };
  // ----------------------------------------------------------------------------------//

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <div className="unidor"> */}
        <div className="navbar__input">      
          {/* <div className="navbar__style__input"> */}
            <Autosuggest
              suggestions={autosuggestLocation}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={eventEnter}
            />
          {/* </div> */}
          </div>
          {/* <div className="button">
            <button>Search</button>
          </div> */}
        {/* </div> */}
      </form>
    </>
  );
};

export default AutoComplete;
