import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import Filters from "../components/Filters";
import { getLocationCoords, fetchHourlyWeather } from "../weatherAPI";

interface DetailedInsightsProps {
  onNavigateToOverview: () => void;
  initialLocation?: string;
  initialStartDate?: string;
  initialEndDate?: string;
}

const METRICS: Array<{
  key: string;
  label: string;
  axisId: "yLeft" | "yRight";
}> = [
  { key: "temperature_2m", label: "Temperature", axisId: "yLeft" },
  { key: "wind_speed_10m", label: "Wind 10m", axisId: "yRight" },
  {
    key: "apparent_temperature",
    label: "Apparent Temperature",
    axisId: "yLeft",
  },
  { key: "precipitation", label: "Precipitation", axisId: "yLeft" },
  { key: "pressure_msl", label: "Pressure", axisId: "yLeft" },
  {
    key: "relative_humidity_2m",
    label: "Relative Humidity",
    axisId: "yLeft",
  },
];

const DetailedInsights: React.FC<DetailedInsightsProps> = ({
  onNavigateToOverview,
  initialLocation = "New York, USA",
  initialStartDate = "2025-01-01",
  initialEndDate = "2025-10-17",
}) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [weatherData, setWeatherData] = useState<{
    hourly?: {
      time: string[];
      temperature_2m?: number[];
      wind_speed_10m?: number[];
      wind_speed_100m?: number[];
      relative_humidity_2m?: number[];
      apparent_temperature?: number[];
      precipitation?: number[];
      pressure_msl?: number[];
    };
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [enabledKeys, setEnabledKeys] = useState<string[]>([
    "temperature_2m",
    "wind_speed_10m",
  ]);

  const toggleMetric = (key: string) => {
    setEnabledKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleFetchData = async () => {
    if (!startDate || !endDate) return;

    const location = getLocationCoords(selectedLocation);
    if (!location) return;

    setIsLoading(true);
    try {
      const data = await fetchHourlyWeather(
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

  // reference : https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
  const getRanHex = (size: number) => {
    const result: string[] = [];
    const hexRef = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];

    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join("");
  };

  const prepareMultiChartData = () => {
    if (!weatherData?.hourly) return undefined;

    console.log("weather Data", weatherData);

    const labels = weatherData.hourly.time.map((date: string) =>
      new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
      })
    );

    const hourly = weatherData.hourly as unknown as Record<string, number[]>;

    const activeMetrics = METRICS.filter((m) => enabledKeys.includes(m.key));

    const datasets = activeMetrics
      .filter((m) => hourly[m.key])
      .map((m, i) => ({
        label: m.label,
        data: hourly[m.key] || [],
        borderColor: i === 0 ? "#3b82f6" : `#${getRanHex(6)}`,
        backgroundColor:
          i === 0 ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.15)",
        yAxisID: m.axisId,
      }));

    return { labels, datasets } as { labels: string[]; datasets: unknown[] };
  };

  return (
    <div className='detailed-insights-page'>
      <header>
        <h1>Detailed Insights</h1>
        <button onClick={onNavigateToOverview}>← Back to Overview</button>
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

      <div
        className='fields-filter'
        style={{ padding: "0 2rem" }}
      >
        <div className='field-checkboxes'>
          {METRICS.map((m) => (
            <label
              key={m.key}
              style={{ color: "black" }}
            >
              <input
                type='checkbox'
                checked={enabledKeys.includes(m.key)}
                onChange={() => toggleMetric(m.key)}
              />
              {m.label}
            </label>
          ))}
        </div>
      </div>

      <div className='chart-section'>
        <Chart
          title='Hourly Details'
          data={weatherData?.hourly?.time || []}
          type='line'
          chartData={prepareMultiChartData()}
        />
      </div>
    </div>
  );
};

export default DetailedInsights;
