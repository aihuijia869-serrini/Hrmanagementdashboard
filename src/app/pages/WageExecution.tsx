import React from 'react';
import {
  CreditCard, PieChart as PieChartIcon, TrendingUp
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Legend, ComposedChart
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { MetricCard } from '../components/MetricCard';

const trendData = [
  { id: 'wage-jan', name: '1月', current: 120, lastYear: 110 },
  { id: 'wage-feb', name: '2月', current: 132, lastYear: 125 },
  { id: 'wage-mar', name: '3月', current: 125, lastYear: 118 },
  { id: 'wage-apr', name: '4月', current: 140, lastYear: 135 },
  { id: 'wage-may', name: '5月', current: 145, lastYear: 142 },
  { id: 'wage-jun', name: '6月', current: 138, lastYear: 130 },
  { id: 'wage-jul', name: '7月', current: 150, lastYear: 145 },
  { id: 'wage-aug', name: '8月', current: 155, lastYear: 150 },
];

const unitExecutionData = [
  { id: 'unit-rd', name: '研发中心', budget: 2000, actual: 1850, rate: 92.5 },
  { id: 'unit-sales', name: '营销部', budget: 1500, actual: 1600, rate: 106.7 }, // 超预算
  { id: 'unit-production', name: '生产部', budget: 3000, actual: 2850, rate: 95.0 }, // 临近预警
  { id: 'unit-admin', name: '综合部', budget: 800, actual: 650, rate: 81.2 },
  { id: 'unit-finance', name: '财务部', budget: 500, actual: 420, rate: 84.0 },
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
                {entry.value} 万
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const WageExecution = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
      {/* KPI Section */}
      <section>
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-4 bg-[#165DFF] rounded-r-md mr-2 dark:shadow-[0_0_8px_#165DFF]"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wider">工资总额执行分析</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Metric Cards with Progress Bars */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/90 p-5 backdrop-blur-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">年度预算总额</div>
              <div className="rounded-md bg-white/5 p-1.5 text-[#00D4FF] ring-1 ring-white/10"><CreditCard size={20} /></div>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-white font-mono">7,800.0 <span className="text-xs text-slate-500">万元</span></div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/90 p-5 backdrop-blur-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">累计已发金额</div>
              <div className="rounded-md bg-white/5 p-1.5 text-[#8B5CF6] ring-1 ring-white/10"><PieChartIcon size={20} /></div>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-white font-mono">6,370.0 <span className="text-xs text-slate-500">万元</span></div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#00D4FF]/30 bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/90 p-5 backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(0,212,255,0.1)]">
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[#00D4FF]">预算执行率</div>
              <div className="rounded-md bg-[#00D4FF]/10 p-1.5 text-[#00D4FF] ring-1 ring-[#00D4FF]/30"><TrendingUp size={20} /></div>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-[#00D4FF] font-mono">81.7 <span className="text-xs text-[#00D4FF]/70">%</span></div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5">
              <div className="bg-[#00D4FF] h-1.5 rounded-full shadow-[0_0_8px_#00D4FF]" style={{ width: '81.7%' }}></div>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/90 p-5 backdrop-blur-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">剩余额度</div>
              <div className="rounded-md bg-white/5 p-1.5 text-emerald-400 ring-1 ring-white/10"><CreditCard size={20} /></div>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-white font-mono">1,430.0 <span className="text-xs text-slate-500">万元</span></div>
            <div className="mt-3 text-xs text-slate-400">可用至年底</div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 flex-1">
        <ChartCard title="工资总额执行走势" className="lg:col-span-1 h-[350px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <AreaChart key="wage-execution-area" data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="areaLastYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.1}/>
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />

              <Area type="monotone" dataKey="current" name="本期发生额" fill="url(#areaCurrent)" stroke="#00D4FF" strokeWidth={2} />
              <Area type="monotone" dataKey="lastYear" name="上年同期" fill="url(#areaLastYear)" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="各单位预算执行看板 (列表明细)" className="lg:col-span-1 h-[350px]">
          <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2">
            {unitExecutionData.map((unit, i) => {
              const isOver = unit.rate > 100;
              const isWarning = unit.rate >= 90 && unit.rate <= 100;
              
              let statusColor = "bg-[#00D4FF]";
              let textColor = "text-[#00D4FF]";
              let badgeText = "正常";
              let badgeColor = "bg-slate-800 text-slate-300";

              if (isOver) {
                statusColor = "bg-[#F43F5E]";
                textColor = "text-[#F43F5E]";
                badgeText = "超预算";
                badgeColor = "bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30";
              } else if (isWarning) {
                statusColor = "bg-[#F59E0B]";
                textColor = "text-[#F59E0B]";
                badgeText = "临近预警";
                badgeColor = "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30";
              }

              return (
                <div key={i} className={`p-4 rounded-lg border ${isOver ? 'border-[#F43F5E]/30 bg-[#F43F5E]/5 shadow-[inset_0_0_15px_rgba(244,63,94,0.05)]' : 'border-slate-700/50 bg-[#161b22]/50'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm text-slate-200">{unit.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${badgeColor}`}>{badgeText}</span>
                    </div>
                    <div className={`font-mono font-bold text-lg ${textColor}`}>{unit.rate}%</div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>预算: {unit.budget} 万</span>
                    <span>已发: <span className="text-slate-200">{unit.actual} 万</span></span>
                  </div>
                  
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${statusColor}`}
                      style={{ width: `${Math.min(unit.rate, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </section>
    </div>
  );
};
