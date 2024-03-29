"use client"
import { GrSearch } from "react-icons/gr";


import React from 'react'

const InputBox = ({setCity, city}) => {
  return (
    <div className="relative px-2 py-2 w-full">
      <span className="absolute bottom-4 left-3">
        <GrSearch color="#FFFFFF" size={20} />
      </span>
      <input
        type="text"
        value={city}
        className="w-full px-4 pl-8  py-1 bg-transparent border-b border-white"
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
    </div>
  );
}

export default InputBox