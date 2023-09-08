import axios from 'axios'
import { useState } from 'react'

const useFetch = (url) => {
  const [infoApi, setInfoApi] = useState()
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)

  const getApi = () =>{
    setLoading(true)
    axios.get(url)
    .then(res => {
      setInfoApi(res.data)
      setHasError(false)
    })
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
    .finally(() => setLoading(false))
  }

  return [infoApi, getApi, hasError, loading]
}

export default useFetch
