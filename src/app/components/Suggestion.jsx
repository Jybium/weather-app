/**
 * This component renders the retrieve city information for the suggestion box
 * It takes in the "SUGGESTION" props which holds the whole city suggestions based on the information in the input field
 * It also takes in the "hANDLESELECT" props which calls the weather API based on the choice of the user from the click event in each suggested city
 *
 */

import React from "react";

const Suggestion = ({ suggestions, handleSelect }) => {
  return (
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
  );
};

export default Suggestion;
