import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockChart({ stock }) {
  const basePrice = parseInt(stock.price.replace(/₹|,/g, ""));

  const [prices, setPrices] = useState([
    basePrice,
    basePrice + 10,
    basePrice - 5,
    basePrice + 20,
    basePrice + 15,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const last = prev[prev.length - 1];

        const change = Math.floor(Math.random() * 20 - 10);

        const newPrice = last + change;

        return [...prev.slice(1), newPrice];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [stock]);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: stock.name + " Price",
        data: prices,
        borderColor: "blue",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-box">
      <Line data={data} />
    </div>
  );
}

export default StockChart;