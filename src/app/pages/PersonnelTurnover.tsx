import React from 'react';
import {
  Users, UserMinus, UserPlus, GitMerge
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, LabelList
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { MetricCard } from '../components/MetricCard';

const COLORS = ['#00D4FF', '#4338CA', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4'];

const turnoverTrendData = [
  { id: 'turnover-jan', name: '1月', in: 15, out: 8, transfer: 5, retire: 1 },
  { id: 'turnover-feb', name: '2月', in: 12, out: 5, transfer: 3, retire: 0 },
  { id: 'turnover-mar', name: '3月', in: 25, out: 12, transfer: 8, retire: 2 },
  { id: 'turnover-apr', name: '4月', in: 18, out: 9, transfer: 4, retire: 1 },
  { id: 'turnover-may', name: '5月', in: 20, out: 11, transfer: 6, retire: 0 },
  { id: 'turnover-jun', name: '6月', in: 22, out: 15, transfer: 7, retire: 3 },
  { id: 'turnover-jul', name: '7月', in: 45, out: 18, transfer: 12, retire: 1 }, // 毕业季
  { id: 'turnover-aug', name: '8月', in: 30, out: 10, transfer: 5, retire: 0 },
];

const deptTurnoverData = [
  { id: 'dept-turnover-rd', name: '研发中心', value: 12 },
  { id: 'dept-turnover-sales', name: '营销部', value: 25 },
  { id: 'dept-turnover-production', name: '生产部', value: 38 },
  { id: 'dept-turnover-admin', name: '综合管理部', value: 4 },
  { id: 'dept-turnover-finance', name: '财务部', value: 2 },
];

const reasonPieData = [
  { id: 'reason-salary', name: '薪资待遇', value: 35 },
  { id: 'reason-development', name: '个人发展', value: 25 },
  { id: 'reason-pressure', name: '工作压力', value: 15 },
  { id: 'reason-family', name: '家庭原因', value: 15 },
  { id: 'reason-other', name: '其他', value: 10 },
];

const retentionTrendData = [
  { id: 'retention-q1', name: 'Q1', retention: 92.5, loss: 4.2 },
  { id: 'retention-q2', name: 'Q2', retention: 89.4, loss: 5.5 },
  { id: 'retention-q3', name: 'Q3', retention: 91.0, loss: 3.8 },
  { id: 'retention-q4', name: 'Q4', retention: 94.2, loss: 2.1 },
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
                {entry.value} {entry.name.includes('率') ? '%' : '人'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const PersonnelTurnover = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
      {/* KPI Section */}
      <section>
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-4 bg-[#165DFF] rounded-r-md mr-2 dark:shadow-[0_0_8px_#165DFF]"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wider">人员变动分析</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          <MetricCard label="入职人数" value={187} icon={<UserPlus size={16} />} trend="+12" />
          <MetricCard label="离职人数" value={88} icon={<UserMinus size={16} />} trend="-5" trendColor="text-emerald-400" />
          <MetricCard label="调动人数" value={42} icon={<GitMerge size={16} />} />
          <MetricCard label="退休人数" value={8} icon={<Users size={16} />} />

          <MetricCard label="整体离职率" value="8.5" unit="%" trend="-1.2%" trendColor="text-emerald-400" />
          <MetricCard label="新员工留存率" value="92.4" unit="%" trend="+3.1%" trendColor="text-emerald-400" />
          <MetricCard label="核心流失率" value="2.1" unit="%" trend="-0.5%" trendColor="text-emerald-400" />
          <MetricCard label="内部流动率" value="5.4" unit="%" trend="+1.2%" />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1">
        <ChartCard title="整体变动趋势" className="lg:col-span-2 h-[350px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <LineChart key="turnover-trend-line" data={turnoverTrendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />

              <Line type="monotone" dataKey="in" name="入职" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="out" name="离职" stroke="#F43F5E" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="transfer" name="调动" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="retire" name="退休" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="离职人数分布 (按部门)">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <BarChart key="dept-turnover-bar" data={deptTurnoverData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
              <Bar dataKey="value" name="离职人数" fill="url(#barRed)" radius={[4, 4, 0, 0]} barSize={28}>
                <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={10} fontFamily="monospace" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="离职原因构成">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart key="reason-distribution-pie">
              <Pie data={reasonPieData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                {reasonPieData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="留存与流失趋势" className="lg:col-span-2 h-[300px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <LineChart key="retention-trend-line" data={retentionTrendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis yAxisId="left" domain={[80, 100]} axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />

              <Line yAxisId="left" type="monotone" dataKey="retention" name="新员工留存率 (%)" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
              <Line yAxisId="right" type="monotone" dataKey="loss" name="关键岗位流失率 (%)" stroke="#F43F5E" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
};
