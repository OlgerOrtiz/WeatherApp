
import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import CardWeather from './components/CardWeather'
import Loading from './components/Loading'

function App() {

  const [latLong, setLatLong] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [hasError, setHasError] = useState(false)
  const [handleError, setHandleError] = useState()
  const [weathergb, setWeathergb] = useState()
  const [removeLoading, setRemoveLoading] = useState(false)
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    const success = position => {
      const obj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      setLatLong(obj)
    }
    const error = err => {
      console.log(err);
      setHasError(true)
      setRemoveLoading(true)
      setHandleError(err)
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (latLong) {
        const apiKey = '83bd1e14194bbcbd764e136645bd1c3e'
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${apiKey}`)
          .then(res => {
            const celsius = (res.data.main.temp - 273.15).toFixed(1)
            const farenheit = (celsius * 9 / 5 + 32).toFixed(1)

            setTemperature({ celsius, farenheit })
            setWeather(res.data)
            setWeathergb(res.data.weather[0].main)
            setRemoveLoading(true)
          })
          .catch(err => console.log(err))
      }
    }, 1500)
  }, [latLong])

  const handleCityChange = e => {
    setSearchCity(e.target.value)
  }

  const searchCityWeather = () => {
    const apiKey = '83bd1e14194bbcbd764e136645bd1c3e'
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`)
    .then(res => {
      const celsius = (res.data.main.temp - 273.15).toFixed(1)
      const farenheit = (celsius * 9 / 5 + 32).toFixed(1)
      
      setTemperature({ celsius, farenheit })
      setWeather(res.data)
      setWeathergb(res.data.weather[0].main)
      setRemoveLoading(true)
      setHasError(false)
    })
      .catch(err => console.log(err))
  }

  return (
    <div className="App" id={weathergb}>
      <div className="App__Content--Input">
          <input className='App__Input' type="text" placeholder="Search city" value={searchCity} onChange={handleCityChange} />
          <button onClick={searchCityWeather}>Search</button>
      </div>
      <div className='App__Container--Card'>
        {
          hasError
          ? <ErrorFetch handleError={handleError} />
          : <CardWeather weather={weather} temperature={temperature} />
        }
        {!removeLoading && <Loading />}
      </div>
    </div>
  )
}

export default App
