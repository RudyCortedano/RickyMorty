import axios from "axios";
import { createContext, useEffect, useState } from "react";
import getRandomNumber from "../utils/getRandomNumber";

export const RickyMortyContext = createContext();

const RickyMortyProvider = (props) => {
  // ------------------------------------------------------------------------------------------------//
  //  Consumo de la api de rickyMorty - ubicaciones
  const [location, setLocation] = useState();
  const [apimorty] = useState(getRandomNumber(126));
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/location/${apimorty}`)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }, []);
  // ------------------------------------------------------------------------------------------------//
  // logica del autocompletado
  const [value, setValue] = useState("");

  //  arreglo para obtener las 126 posibles sugerencias, con el enpoints de ubicacion normal solo te
  //  brindara 20 ubicaciones
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,
  ];

  const search = () => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/location/?name=${value}`)
      .then((res) => {
        setLocation(res.data.results[0]);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    search();
    setValue("")
  };

  // ------------------------------------------------------------------------------------------------//
  return (
    <RickyMortyContext.Provider
      value={{
        // componente-Home y LocationInfo
        location,
        loading,
        hasError,
        // componente-AutoComplete
        setLocation,
        setLoading,
        value,
        setValue,
        handleSubmit,
        arr,
      }}
    >
      {props.children}
    </RickyMortyContext.Provider>
  );
};

export default RickyMortyProvider;