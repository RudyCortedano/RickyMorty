import Autosuggest from "react-autosuggest";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RickyMortyContext } from "../context/RickyMortyContext";

const AutoComplete = () => {
  const { arr, setLocation, value, setValue, handleSubmit, setLoading} =  useContext(RickyMortyContext);
  
  const [dataResident126, setDataResident126] = useState(); // manipulara los 126 arreglos de residents
  const [autosuggestLocation, setAutosuggestLocation] = useState([]);  // sugerencias filtradas al usuario
  
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
  //  sugerencias retornadas
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
        setLoading(true)
        axios
          .get( `https://rickandmortyapi.com/api/location/?name=${suggestion.name}` )        
          .then((res) => {
            setLocation(res.data.results[0])
            setValue("")
          })
          .finally(() => setLoading(false)) 
      }}
    >
      {`${suggestion.id}`}. {`${suggestion.name}`}      
    </div>
  );  
  // ----------------------------------------------------------------------------------//
  //  configuraciones del input
  const onChange = (e, { newValue }) => {
    setValue(newValue);   
  };

  const inputProps = {
    placeholder: "Location name",
    value,
    onChange,
  };
  // ----------------------------------------------------------------------------------//
  //  mostrando en el panel de sugerencias las 126 posibles ubicaciones
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${arr}`)
      .then((res) => setDataResident126(res.data));
  }, []);
  // ----------------------------------------------------------------------------------//
  // manipular el panel de sugerencia con el teclado en el caso que
  //  desee usar las flechas y darle buscar con enter.
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
        <div className="navbar__input">         
            <Autosuggest
              suggestions={autosuggestLocation}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={eventEnter}
            />     
          </div>     
      </form>
    </>
  );
};

export default AutoComplete;