
import { useState, useEffect } from 'react'
import useGlobal from '../../store'
import * as Styles from './styles'

const SunRiseSet = ({
  children,
  timeOnly
}) => {
  const [sunset, setSunset] = useState(false)
  const [sunrise, setSunrise] = useState(false)

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  const sunOptions = {}
  Object.assign(sunOptions, dateOptions, timeOptions)

  const [sunriseEpoch, setSunriseEpoch] = useGlobal(
    state => state.sunriseEpoch,
    actions => actions.setSunriseEpoch
  )
  const [sunsetEpoch, setSunsetEpoch] = useGlobal(
    state => state.sunsetEpoch,
    actions => actions.setSunsetEpoch
  )

  useEffect(() => {
    getSunSetRise(sunriseEpoch, sunsetEpoch)
  },[sunriseEpoch, sunsetEpoch])
  
  const getSunSetRise = (sunrise, sunset) => {
    // console.log(sunset, sunrise);
    setSunrise(new Date(sunrise * 1000).toLocaleDateString('nl-NL', sunOptions))
    setSunset(new Date(sunset * 1000).toLocaleDateString('nl-NL', sunOptions))
  }

  const TimeStr = () => {
    return new Date().toLocaleTimeString('nl-NL', timeOptions)
  }

  const DateStr = () => {
    return new Date().toLocaleDateString('nl-NL', dateOptions)
  }

  const [date, setDate] = useState(DateStr());
  const [time, setTime] = useState(TimeStr());

  useEffect(() => {
    if (timeOnly){
      setTimeout(() => {
        setTime(TimeStr());
      }, 1000)
    }
  }, [time]);
  useEffect(() => {
    if (timeOnly) {
      setTimeout(() => {
        setDate(DateStr());
      }, 60000)
    }
  }, [date])

  if (timeOnly) {
    return (
      <div className='time'>
        {date} - {time}
      </div>
    )
  } else {
    return (
      <>
        { (sunrise && sunset && sunriseEpoch > 200000000) &&
          <>
            {sunrise != 'Invalid Date' && (
              <Styles.Sunrise jsx>
                {sunrise}
              </Styles.Sunrise>
            )}
            {sunset != 'Invalid Date' && (
              <Styles.Sunset jsx>
                {sunset}
              </Styles.Sunset>
            )}
            {children}
          </>
        }
      </>
    )
  }
  
}

export default SunRiseSet