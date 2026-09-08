import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DiagnosisHistory as DiagnosisHistoryType } from '@/lib/api';

const SYSTOLIC_COLOR = '#C26EB4';
const DIASTOLIC_COLOR = '#7E6CAB';

const TIME_RANGES = [
  { label: 'Last 3 months', months: 3 },
  { label: 'Last 6 months', months: 6 },
  { label: 'Last 12 months', months: 12 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

interface LegendEntryProps {
  color: string;
  label: string;
  value?: number;
  level?: string;
}

function LegendEntry({ color, label, value, level }: LegendEntryProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full border border-white"
          style={{ background: color }}
        />
        <span className="text-body-emphasized text-sm sm:text-base">{label}</span>
      </div>
      <p className="mt-1 text-lg font-bold text-navy sm:text-xl">{value ?? '-'}</p>
      <p className="text-xs text-gray-500">{level ?? ''}</p>
    </div>
  );
}

interface DiagnosisHistoryProps {
  diagnosisHistory: DiagnosisHistoryType[];
}

export function DiagnosisHistory({ diagnosisHistory }: DiagnosisHistoryProps) {
  const [months, setMonths] = useState(6);

  // Slice to the selected time range for the chart
  const chartData = useMemo(
    () =>
      diagnosisHistory.slice(-months).map((item) => ({
        month: `${item.month} ${item.year}`,
        systolic: item.blood_pressure.systolic.value,
        diastolic: item.blood_pressure.diastolic.value,
      })),
    [diagnosisHistory, months]
  );

  // Latest reading comes from the full history, regardless of chart range
  const latestReading = diagnosisHistory[diagnosisHistory.length - 1];

  return (
    <div className="mb-5 w-full rounded-[12px] bg-[#F4F0FE] p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h4 className="text-base font-semibold text-gray-900">Blood Pressure</h4>
            <div className="relative">
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                aria-label="Select time range"
                className="cursor-pointer appearance-none rounded-lg bg-transparent py-1 pl-2 pr-7 text-sm text-gray-500 transition-colors hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {TIME_RANGES.map((range) => (
                  <option key={range.months} value={range.months}>
                    {range.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="h-[200px] sm:h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  interval="preserveStartEnd"
                  minTickGap={16}
                />
                <YAxis
                  domain={[60, 180]}
                  ticks={[60, 80, 100, 120, 140, 160, 180]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#C4B5FD', strokeDasharray: '4 4' }} />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  name="Systolic"
                  stroke={SYSTOLIC_COLOR}
                  strokeWidth={2}
                  dot={{ fill: '#E66FD2', stroke: '#FFFFFF', strokeWidth: 1, r: 5 }}
                  activeDot={{ r: 7 }}
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic"
                  stroke={DIASTOLIC_COLOR}
                  strokeWidth={2}
                  dot={{ fill: '#8C6FE6', stroke: '#FFFFFF', strokeWidth: 1, r: 5 }}
                  activeDot={{ r: 7 }}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex w-full justify-around gap-4 border-t border-purple-200 pt-3 sm:w-36 sm:flex-col sm:justify-start sm:border-t-0 sm:pt-0">
          <LegendEntry
            color="#E66FD2"
            label="Systolic"
            value={latestReading?.blood_pressure.systolic.value}
            level={latestReading?.blood_pressure.systolic.levels}
          />
          <div className="hidden h-px bg-gray-200 sm:block" />
          <LegendEntry
            color="#8C6FE6"
            label="Diastolic"
            value={latestReading?.blood_pressure.diastolic.value}
            level={latestReading?.blood_pressure.diastolic.levels}
          />
        </div>
      </div>
    </div>
  );
}