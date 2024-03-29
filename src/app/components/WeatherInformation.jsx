/**
 * This component renders the retrieve weather information
 * It takes in the "DATA" props which holds the whole weather information
 * It also takes in the "INTER" props which specifies the text styling - font family
 * 
 */

import React from 'react'
import { FaTemperatureHigh } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { GiAtSea } from "react-icons/gi";
import { MdOutlineWindPower } from "react-icons/md";

const WeatherInformation = ({data, inter}) => {

    const weatherData = data
  return (
    <div>
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
                <FaTemperatureHigh color="white" size={18} className="ml-2" />
              </span>
            </p>
            <p className="flex justify-between items-center">
              Temp Max:{" "}
              <span className="flex items-center justify-between gap-1">
                {" "}
                {weatherData.main.temp_max}°C{" "}
                <FaTemperatureHigh color="red" size={18} className="ml-2" />
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
                <MdOutlineWindPower color="white" size={18} className="ml-2" />
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
    </div>
  );
}

export default WeatherInformation