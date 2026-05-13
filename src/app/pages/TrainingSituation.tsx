import React from 'react';
import {
  BookOpen, Clock, Users, Target, CheckCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, LabelList, Legend, RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { MetricCard } from '../components/MetricCard';

const deptTrainingData = [
  { id: 'training-dept-rd', name: '研发中心', person: 120, hours: 2400 },
  { id: 'training-dept-sales', name: '营销部', person: 85, hours: 1200 },
  { id: 'training-dept-production', name: '生产部', person: 210, hours: 3800 },
  { id: 'training-dept-admin', name: '综合管理部', person: 45, hours: 600 },
  { id: 'training-dept-finance', name: '财务部', person: 25, hours: 350 },
];

const leaderPointsData = [
  { id: 'leader-zhang', name: '张伟 (总经理)', points: 95, target: 80, completed: true },
  { id: 'leader-li', name: '李娜 (副总)', points: 88, target: 80, completed: true },
  { id: 'leader-wang', name: '王强 (技术总监)', points: 105, target: 80, completed: true },
  { id: 'leader-zhao', name: '赵芳 (营销总监)', points: 65, target: 80, completed: false }, // 未达标
  { id: 'leader-chen', name: '陈杰 (生产总监)', points: 72, target: 80, completed: false }, // 未达标
  { id: 'leader-liu', name: '刘洋 (财务总监)', points: 82, target: 80, completed: true },
];

const completionTrendData = [
  { id: 'completion-jan', name: '1月', plan: 10, actual: 8, rate: 80 },
  { id: 'completion-feb', name: '2月', plan: 12, actual: 11, rate: 91 },
  { id: 'completion-mar', name: '3月', plan: 15, actual: 15, rate: 100 },
  { id: 'completion-apr', name: '4月', plan: 8, actual: 9, rate: 112 },
  { id: 'completion-may', name: '5月', plan: 14, actual: 12, rate: 85 },
  { id: 'completion-jun', name: '6月', plan: 20, actual: 19, rate: 95 },
  { id: 'completion-jul', name: '7月', plan: 15, actual: 14, rate: 93 },
  { id: 'completion-aug', name: '8月', plan: 25, actual: 26, rate: 104 },
];

const radialData = [
  { id: 'radial-completion', name: '完成率', value: 92, fill: '#10B981' }
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
                {entry.value} {entry.name.includes('人次') ? '人' : entry.name.includes('学时') ? 'h' : entry.name.includes('率') ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const TrainingSituation = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
      {/* KPI Section */}
      <section>
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-4 bg-[#165DFF] rounded-r-md mr-2 dark:shadow-[0_0_8px_#165DFF]"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wider">培训情况分析</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <MetricCard label="计划完成率" value="92.4" unit="%" icon={<Target size={20} />} trend="+1.2% 同比" trendColor="text-emerald-400" />
          <MetricCard label="年度培训人次" value={485} unit="人次" icon={<Users size={20} />} trend="+15" trendColor="text-emerald-400" />
          <MetricCard label="总培训学时" value={8350} unit="h" icon={<BookOpen size={20} />} trend="+240" trendColor="text-emerald-400" />
          <MetricCard label="人均培训学时" value={65.2} unit="h/人" icon={<Clock size={20} />} trend="+2.1" trendColor="text-emerald-400" />
          <MetricCard label="培训覆盖率" value="88.5" unit="%" icon={<CheckCircle size={20} />} trend="+5.4% 同比" trendColor="text-emerald-400" />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1">
        <ChartCard title="各部门培训人次与学时统计" className="lg:col-span-1 h-[350px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <ComposedChart key="dept-training-composed" data={deptTrainingData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />

              <Bar yAxisId="left" dataKey="person" name="培训人次" fill="url(#barBlue)" radius={[4, 4, 0, 0]} barSize={24} />
              <Line yAxisId="right" type="monotone" dataKey="hours" name="总学时 (h)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="领导班子培训积分看板" className="lg:col-span-1 h-[350px]">
          <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2">
            <div className="flex justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
              <span>班子成员</span>
              <span>达标线: 80分</span>
            </div>
            {leaderPointsData.map((leader, i) => {
              const isWarning = !leader.completed;
              let statusColor = "bg-[#10B981]";
              let textColor = "text-[#10B981]";
              let badgeText = "达标";
              let badgeColor = "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30";

              if (isWarning) {
                statusColor = "bg-[#F43F5E]";
                textColor = "text-[#F43F5E]";
                badgeText = "未达标";
                badgeColor = "bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
              }

              return (
                <div key={i} className={`p-3 rounded-lg border ${isWarning ? 'border-[#F43F5E]/30 bg-[#F43F5E]/5' : 'border-slate-700/50 bg-[#161b22]/50'} transition-all`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`font-medium text-sm ${isWarning ? 'text-[#F43F5E]' : 'text-slate-200'}`}>{leader.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${badgeColor}`}>{badgeText}</span>
                    </div>
                    <div className={`font-mono font-bold text-base ${textColor}`}>{leader.points} 分</div>
                  </div>
                  
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${statusColor}`}
                      style={{ width: `${Math.min(leader.points, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="培训计划完成率走势" className="lg:col-span-2 h-[300px]">
          <div className="flex h-full w-full gap-4">
            <div className="w-1/4 h-full flex flex-col items-center justify-center border-r border-white/5 pr-4 relative">
              <ResponsiveContainer width="100%" height={150}>
                <RadialBarChart
                  key="completion-radial"
                  cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: '#1e293b' }} dataKey="value" cornerRadius={10} fill="#10B981" />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                <span className="text-2xl font-bold font-mono text-[#10B981]">92%</span>
                <span className="text-[10px] text-slate-400 mt-1">综合完成率</span>
              </div>
            </div>

            <div className="w-3/4 h-full">
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <LineChart key="completion-trend-line" data={completionTrendData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 120]} axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />

                  <Line yAxisId="left" type="monotone" dataKey="plan" name="计划项数" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  <Line yAxisId="left" type="monotone" dataKey="actual" name="实际完成数" stroke="#00D4FF" strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="rate" name="完成率(%)" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartCard>
      </section>
    </div>
  );
};
