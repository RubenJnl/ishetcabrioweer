import useGlobal from "../store";

import Head from 'next/head'
import styles from '../styles/page.module.css'

import PageHeader from '../components/pageHeader'
import WeatherData from '../components/weatherData'
import SunRiseSet from '../components/sunRiseSet'


export default function Home() {

  const [sunriseEpoch, setSunriseEpoch] = useGlobal(
    state => state.sunriseEpoch,
    actions => actions.setSunriseEpoch
  );
  const [sunsetEpoch, setSunsetEpoch] = useGlobal(
    state => state.sunsetEpoch,
    actions => actions.setSunsetEpoch
  );

  return (
    <>
      <Head>
        <title>Is het cabrio weer?</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
        <meta name="description" content="Geeft een indicatie op basis van weersverwachting of het prettig rijden is met het dak open."></meta>

        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5c5b2b" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff"></meta>

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-16618146-5"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'UA-16618146-5')`}}>
        </script>
      </Head>
      <PageHeader>

        <h1>Is het cabrio weer?</h1>

        <SunRiseSet timeOnly />
      </PageHeader>
      <div className={styles.container}>

        <main>
          <WeatherData />

          <SunRiseSet />
        </main>
      </div>

      <footer className="footer">
        <ul className="links">
          <li>
            <a href="https://ishetalmotorweer.nl" rel="noopener" target="_blank">ishetalmotorweer.nl</a> 
          </li>
          <li>
            <a href="https://kwartoverbier.nl" rel="noopener" target="_blank">kwartoverbier.nl</a> 
          </li>
          <li>
            <a href="https://ishetborreltijd.nl" rel="noopener" target="_blank">ishetborreltijd.nl</a>
          </li>
        </ul>
      </footer>
      
    </>
  )
}
