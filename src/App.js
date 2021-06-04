import { useState, useEffect } from 'react'
import { Cards, CountryPicker, Chart } from './components';
import styles from './App.module.css';
import image from './images/covid-logo.jpg';

const App = () => {

  const url = 'https://covid19.mathdro.id/api';
  const [taskData, setTasks] = useState([])
  const [countryData, setCountry] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch data
  const fetchTasks = async (country) => {
    let changeableUrl = url;
    if (country) {
      changeableUrl = `${url}/countries/${country}`
    }
    const res = await fetch(changeableUrl)
    const {confirmed, recovered, deaths, lastUpdate} = await res.json()
    return {confirmed, recovered, deaths, lastUpdate}
  }

  // Change data per country
  const handleCountryChange = async (country) => {
    const data = await fetchTasks(country)
    setCountry({ ...data, country: country })
    console.log(countryData)
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards {...taskData} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart {...countryData} />
    </div>
  )

}

export default App;
