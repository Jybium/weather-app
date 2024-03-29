import React from 'react'

const GetLocationButton = ({handleGeolocationSearch, loading}) => {
  return (
    <button
      onClick={handleGeolocationSearch}
      disabled={loading}
      className="py-1 px-3 w-fit text-sm rounded sm:mt-4 bg-slate-50 text-[#858585]"
    >
      {loading ? "Searching..." : "Use Location"}
    </button>
  );
}

export default GetLocationButton