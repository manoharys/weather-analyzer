import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Filters from "../components/Filters";
import { getLocationCoords, fetchDailyWeather } from "../weatherAPI";

interface OverviewProps {
  onNavigateToDetailed: (
    locationName: string,
    startDate: string,
    endDate: string
  ) => void;
}

type DailyResponse = {
  daily: {
    time: string[];
    temperature_2m_mean: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
};

const Overview: React.FC<OverviewProps> = ({ onNavigateToDetailed }) => {
  const [selectedLocation, setSelectedLocation] = useState("New York, USA");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-10-17");
  const [weatherData, setWeatherData] = useState<DailyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchData = async () => {
    if (!startDate || !endDate) return;

    const location = getLocationCoords(selectedLocation);
    if (!location) return;

    setIsLoading(true);
    try {
      const data = await fetchDailyWeather(
        location.lat,
        location.lon,
        startDate,
        endDate
      );
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [selectedLocation]);

  const transformChartData = (type: string) => {
    if (!weatherData?.daily) return undefined;

    const labels: string[] = weatherData.daily.time.map((date: string) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );

    switch (type) {
      case "temperature":
        return {
          labels,
          datasets: [
            { label: "Mean", data: weatherData.daily.temperature_2m_mean },
            { label: "Max", data: weatherData.daily.temperature_2m_max },
            { label: "Min", data: weatherData.daily.temperature_2m_min },
          ],
        };
      case "precipitation":
        return {
          labels,
          datasets: [
            {
              label: "Precipitation",
              data: weatherData.daily.precipitation_sum,
            },
          ],
        };
      case "wind":
        return {
          labels,
          datasets: [
            { label: "Wind Speed", data: weatherData.daily.wind_speed_10m_max },
          ],
        };
      default:
        return undefined;
    }
  };

  return (
    <div className='overview-page'>
      <header>
        <h1>Historical Weather Dashboard</h1>
      </header>

      <Filters
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onFetchData={handleFetchData}
        isLoading={isLoading}
      />

      <div className='charts-section'>
        <div className='chart-grid'>
          <div
            onClick={() =>
              onNavigateToDetailed(selectedLocation, startDate, endDate)
            }
            style={{ cursor: "pointer" }}
          >
            <Chart
              title='Temperature Trends'
              data={weatherData?.daily?.time || []}
              type='line'
              chartData={transformChartData("temperature")}
            />
          </div>
          <div
            onClick={() =>
              onNavigateToDetailed(selectedLocation, startDate, endDate)
            }
            style={{ cursor: "pointer" }}
          >
            <Chart
              title='Precipitation'
              data={weatherData?.daily?.time || []}
              type='bar'
              chartData={transformChartData("precipitation")}
            />
          </div>
          <div
            onClick={() =>
              onNavigateToDetailed(selectedLocation, startDate, endDate)
            }
            style={{ cursor: "pointer" }}
          >
            <Chart
              title='Wind Speed'
              data={weatherData?.daily?.time || []}
              type='line'
              chartData={transformChartData("wind")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
