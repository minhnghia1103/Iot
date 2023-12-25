import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const generateData = () => faker.number.int({ min: 0, max: 100 });
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Nghia cho",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
    },
  },
  animation: {
    duration: 800,
  },
  interaction: {
    intersect: false,
    mode: "nearest",
  },
  maintainAspectRatio: false,
};
const generateTimeLabels = (
  interval: number,
  xLabelNumber: number,
  prevLabels?: string[]
) => {
  if (prevLabels?.length == xLabelNumber) {
    prevLabels.shift();
    const date = new Date();
    date.setSeconds(date.getSeconds() + (xLabelNumber - 1) * interval);
    prevLabels.push(date.toLocaleTimeString("en-US", { hour12: false }));
    return prevLabels;
  }
  return Array.from({ length: xLabelNumber }, (_, index) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + index * interval);
    return date.toLocaleTimeString("en-US", { hour12: false });
  });
};

function LineChart({
  width,
  height,
  interval = 2,
  xLabelNumber = 10,
  customOptions,
  datasetOptions = {
    label: "Dataset 1",
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
    tension: 0.3,
  },
}: {
  width: string;
  height: string;
  interval?: number;
  xLabelNumber?: number;
  customOptions?: any;
  datasetOptions?: any;
}) {
  const xLabels = useRef<string[]>(generateTimeLabels(interval, xLabelNumber));
  const yData = useRef<number[]>(Array.from({ length: xLabelNumber }, () => 0));
  const [lineData, setLineData] = useState({
    labels: xLabels.current,
    datasets: [
      {
        data: yData.current,
        ...datasetOptions,
      },
    ],
  });
  const pushData = (newData: number) => {
    if (yData.current.length >= xLabelNumber) {
      yData.current.shift();
    }
    yData.current.push(newData);
  };

  useEffect(() => {
    const intervalUpdateId = setInterval(() => {
      const newData = generateData();
      if (newData) {
        pushData(newData);
        xLabels.current = generateTimeLabels(
          interval,
          xLabelNumber,
          xLabels.current
        );
        setLineData((prev) => {
          return {
            labels: xLabels.current,
            datasets: [
              {
                ...prev.datasets[0],
                data: yData.current,
              },
            ],
          };
        });
      }
    }, 1000 * interval);

    return () => clearInterval(intervalUpdateId);
  }, []);

  return (
    <div style={{ width, height }}>
      <Line
        options={{
          ...options,
          ...customOptions,
          interaction: { ...options.interaction, mode: "index" },
        }}
        data={lineData}
      />
    </div>
  );
}

export default LineChart;
