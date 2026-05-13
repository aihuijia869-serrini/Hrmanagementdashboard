import { ChartCard } from "../ChartCard";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const warningTypes = [
  { id: 'warn-type-1', type: '预算超支预警', count: 5, color: '#F53F3F' }, // Red
  { id: 'warn-type-2', type: '关键流失预警', count: 3, color: '#FF7D00' }, // Orange
  { id: 'warn-type-3', type: '培训未达预警', count: 4, color: '#165DFF' }, // Blue
];

const warningTrend = [
  { id: 'warn-trend-1', month: '1月', count: 2 },
  { id: 'warn-trend-2', month: '2月', count: 3 },
  { id: 'warn-trend-3', month: '3月', count: 8 },
  { id: 'warn-trend-4', month: '4月', count: 5 },
  { id: 'warn-trend-5', month: '5月', count: 12 },
];

export function KeyWarningsModule({ onClick }: { onClick: (t: string) => void }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark' || (!theme && mounted);
  const textColor = '#64748b';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const dotFillColor = isDark ? '#0a0f1c' : '#ffffff';

  return (
    <ChartCard 
      title="关键预警总览" 
      onClick={() => onClick("关键预警明细")} 
      className="flex flex-row border-red-200 dark:border-[#F53F3F]/30 shadow-[0_0_20px_rgba(245,63,63,0.05)]"
    >
      <div className="flex w-full h-full min-h-0 gap-4">
        {/* Left: Type Distribution */}
        <div className="w-1/2 min-h-[280px] flex flex-col cursor-pointer border-r border-slate-200 dark:border-white/5 pr-4 relative">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-[#F53F3F]" />
            <h4 className="text-xs text-slate-700 dark:text-slate-300">预警类型分布 (本月)</h4>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <BarChart key="warning-types-bar" data={warningTypes} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  cursor={{ fill: gridColor }}
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
                  {warningTypes.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Trend Line */}
        <div className="w-1/2 min-h-[280px] flex flex-col cursor-pointer">
           <h4 className="text-xs text-slate-700 dark:text-slate-300 mb-2">预警数量趋势图</h4>
           <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <LineChart key="warning-trend-line" data={warningTrend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="count" name="预警总数" stroke="#F53F3F" strokeWidth={2} dot={{ r: 4, fill: dotFillColor, stroke: '#F53F3F', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
