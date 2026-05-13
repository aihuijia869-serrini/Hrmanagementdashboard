import React from 'react';
import {
  DollarSign, TrendingUp, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area, LabelList, ComposedChart
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { MetricCard } from '../components/MetricCard';

const COLORS = ['#00D4FF', '#4338CA', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4'];

const costCompositionPie = [
  { id: 'cost-base-salary', name: '基本工资', value: 45 },
  { id: 'cost-bonus', name: '绩效奖金', value: 25 },
  { id: 'cost-insurance', name: '社保公积金', value: 15 },
  { id: 'cost-welfare', name: '福利费', value: 10 },
  { id: 'cost-training', name: '培训费', value: 5 },
];

const costTrendData = [
  { id: 'trend-jan', name: '1月', value: 120, revenue: 320, profit: 45 },
  { id: 'trend-feb', name: '2月', value: 132, revenue: 350, profit: 52 },
  { id: 'trend-mar', name: '3月', value: 125, revenue: 310, profit: 40 },
  { id: 'trend-apr', name: '4月', value: 140, revenue: 380, profit: 58 },
  { id: 'trend-may', name: '5月', value: 145, revenue: 400, profit: 62 },
  { id: 'trend-jun', name: '6月', value: 138, revenue: 370, profit: 50 },
  { id: 'trend-jul', name: '7月', value: 150, revenue: 410, profit: 65 },
  { id: 'trend-aug', name: '8月', value: 155, revenue: 420, profit: 68 },
];

const deptCostData = [
  { id: 'dept-rd', name: '研发中心', value: 450 },
  { id: 'dept-sales', name: '营销部', value: 380 },
  { id: 'dept-production', name: '生产部', value: 520 },
  { id: 'dept-admin', name: '综合管理部', value: 180 },
  { id: 'dept-finance', name: '财务部', value: 120 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-[#00D4FF]/30 bg-[#0A0A10]/80 p-3 backdrop-blur-xl shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all z-50">
        <p className="mb-2 text-[11px] font-medium tracking-wide text-slate-400 uppercase">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill, boxShadow: `0 0 8px ${entry.color || entry.fill}` }} />
                <span className="text-[11px] text-slate-300">{entry.name || '数值'}</span>
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                {entry.value} {entry.name.includes('率') || entry.name.includes('比') ? '%' : '万'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const LaborCost = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
      {/* KPI Section */}
      <section>
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-4 bg-[#165DFF] rounded-r-md mr-2 dark:shadow-[0_0_8px_#165DFF]"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wider">人工成本分析</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="人工成本总额" value="1,245.8" unit="万元" icon={<DollarSign size={20} />} trend="+5.2% 同比" trendColor="text-emerald-400" />
          <MetricCard label="人均人工成本" value="18.5" unit="万元/人" icon={<BarChart2 size={20} />} trend="+1.1% 同比" trendColor="text-emerald-400" />
          <MetricCard label="人事费用率" value="28.4" unit="%" icon={<PieChartIcon size={20} />} trend="-0.5% 环比" trendColor="text-emerald-400" />
          <MetricCard label="人工成本利润率" value="142.3" unit="%" icon={<TrendingUp size={20} />} trend="+8.4% 同比" trendColor="text-emerald-400" />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1">
        <ChartCard title="成本构成分析 (饼图+柱状)" className="lg:col-span-1">
          <div className="flex h-full w-full items-center gap-4">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart key="cost-composition-pie">
                <Pie data={costCompositionPie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                  {costCompositionPie.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height="100%">
              <BarChart key="cost-composition-bar" data={costCompositionPie} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="barCost" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={65} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barCost)" radius={[0, 4, 4, 0]} barSize={12}>
                  <LabelList dataKey="value" position="right" fill="#cbd5e1" fontSize={10} fontFamily="monospace" formatter={(v:any) => `${v}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="维度统计分析 (按部门)" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <BarChart key="dept-cost-bar" data={deptCostData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barCyan2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
              <Bar dataKey="value" name="人工成本" fill="url(#barCyan2)" radius={[4, 4, 0, 0]} barSize={32}>
                <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={10} fontFamily="monospace" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="成本与经营指标联动趋势分析" className="lg:col-span-2 h-[350px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <ComposedChart key="cost-trend-composed" data={costTrendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />

              <Area yAxisId="left" type="monotone" dataKey="value" name="人工成本" fill="url(#areaCost)" stroke="#00D4FF" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="营业收入" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3, fill: '#8B5CF6' }} activeDot={{ r: 5 }} />
              <Line yAxisId="right" type="monotone" dataKey="profit" name="利润总额" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} activeDot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
};
