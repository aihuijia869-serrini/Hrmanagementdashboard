import { ChartCard } from "../ChartCard";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const costData = [
  { id: 'cost-1', name: '基本工资', value: 55 },
  { id: 'cost-2', name: '绩效奖金', value: 25 },
  { id: 'cost-3', name: '社保公积金', value: 15 },
  { id: 'cost-4', name: '福利及其他', value: 5 },
];
const COLORS = ['#165DFF', '#00B42A', '#F7BA1E', '#8D4EDA'];

const trendData = [
  { id: 'trend-1', month: '1月', cost: 320, budget: 350 },
  { id: 'trend-2', month: '2月', cost: 310, budget: 350 },
  { id: 'trend-3', month: '3月', cost: 340, budget: 350 },
  { id: 'trend-4', month: '4月', cost: 335, budget: 350 },
  { id: 'trend-5', month: '5月', cost: 420, budget: 350 }, // spike
];

export function LaborCostModule({ onClick }: { onClick: (t: string) => void }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark' || (!theme && mounted);
  const textColor = '#64748b';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';

  return (
    <ChartCard title="人工成本总览" onClick={() => onClick("人工成本明细")}>
      <div className="flex flex-col h-full min-h-0 gap-4">
        {/* Cost Composition */}
        <div className="h-1/2 min-h-[150px] flex items-center">
          <div className="w-1/2 h-full relative cursor-pointer">
            <ResponsiveContainer width="100%" height="100%" minHeight={100}>
              <PieChart accessibilityLayer={false}>
                <Pie data={costData} innerRadius={25} outerRadius={45} paddingAngle={2} dataKey="value" stroke="none">
                  {costData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 flex flex-col justify-center gap-1.5">
            {costData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                  <span className="text-slate-500 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-slate-800 dark:text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Trend */}
        <div className="h-1/2 min-h-[150px] flex flex-col cursor-pointer">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">月度成本趋势 (万)</div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={100}>
              <LineChart accessibilityLayer={false} data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="cost" name="实际成本" stroke="#F53F3F" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="dashed" dataKey="budget" name="预算线" stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
