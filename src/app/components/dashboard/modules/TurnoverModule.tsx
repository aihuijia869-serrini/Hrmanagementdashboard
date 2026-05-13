import { ChartCard } from "../ChartCard";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const turnoverTrend = [
  { id: 'turnover-1', month: '1月', in: 45, out: 20 },
  { id: 'turnover-2', month: '2月', in: 30, out: 25 },
  { id: 'turnover-3', month: '3月', in: 80, out: 40 }, // hiring season
  { id: 'turnover-4', month: '4月', in: 50, out: 30 },
  { id: 'turnover-5', month: '5月', in: 20, out: 35 },
];

const reasonData = [
  { id: 'reason-1', name: '个人原因', value: 45 },
  { id: 'reason-2', name: '薪酬不满', value: 25 },
  { id: 'reason-3', name: '职业发展', value: 20 },
  { id: 'reason-4', name: '其他', value: 10 },
];
const COLORS = ['#165DFF', '#F53F3F', '#FF7D00', '#8D4EDA'];

export function TurnoverModule({ onClick }: { onClick: (t: string) => void }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark' || (!theme && mounted);
  const textColor = '#64748b';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <ChartCard title="人员变动总览" onClick={() => onClick("人员变动明细")}>
      <div className="flex flex-col h-full min-h-0 gap-4">
        {/* Turnover Trend */}
        <div className="h-[55%] min-h-[180px] flex flex-col cursor-pointer">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-slate-500 dark:text-slate-400">入离职趋势对比</span>
            <div className="flex gap-2 text-[9px] text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#165DFF]"></span>入职</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7D00]"></span>离职</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={120}>
              <LineChart key="turnover-trend-chart" data={turnoverTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="in" name="入职" stroke="#165DFF" strokeWidth={2} dot={{ r: 2, fill: '#165DFF' }} />
                <Line type="monotone" dataKey="out" name="离职" stroke="#FF7D00" strokeWidth={2} dot={{ r: 2, fill: '#FF7D00' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turnover Reasons */}
        <div className="h-[45%] min-h-[140px] flex items-center bg-slate-50 dark:bg-white/5 rounded-lg p-2 cursor-pointer border border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 transition-colors">
          <div className="w-[45%] h-full relative min-h-[100px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={80}>
              <PieChart key="turnover-reasons-pie">
                <Pie data={reasonData} cx="50%" cy="50%" innerRadius={15} outerRadius={30} paddingAngle={2} dataKey="value" stroke="none">
                  {reasonData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 pl-2 border-l border-slate-200 dark:border-white/10">
            <span className="text-[10px] text-slate-700 dark:text-slate-300 mb-0.5">核心离职原因分析</span>
            {reasonData.slice(0, 3).map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                  <span className="text-slate-500 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-slate-800 dark:text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
