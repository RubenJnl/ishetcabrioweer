
import axios from 'axios'
import { useState, useEffect } from 'react'
import useGlobal from '../../store'
import * as Styles from './styles'

const SunRiseSet = ({
  children
}) => {
  const [dateTime, setDateTime] = useState(new Date())
  const [sunset, setSunset] = useState(false)
  const [sunrise, setSunrise] = useState(false)
  // const [sunrise, setSunrise] = useGlobal(
  //   state => state.sunrise,
  //   actions => actions.setSunrise
  // )
  // const [sunset, setSunset] = useGlobal(
  //   state => state.sunset,
  //   actions => actions.setSunset
  // )
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
    console.log(sunset, sunrise);
    setSunrise(new Date(sunrise * 1000).toString())
    setSunset(new Date(sunset * 1000).toString())
  }


  return (
    <div>
      sunrise : {sunrise}<br />
      sunset : {sunset}<brr />
      {children}
    </div>
  )
}

export default SunRiseSet