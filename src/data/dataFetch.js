/**
 * responsible for fetching the data
 */
export default async () => {
  let response = null

  response = await fetch('https://restcountries.eu/rest/v2/all')
  const json = response.json()
  if (json.error) throw json.error

  return json
}
