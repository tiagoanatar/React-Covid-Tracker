const url = 'https://covid19.mathdro.id/api'

// Get daily data for the US
export const fetchUSAData = async () => {

    let changeableUrl = 'https://covid19.mathdro.id/api/daily'

    const res = await fetch(changeableUrl)
    const data = await res.json()

    return data.map(({ totalConfirmed, totalRecovered, deaths, reportDate }) =>
    ({ confirmed: totalConfirmed, recovered: totalRecovered, deaths: deaths.total, date: reportDate }))

  }

// Get country list from API
export const fetchCountries = async () => {

  let changeableUrl = `${url}/countries`

  const res = await fetch(changeableUrl)
  const { countries } = await res.json()

  return countries.map((country) => country.name);
}
