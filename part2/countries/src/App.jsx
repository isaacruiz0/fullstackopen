import { useState, useEffect } from "react";

const CountryItem = ({ country }) => {
  const [showView, setShowView] = useState(false);
  if (showView) {
    return <CountryView country={country} />;
  }
  return (
    <>
      <h5>{country.name.common}</h5>
      <button onClick={() => setShowView(true)}>show</button>
    </>
  );
};
const CountryView = ({ country }) => {
  const [temperature, setTemperature] = useState();
  const initTemperature = () => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`,
    )
      .then((res) => res.json())
      .then((ret) => setTemperature(ret.main.temp - 273));
  };
  useEffect(initTemperature, [country]);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <h3>temperature: {temperature} degrees</h3>
    </>
  );
};
const MatchCountries = ({ countries, match }) => {
  if (!countries || !match) return <h1>Search Country</h1>;
  const matchedCountries = countries.filter((country) =>
    country.name.common.startsWith(match),
  );
  if (matchedCountries.length === 1) {
    return <CountryView country={matchedCountries[0]} />;
  }

  return (
    <>
      {matchedCountries.map((country) => (
        <CountryItem country={country} />
      ))}
    </>
  );
};
const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchedCountry, setSearchedCountry] = useState("");
  const initCountries = () => {
    const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((ret) => setCountries(ret));
  };
  useEffect(initCountries, []);
  return (
    <>
      <label htmlFor="countries">Search Countries </label>
      <input
        id="countries"
        value={searchedCountry}
        onChange={(e) => setSearchedCountry(e.currentTarget.value)}
      />
      <MatchCountries countries={countries} match={searchedCountry} />
    </>
  );
};

export default App;
