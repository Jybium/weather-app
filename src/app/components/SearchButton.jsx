import React from 'react'

const SearchButton = ({loading, handleSearch}) => {
  return (
    <div className="flex justify-between p-2 w-full">
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-3 py-1 w-auto ml-auto text-sm rounded bg-slate-50 text-[#858585]"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchButton