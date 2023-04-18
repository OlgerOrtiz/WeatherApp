import React, { useState } from 'react'

const CardWeather = ({ weather, temperature }) => {
    
    const [isCelsius, setIsCelsius] = useState(true)

    const urlIcon = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
    const handleChangeTemperature = () => setIsCelsius(!isCelsius)


    return (
        <article>
            <h1 className='Card__Title--App'>Weather App</h1>
            <h3 className='Card__Title--Location'>{weather?.name}, {weather?.sys.country}</h3>
            <section className='Card__Content'>
                <header className='Card__Content--Header'>
                    <img src={urlIcon} alt="Icon to Temperature" />
                </header>
                <article className='Card__Content--Info'>
                    <h3 className='Card__Weather--Info'>"{weather?.weather[0].description}"</h3>
                    
                    <ul className='Card__List--info'>
                        <li><span>Wind Speed: </span><b>{weather?.wind.speed} m/s</b></li>
                        <li><span>Clouds: </span><b>{weather?.clouds.all} %</b></li>
                        <li><span>Pressure: </span><b>{weather?.main.pressure} hPa</b></li>
                    </ul>
                    
                </article>
            </section>
            <footer className='Card__Footer'>
                <h2 className='Card__Temperature'>
                {
                    isCelsius
                        ? `${temperature?.celsius} °C`
                        : `${temperature?.farenheit} °F`
                }</h2>
                <button className='Card__Button--Temperature' onClick={handleChangeTemperature} >Change to {isCelsius ? '°F ' : '°C '}</button>
            </footer>
        </article>

    )
}

export default CardWeather