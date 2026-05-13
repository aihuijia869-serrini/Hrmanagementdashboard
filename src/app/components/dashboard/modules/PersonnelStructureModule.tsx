import { ChartCard } from "../ChartCard";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const COLORS = ['#165DFF', '#14C9C9', '#F7BA1E', '#F53F3F', '#8D4EDA'];

const eduData = [
  { id: 'edu-1', name: '博士', value: 400 },
  { id: 'edu-2', name: '硕士', value: 3000 },
  { id: 'edu-3', name: '本科', value: 6000 },
  { id: 'edu-4', name: '大专及以下', value: 3050 },
];

const ageData = [
  { id: 'age-1', age: '25以下', count: 1200 },
  { id: 'age-2', age: '26-35', count: 5800 },
  { id: 'age-3', age: '36-45', count: 3400 },
  { id: 'age-4', age: '46-55', count: 1500 },
  { id: 'age-5', age: '55以上', count: 550 },
];

const genderData = [
  { id: 'gender-1', name: '男', value: 7200 },
  { id: 'gender-2', name: '女', value: 5250 },
]

export function PersonnelStructureModule({ onClick }: { onClick: (t: string) => void }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark' || (!theme && mounted);
  const textColor = isDark ? '#64748b' : '#64748b';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';
  const tooltipColor = isDark ? '#e2e8f0' : '#334155';

  return (
    <ChartCard title="人员结构总览" onClick={() => onClick("人员结构明细")} className="flex flex-col">
      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">

        {/* Education Pie */}
        <div className="flex flex-col h-full min-h-[280px] cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick("人员结构 - 学历分布"); }}>
          <h4 className="text-xs text-slate-500 dark:text-slate-400 mb-2 text-center">学历分布饼图</h4>
          <div className="flex-1 relative min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={180}>
              <PieChart key="edu-distribution-pie">
                <Pie data={eduData} innerRadius={0} outerRadius={65} dataKey="value" stroke="none">
                  {eduData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px' }}
                  itemStyle={{ color: tooltipColor }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Bar */}
        <div className="flex flex-col h-full min-h-[280px] cursor-pointer border-l border-r border-slate-200 dark:border-white/10 px-2" onClick={(e) => { e.stopPropagation(); onClick("人员结构 - 年龄分布"); }}>
          <h4 className="text-xs text-slate-500 dark:text-slate-400 mb-2 text-center">年龄段直方图</h4>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={180}>
              <BarChart key="age-distribution-bar" data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="age" tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px' }}
                  itemStyle={{ color: tooltipColor }}
                />
                <Bar dataKey="count" fill="#165DFF" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Donut */}
        <div className="flex flex-col h-full min-h-[280px] cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick("人员结构 - 性别分布"); }}>
          <h4 className="text-xs text-slate-500 dark:text-slate-400 mb-2 text-center">性别结构环形图</h4>
          <div className="flex-1 relative min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={180}>
              <PieChart key="gender-distribution-donut">
                <Pie data={genderData} innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value" stroke="none">
                  {genderData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px' }}
                  itemStyle={{ color: tooltipColor }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">总计</span>
              <span className="text-lg font-bold text-slate-800 dark:text-white leading-none">12.4k</span>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[0] }}></span>
                  <span className="text-[9px] text-slate-600 dark:text-slate-400">男 58%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[1] }}></span>
                  <span className="text-[9px] text-slate-600 dark:text-slate-400">女 42%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ChartCard>
  );
}
