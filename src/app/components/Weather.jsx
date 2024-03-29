"use client";

import React, { useState, useEffect } from "react";
import { Atomic_Age } from "next/font/google";
import { GrSearch } from "react-icons/gr";
import { FaTemperatureHigh } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { GiAtSea } from "react-icons/gi";
import { MdOutlineWindPower } from "react-icons/md";
import extractDateTime from "../../services/dateExtractor";
import {Spinner} from "flowbite-react"

const inter = Atomic_Age({ subsets: ["latin"], weight: "400" });

const { day, date, time } = extractDateTime();

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  console.log(suggestions);

  const apiKey = "22ce4cd64e0f27989ae5e8cfb31aa0c4";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const autoCompleteUrl = "https://api.openweathermap.org/data/2.5/find";

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

  const handleGeolocationSearch = async () => {
    try {
      setLoading(true);
      setCity("")
      setSuggestions("")
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

  useEffect(() => {
    if (city.trim() !== "") {
      handleAutocomplete(city);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const handleSelect = (val) => {
    setCity(val);
    handleSearch();
  };

  return (
    <main className="snow w-full h-screen bg-center bg-cover bg-no-repeat text-white">
      <section className="flex items-start justify-between px-4">
        <div className="flex flex-col justify-between content-between h-[80vh]">
          <div className=" grid py-4">
            <p style={inter.style} className="text-white text-2xl ">
              {" "}
              WeatheredUpdate
            </p>

            <button
              onClick={handleGeolocationSearch}
              disabled={loading}
              className="py-1 px-3 w-fit text-sm rounded mt-4 bg-slate-50 text-[#858585]"
            >
              {loading ? "Searching..." : "Use Location"}
            </button>
          </div>

          <div className="flex justify-end gap-4 mt-auto">
            <p className="flex items-center gap-x-2 text-2xl">
              {weatherData?.main?.temp}{" "}
              <span>{weatherData && <TbTemperatureCelsius size={40} />}</span>
            </p>
            <div>
              <p className="text-2xl">
                {weatherData?.name } {weatherData? "," : null} {weatherData?.sys?.country}
              </p>
              <p className="flex gap-3 ml-auto">
                {day} - {date} - {time}
              </p>
            </div>
          </div>
        </div>

        <div className="w-2/5 drop-shadow-md backdrop-blur-md h-screen rounded py-2">
          <div className="relative px-2 py-2 mx-2">
            <span className="absolute bottom-4 left-3">
              <GrSearch color="#FFFFFF" size={20} />
            </span>
            <input
              type="text"
              value={city}
              className="w-full px-4 pl-6 mx-3 py-1 bg-transparent border-b border-white"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
          </div>

          <div className="flex justify-between p-2 w-full">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-3 py-1 w-auto ml-auto text-sm rounded bg-slate-50 text-[#858585]"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <div className="py-3">
            {suggestions.length > 0 ? (
              <ul className="bg-transparent text-white px-4 text-sm ">
                {suggestions.map((suggest, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggest)}
                    className="border-b border-white py-1 cursor-pointer"
                  >
                    {suggest}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No Suggestions Yet</p>
            )}
          </div>
          {error && <p>{error}</p>}
          {loading && (
            <div className="text-center grid justify-center py-2">
              <Spinner color="gray" size="lg" />
            </div>
          )}
          {weatherData && (
            <div className="py-4 px-3">
              <h2 className="text-2xl py-3 tracking-wider" style={inter.style}>
                {weatherData.name}, {weatherData?.sys?.country}
              </h2>
              <div className="py-2 pt-6">
                <p
                  className="text-center text-lg flex gap-x-4 uppercase"
                  style={inter.style}
                >
                  Description: <span>{weatherData.weather[0].description}</span>
                </p>
                <div className="py-1 pt-5 text-sm grid gap-y-6">
                  <p className="flex justify-between items-center">
                    Temp Min:{" "}
                    <span className="flex items-center justify-between gap-1">
                      {" "}
                      {weatherData.main.temp_min}°C{" "}
                      <FaTemperatureHigh
                        color="white"
                        size={18}
                        className="ml-2"
                      />
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Temp Max:{" "}
                    <span className="flex items-center justify-between gap-1">
                      {" "}
                      {weatherData.main.temp_max}°C{" "}
                      <FaTemperatureHigh
                        color="red"
                        size={18}
                        className="ml-2"
                      />
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Humidity:{" "}
                    <span className="flex items-center justify-between gap-1">
                      {" "}
                      {weatherData.main.humidity}%{" "}
                      <WiHumidity color="white" size={18} className="ml-2" />
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Wind Speed:
                    <span className="flex items-center justify-between gap-1">
                      {weatherData.wind.speed} m/s
                      <MdOutlineWindPower
                        color="white"
                        size={18}
                        className="ml-2"
                      />
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Sea Level:
                    <span className="flex items-center justify-between gap-1">
                      {weatherData.main.sea_level} m
                      <GiAtSea color="white" size={18} className="ml-2" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Weather;
