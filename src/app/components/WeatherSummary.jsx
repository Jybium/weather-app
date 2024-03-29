/**
 * This component renders the retrieve weather information in summary
 * It takes in the "WEATHERDATA" props which holds the whole weather information
 *
 */

import React from "react";
import extractDateTime from "@/services/dateExtractor";
import { TbTemperatureCelsius } from "react-icons/tb";

const { day, date, time } = extractDateTime();

const WeatherSummary = ({ weatherData }) => {
  return (
    <div className="flex justify-end gap-4 mt-auto pt-4 sm:pt-0">
      <p className="flex items-center gap-x-2 text-2xl">
        {weatherData?.main?.temp}{" "}
        <span>{weatherData && <TbTemperatureCelsius size={40} />}</span>
      </p>
      <div>
        <p className="text-2xl">
          {weatherData?.name} {weatherData ? "," : null}{" "}
          {weatherData?.sys?.country}
        </p>
        <p className="flex gap-3 ml-auto">
          {day} - {date} - {time}
        </p>
      </div>
    </div>
  );
};

export default WeatherSummary;
