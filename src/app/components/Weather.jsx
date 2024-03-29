"use client";

import React, { useState, useEffect } from "react";
import { Atomic_Age } from "next/font/google";
import Spinner from "./Spinner";
import WeatherInformation from "./WeatherInformation";
import Suggestion from "./Suggestion";
import SearchButton from "./SearchButton";
import InputBox from "./InputBox";
import GetLocationButton from "./GetLocationButton";
import WeatherSummary from "./WeatherSummary";
import Logo from "./Logo";

const inter = Atomic_Age({ subsets: ["latin"], weight: "400" });

const Weather = () => {
  // This state holds the input field data
  const [city, setCity] = useState("");

  // This state holds the result of calling the weather API - Weather data
  const [weatherData, setWeatherData] = useState(null);

  // This state holds the any errors that occurs  due to API calls - Error response
  const [error, setError] = useState(null);

  // This state holds the boolan for keeping track to different API CALL progress state so as to render appropriate component at different stages
  const [loading, setLoading] = useState(false);

  // This state holds the data returned from calling the FIND API to retrieve data corresponding to the user input
  const [suggestions, setSuggestions] = useState([]);

  console.log(suggestions);

  // API DATA - request URL and API KEY
  const apiKey = "22ce4cd64e0f27989ae5e8cfb31aa0c4";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const autoCompleteUrl = "https://api.openweathermap.org/data/2.5/find";

  /*
  // This function makes an API call to retrieve weather information from the OpenWeather API according to what it typed in the input field.
  // It then returns an error or success message
  // On request success, It returns the weather information
  // On request error, It returns an error message
*/

  const handleSearch = async () => {
    try {
      setLoading(true);
      const url = new URL(apiUrl);
      url.searchParams.append("q", city);
      url.searchParams.append("appid", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        throw new Error(data.message || "Error fetching weather data");
      }
    } catch (error) {
      setWeatherData(null);
      setError(error.message || "Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  /*
  // This function makes an API call to retrieve weather information from the OpenWeather API based on the user Geolocation.
  // It is trigerred by pressing the "Use Location" button on the UI
  // It then returns an error or success message
  // On request success, It returns the weather information
  // On request error, It returns an error message
*/

  const handleGeolocationSearch = async () => {
    try {
      setLoading(true);
      setCity("");
      setSuggestions("");
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = new URL(apiUrl);
        url.searchParams.append("lat", latitude);
        url.searchParams.append("lon", longitude);
        url.searchParams.append("appid", apiKey);
        url.searchParams.append("units", "metric");

        const response = await fetch(url.toString());
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
          setError(null);
        } else {
          throw new Error(data.message || "Error fetching weather data");
        }
      });
    } catch (error) {
      setWeatherData(null);
      setError(error.message || "Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  /*
  // This function makes an API call to retrieve location information from the OpenWeather API based on the user input to the input field.
  // It is trigerred by pressing the typing in the input field provided that the text in the input field is greater than 3
  // It then returns an error or success message
  // On request success, It returns a list of cities information
  // On request error, It returns Nothing
*/

  const handleAutocomplete = async (val) => {
    if (val.length < 3) {
      return;
    }
    try {
      const url = new URL(autoCompleteUrl);
      url.searchParams.append("q", val);
      url.searchParams.append("appid", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.list.map((item) => item.name));
      } else {
        throw new Error(data.message || "Error fetching autocomplete data");
      }
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
    }
  };

  /*
  // This function makes an API call to retrieve city information from the OpenWeather API based on the user input.
  // It runs each time the data in the input field changes to return updated suggestions
  // It then returns an error message or success data
*/
  useEffect(() => {
    if (city.trim() !== "") {
      handleAutocomplete(city);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  /*
  // This function makes an API call to retrieve city information from the OpenWeather API based on the user choice from the rendered suggestions.
  // It then returns an error message or success data
*/

  const handleSelect = (val) => {
    setCity(val);
    handleSearch();
  };

  return (
    <main className="snow h-screen bg-center bg-cover bg-no-repeat text-white w-full">
      <section className="sm:flex items-start justify-between px-4 w-full">
        <div className="flex flex-col justify-between content-between sm:h-[80vh]">
          <div className=" sm:grid flex justify-between items-center  py-4">
            <Logo style={inter} />

            <GetLocationButton
              loading={loading}
              handleGeolocationSearch={handleGeolocationSearch}
            />
          </div>

          <WeatherSummary weatherData={weatherData} />
        </div>

        <div className="sm:w-2/5 w-full drop-shadow-md backdrop-blur-md md:h-screen rounded py-2 pt-4 sm:pt-0 mt-4 sm:mt-0">
          <InputBox city={city} setCity={setCity} />
          <SearchButton loading={loading} handleSearch={handleSearch} />

          <Suggestion suggestions={suggestions} handleSelect={handleSelect} />

          {error && <p className="text-red-800 font-semibold text-center">{error}</p>}

          {loading && <Spinner />}

          {weatherData && (
            <WeatherInformation data={weatherData} inter={inter} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Weather;
