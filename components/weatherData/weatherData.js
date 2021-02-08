
import axios from 'axios'
import { useState, useEffect } from 'react'
import useGlobal from "./../../store";
import * as Styles from './styles'

const WeatherData = ({
  children
}) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather'
  const Key = {appid : 'f5391f493d31e7e6092af03010cd1d07'} 
  
  const [globalState, globalActions] = useGlobal();
  const [sunriseEpoch, setSunriseEpoch] = useGlobal(
    state => state.sunriseEpoch,
    actions => actions.setSunriseEpoch
  )
  const [sunsetEpoch, setSunsetEpoch] = useGlobal(
    state => state.sunsetEpoch,
    actions => actions.setSunsetEpoch
  )
  const [geoData, setGeoData] = useState({"lon": 5.9,"lat": 51.966671})
  const [fromApi, setResponse] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [result, setResult] = useState(false)

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
  const temperature = {
    toMuch : 33,
    good : 19,
    fair : 12,
    discourage : 7
  }
  const resultMessages = {
    toMuch : 'Heerlijk weer maar toch wat aan de warme kant, neem voldoende water mee!',
    good : 'Perfect om open te rijden!',
    fair : 'Goed tot zeer goed weer om open te rijden',
    discourage : 'Prima weer om open te rijden, maar wel kans op een bui.',
    justdont : 'Momenteel is het niet aan te raden om open te gaan rijden!',
    unknown : 'Op dit moment is het slecht te voorspellen'
  }

  const getCabrioConditions = (data) => {
    let condition = 'unknown';

    if (conditionCodes.good.indexOf(data.weather.id) !== -1 ) {
      condition = 'good'
    }

    const temp = data.main.temp
    if ((condition === 'good' || condition === 'fair')){
      if (temp > temperature.toMuch){
        condition = 'toMuch'
      } else if (temp >= temperature.good && temp <= temperature.toMuch){
        // condition don't change
      } else if (temp >= temperature.fair && temp < temperature.good){
        // condition don't change
      } else if (temp >= temperature.discourage && temp < temperature.fair){
        // condition don't change
      } else if (temp <= temperature.discourage ){
        condition = 'discourage'
      }
    } else if ((condition === 'discourage' || condition === 'unknown')) {
      if (temp >= temperature.discourage && temp < temperature.fair){
        condition = 'discourage'
      } else if (temp <= temperature.discourage ){
        condition = 'justdont'
      }
    }

    setResult(resultMessages[condition])

  }

  
  useEffect(() => {
    
    axios.get(`${url}?lat=${geoData.lat}&lon=${geoData.lon}&appid=${Key.appid}&units=metric&lang=nl&v=3`)
    .then((resp) => {
      setResponse(resp)
      if (resp.data.weather){
        if (errorMessage) {
          setErrorMessage(false)
        }
        getCabrioConditions(resp.data)
        console.log(resp.data.sys);
        setSunriseEpoch(resp.data.sys.sunrise)
        setSunsetEpoch(resp.data.sys.sunset)
      } else {
        setErrorMessage('er is helaas iets mis gegaan')
      }
    })
  }, [])

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
    <div>
      <pre>
        <code>
          {fromApi ? syntaxHighlight(fromApi.data) : ''}
        </code>
      </pre>
      {result}
      {errorMessage && (
        <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
      )}
      {children}
    </div>
  )
}

export default WeatherData