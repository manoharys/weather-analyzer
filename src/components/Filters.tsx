import React from "react";
import { locations } from "../weatherAPI";

interface FiltersProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  onFetchData: () => void;
  isLoading?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  selectedLocation,
  setSelectedLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFetchData,
  isLoading = false,
}) => {
  return (
    <div className='filters-section'>
      <div className='filter-group'>
        <label>Location:</label>
        <select
          style={{ color: "black" }}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option
              key={location.name}
              value={location.name}
              style={{ color: "black" }}
            >
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className='filter-group'>
        <label>Date Range:</label>
        <div className='date-inputs'>
          <input
            style={{ color: "black" }}
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>→</span>
          <input
            style={{ color: "black" }}
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={onFetchData}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>
    </div>
  );
};

export default Filters;
