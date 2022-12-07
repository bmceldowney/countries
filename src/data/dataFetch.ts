/**
 * responsible for fetching the data
 */
export default async () => {
  let response = null;

  response = await fetch("https://restcountries.com/v2/all");
  const json = await response.json();
  if (json.error) throw json.error;

  return json;
};
