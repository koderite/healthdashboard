import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DiagnosisHistory as DiagnosisHistoryType } from "@/lib/api";

interface DiagnosisHistoryProps {
  diagnosisHistory: DiagnosisHistoryType[];
}

export function DiagnosisHistory({ diagnosisHistory }: DiagnosisHistoryProps) {
  const [timeRange] = useState("Last 6 months");

  // Transform API data to chart format
  const chartData = useMemo(() => {
    return diagnosisHistory.map((item) => ({
      month: `${item.month} ${item.year}`,
      systolic: item.blood_pressure.systolic.value,
      diastolic: item.blood_pressure.diastolic.value,
    }));
  }, [diagnosisHistory]);

  // Get the latest reading for legend
  const latestReading = diagnosisHistory[diagnosisHistory.length - 1];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ color: string; name: string; value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="flex sm:flex-col gap-3 sm:gap-3 pt-2">
      <div className="flex-1 sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border border-white shrink-0" style={{ background: '#E66FD2' }} />
          <span className="text-body-emphasized text-sm sm:text-base">Systolic</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-lg sm:text-xl font-bold text-navy">{latestReading?.blood_pressure.systolic.value || '-'}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{latestReading?.blood_pressure.systolic.levels || ''}</span>
        </div>
      </div>

      <div className="hidden sm:block h-px bg-gray-200 my-1" />

      <div className="flex-1 sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border border-white shrink-0" style={{ background: '#8C6FE6' }} />
          <span className="text-body-emphasized text-sm sm:text-base">Diastolic</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-lg sm:text-xl font-bold text-navy">{latestReading?.blood_pressure.diastolic.value || '-'}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{latestReading?.blood_pressure.diastolic.levels || ''}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="rounded-[12px] shadow-card p-4 sm:p-6 mb-[20px] w-full"
      style={{
        maxWidth: "100%",
        height: "auto",
        minHeight: "298px",
        background: "#F4F0FE",
      }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-1 h-[200px] sm:h-[220px] min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Blood Pressure
            </h4>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-150">
              <span>{timeRange}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F3F4F6"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
              />
              <YAxis
                domain={[60, 180]}
                ticks={[60, 80, 100, 120, 140, 160, 180]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#C26EB4"
                strokeWidth={2}
                dot={{ fill: "#E66FD2", stroke: "#FFFFFF", strokeWidth: 1, r: 7 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#7E6CAB"
                strokeWidth={2}
                dot={{ fill: "#8C6FE6", stroke: "#FFFFFF", strokeWidth: 1, r: 7 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full sm:w-36 flex sm:block justify-around sm:justify-start">
          <CustomLegend />
        </div>
      </div>
    </div>
  );
}