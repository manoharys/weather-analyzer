/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

interface ChartProps {
  title: string;
  data: unknown[];
  type: "line" | "bar" | "multi-line";
  chartData?: {
    labels: string[];
    datasets: unknown[];
  };
  optionsOverride?: unknown;
}

const Chart: React.FC<ChartProps> = ({
  title,
  data,
  type,
  chartData,
  optionsOverride,
}) => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
    },
    maintainAspectRatio: false,
    scales: (optionsOverride as { scales?: unknown })?.scales,
  };

  const renderChart = () => {
    if (!chartData) {
      return (
        <div className='chart-placeholder'>
          <p>{title} Chart</p>
          <p>Data: 0 points</p>
        </div>
      );
    }

    if (type === "bar") {
      return (
        <Bar
          style={{ color: "black" }}
          options={options}
          data={chartData as unknown as any}
        />
      );
    }

    return (
      <Line
        style={{ color: "black" }}
        options={options}
        data={chartData as unknown as any}
      />
    );
  };

  return (
    <div className='chart-container'>
      <h3 style={{ color: "black" }}>{title}</h3>
      <p style={{ color: "black" }}>Data: {data.length} points</p>
      <div style={{ height: 300 }}>{renderChart()}</div>
    </div>
  );
};

export default Chart;
