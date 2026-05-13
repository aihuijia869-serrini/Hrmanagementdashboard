import { ChartCard } from "../ChartCard";
import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const execTrendData = [
  { id: 'exec-1', month: '1月', rate: 10, target: 8.3 },
  { id: 'exec-2', month: '2月', rate: 18, target: 16.6 },
  { id: 'exec-3', month: '3月', rate: 26, target: 25.0 },
  { id: 'exec-4', month: '4月', rate: 35, target: 33.3 },
  { id: 'exec-5', month: '5月', rate: 45, target: 41.6 },
  { id: 'exec-6', month: '6月', rate: 58, target: 50.0 }, // over budget warning
  { id: 'exec-7', month: '7月', rate: null, target: 58.3 },
  { id: 'exec-8', month: '8月', rate: null, target: 66.6 },
];

export function SalaryExecutionModule({ onClick }: { onClick: (t: string) => void }) {
  const currentExec = 58;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark' || (!theme && mounted);
  const textColor = '#64748b';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const emptyCellColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <ChartCard title="工资总额执行总览" onClick={() => onClick("工资执行明细")} className="flex flex-row">
      <div className="flex w-full h-full min-h-0 gap-4">
        {/* Left: Overall Execution Donut */}
        <div className="w-1/3 min-h-[280px] flex flex-col items-center justify-center cursor-pointer border-r border-slate-200 dark:border-white/5 pr-4 relative">
          <div className="absolute top-0 left-0 bg-orange-50 dark:bg-[#FF7D00]/20 text-[#FF7D00] text-[10px] px-2 py-0.5 rounded-br-lg border-b border-r border-orange-100 dark:border-[#FF7D00]/30">
            预警状态：超进度
          </div>
          <div className="w-40 h-40 relative mt-4 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={160}>
              <PieChart key="salary-exec-donut">
                <Pie
                  data={[{ id: 'exec-filled', value: currentExec }, { id: 'exec-empty', value: 100 - currentExec }]}
                  cx="50%" cy="50%"
                  startAngle={90} endAngle={-270}
                  innerRadius={55} outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell key="salary-exec-filled" fill="#FF7D00" />
                  <Cell key="salary-exec-empty" fill={emptyCellColor} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold font-mono text-slate-800 dark:text-white leading-none">{currentExec}<span className="text-lg">%</span></span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">年度执行率</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4 w-full justify-center">
            <div className="text-center">
              <div className="text-[10px] text-slate-500">已发总额</div>
              <div className="text-sm font-mono text-slate-800 dark:text-white">4.2亿</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
            <div className="text-center">
              <div className="text-[10px] text-slate-500">剩余可用</div>
              <div className="text-sm font-mono text-emerald-500 dark:text-emerald-400">3.04亿</div>
            </div>
          </div>
        </div>

        {/* Right: Trend Line */}
        <div className="w-2/3 min-h-[280px] flex flex-col cursor-pointer">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs text-slate-700 dark:text-slate-300">年度执行趋势图 (累计%)</h4>
            <div className="flex gap-3 text-[10px] text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#FF7D00]"></span>实际执行率</span>
              <span className="flex items-center gap-1"><span className="w-2 h-0 border-t border-dashed border-[#64748b]"></span>时间进度线</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <AreaChart key="salary-exec-trend" data={execTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7D00" stopOpacity={isDark ? 0.3 : 0.15}/>
                    <stop offset="95%" stopColor="#FF7D00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="rate" name="实际执行率" stroke="#FF7D00" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" activeDot={{ r: 6, fill: '#FF7D00', stroke: '#fff', strokeWidth: 2 }} />
                {/* Note: In AreaChart, adding a Line needs to have its data properly aligned or just use ComposedChart, but Recharts allows Line in AreaChart often or ComposedChart is better. Using ComposedChart is technically cleaner but Area + Area works too. Let's stick to Area for one, and standard SVG or Line. AreaChart actually accepts Line. */}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
