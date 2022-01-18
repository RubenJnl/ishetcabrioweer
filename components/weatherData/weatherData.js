
import axios from 'axios'
import { useState, useEffect } from 'react'
import useGlobal from "./../../store";
import * as Styles from './styles'

const WeatherData = ({
  children
}) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather'
  const Key = {appid : 'f5391f493d31e7e6092af03010cd1d07'} 
  
  const [sunriseEpoch, setSunriseEpoch] = useGlobal(
    state => state.sunriseEpoch,
    actions => actions.setSunriseEpoch
  )
  const [sunsetEpoch, setSunsetEpoch] = useGlobal(
    state => state.sunsetEpoch,
    actions => actions.setSunsetEpoch
  )

  const [geoData, setGeoData] = useState(false)
  const [fromApi, setResponse] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [result, setResult] = useState(false)
  const [temperature, setTemperature] = useState(false)
  const [feelsLike, setFeelsLike] = useState(false)
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { // success
          setGeoData({'lon': position.coords.longitude, 'lat': position.coords.latitude})
        }, () => { // error
          setGeoData({"lon": 5.17,"lat": 52.10})
        })
    } else {
      setGeoData({"lon": 5.17,"lat": 52.10})
    }
  }, [])

  useEffect(() => {
    if (geoData !== false){
      prepareGetData()
    }
  }, [geoData])
  

  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  const conditionCodes = {
    good : [
      800, // Clear
      801, // Clouds; few clouds: 11-25%
      802, // Clouds; cattered clouds: 25-50%
    ],
    fair : [
      803, // Clouds; broken clouds: 51-84%
      804, // Clouds; overcast clouds: 85-100%
      
    ],
    discourage : [
      500, // Rain; light rain
      300, // Drizzle; light intensity drizzle
      310, // Drizzle; light intensity drizzle rain
    ]
  }
  const temperatureObj = {
    toMuch : 33,
    good : 19,
    fair : 12,
    discourage : 7
  }
  const resultMessages = {
    toMuch : 'Heerlijk weer maar toch wat aan de warme kant, neem voldoende water mee!',
    good : 'Perfect om open te rijden!',
    fair : 'Goed tot zeer goed weer om open te rijden!',
    discourage : 'Prima weer om open te rijden, wel kans op een bui',
    justdont : 'Momenteel is het niet aan te raden om open te gaan rijden!',
    unknown : 'Op dit moment is het wellicht niet lekker open rijden.'
  }

  const getCabrioConditions = (data) => {
    let condition = 'unknown'


    const temp = data.main.temp
    if ((condition === 'good' || condition === 'fair')){
      if (temp > temperatureObj.toMuch){
        condition = 'toMuch'
        document.documentElement.style.setProperty("--background-color", '#ffadad')
      } else if (temp >= temperatureObj.good && temp <= temperatureObj.toMuch){
        condition = 'good'
        document.documentElement.style.setProperty("--background-color", '#fdfddd');
      } else if (temp >= temperatureObj.fair && temp < temperatureObj.good){
        condition = 'good'
        document.documentElement.style.setProperty("--background-color", '#fdfddd');
      } else if (temp >= temperatureObj.discourage && temp < temperatureObj.fair){
        condition = 'fair'
        document.documentElement.style.setProperty("--background-color", '#fdfddd');
      } else if (temp <= temperatureObj.discourage ){
        condition = 'discourage'
        document.documentElement.style.setProperty("--background-color", '#d9e2fe')
      }
    } else if ((condition === 'discourage' || condition === 'unknown')) {
      if (temp >= temperatureObj.discourage && temp < temperatureObj.fair){
        condition = 'discourage'
        document.documentElement.style.setProperty("--background-color", '#e9fdeb')
      } else if (temp <= temperatureObj.discourage ){
        condition = 'justdont'
        document.documentElement.style.setProperty("--background-color", '#d9e2fe')
      }
    }

    setResult(resultMessages[condition])

  }

  
  const prepareGetData = () => {
    axios.get(`${url}?lat=${geoData.lat}&lon=${geoData.lon}&appid=${Key.appid}&units=metric&lang=nl&`)
    .then((resp) => {
      setResponse(resp)
      if (resp.data.weather){
        if (errorMessage) {
          setErrorMessage(false)
        }
        setType(resp.data.weather[0].description)
        getCabrioConditions(resp.data)
        setLocation(resp.data.name)
        setSunriseEpoch(resp.data.sys.sunrise)
        setSunsetEpoch(resp.data.sys.sunset)
        setTemperature(resp.data.main.temp)
        setFeelsLike(resp.data.main.feels_like)
      } else {
        setErrorMessage('er is helaas iets mis gegaan')
      }
    })
  }

  const syntaxHighlight = (json) => {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return match;
    });
}

  return (
    <>
    {temperature ?
      <>
        {result}
        <Styles.TemperatureWrapper>
          In {location} is het 
          {temperature && (
            <Styles.Temperature temperature={temperature}> {temperature} °C </Styles.Temperature>
          )}
          , voelt als     
          {feelsLike && (
            <Styles.Temperature temperature={feelsLike}> {feelsLike} °C</Styles.Temperature>
          )}
          <br></br>
          {type && <> En de voorspelling is {type}</>}
        </Styles.TemperatureWrapper>
        {errorMessage && (
          <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
        )}
        {children}
      </>
       :
      <>
        <p>Uw locatiegegevens worden opgevraagd voor het lokale weerbericht.</p>
        <p>Gegevens over het weer ophalen, even geduld aub...</p>
      </>}
    </>
  )
}

export default WeatherData