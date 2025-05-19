"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Ping } from "@/constants/ping";
import Loader from "@/app/component/Loader";
import type { TooltipItem } from 'chart.js';


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params.id;
  const [pings, setPings] = useState<Ping[]>([]);
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    const fetchPings = async () => {
      try {
        const res = await fetch(`/api/project/${projectId}/pings`);
        const data = await res.json();
        setPings(data.pings || []);
        setProjectName(data.project?.name || "");
      } catch (error) {
        console.error("Error fetching pings:", error);
      }
    };

    fetchPings();
  }, [projectId]);

  const chartData = {
    labels: pings.map((ping) => new Date(ping.createdAt).toLocaleTimeString()),
    datasets: [
      {
        label: "Uptime Status",
        data: pings.map((ping) => (ping.status.startsWith("200") ? 1 : 0)),
        borderColor: "#f3da72",
        backgroundColor: "rgba(243, 218, 114, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#ffffff33",
        },
        ticks: {
          color: "#fff",
        },
        title: {
          display: true,
          text: "Time",
          color: "#fff",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          color: "#ffffff33",
        },
        ticks: {
          color: "#fff",
          stepSize: 1,
          callback: function (tickValue: string | number) {
            return tickValue === 1 ? "Up" : "Down";
          },
        },
        min: 0,
        max: 1,
        title: {
          display: true,
          text: "Status",
          color: "#fff",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>)  {
            return context.raw === 1 ? "Up" : "Down";
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center">{projectName}</h1>

        {pings.length > 0 ? (
          <div className="bg-black rounded-lg p-6 w-full min-h-[450px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[500px] w-full">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
