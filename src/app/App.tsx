import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Filter, 
  RefreshCw, 
  Download, 
  Maximize,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  AreaChart,
  Area,
  LabelList
} from 'recharts';
import { ChartCard } from './components/ChartCard';
import { MetricCard } from './components/MetricCard';

// --- DATA DEFINITIONS ---

const COLORS = ['#00D4FF', '#4338CA', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4'];

const genderData = [
  { name: '男', value: 72, percent: '56.3%' },
  { name: '女', value: 56, percent: '43.7%' },
];

const ageData = [
  { name: '25以下', value: 18 },
  { name: '25-34', value: 52 },
  { name: '35-44', value: 38 },
  { name: '45-54', value: 16 },
  { name: '55以上', value: 4 },
];

const educationData = [
  { name: '研究生', value: 16 },
  { name: '本科', value: 78 },
  { name: '大专', value: 26 },
  { name: '其他', value: 8 },
];

const workingAgeData = [
  { name: '1年下', value: 10 },
  { name: '1-5年', value: 35 },
  { name: '5-10年', value: 42 },
  { name: '10-20年', value: 31 },
  { name: '20年以上', value: 10 },
];

const tenureData = [
  { name: '1年下', value: 22 },
  { name: '1-3年', value: 45 },
  { name: '3-5年', value: 32 },
  { name: '5-10年', value: 21 },
  { name: '10年以上', value: 8 },
];

const politicalData = [
  { name: '党员', value: 38 },
  { name: '团员', value: 25 },
  { name: '群众', value: 61 },
  { name: '其他', value: 4 },
];

const employmentData = [
  { name: '正式', value: 102 },
  { name: '派遣', value: 18 },
  { name: '外包', value: 8 },
];

const frontLinePieData = [
  { name: '一线生产', value: 85 },
  { name: '非一线', value: 43 },
];

const positionData = [
  { name: '管理', value: 15 },
  { name: '技术', value: 58 },
  { name: '职能', value: 35 },
  { name: '业务', value: 20 },
];

const structureData: Record<string, { name: string, value: number }[]> = {
  '职称': [
    { name: '正高级', value: 15 },
    { name: '副高级', value: 30 },
    { name: '高级', value: 55 },
    { name: '中级', value: 33 },
    { name: '初级', value: 80 },
  ],
  '职业资格': [
    { name: '一级建造师', value: 12 },
    { name: '二级建造师', value: 25 },
    { name: '注册造价师', value: 18 },
    { name: '注册安全师', value: 10 },
    { name: '注册消防师', value: 5 },
  ],
  '职业技能': [
    { name: '高级技师', value: 8 },
    { name: '技师', value: 15 },
    { name: '高级工', value: 45 },
    { name: '中级工', value: 60 },
    { name: '初级工', value: 30 },
  ]
};

structureData['全部'] = [
  ...structureData['职称'],
  ...structureData['职业资格'],
  ...structureData['职业技能']
].sort((a, b) => b.value - a.value).slice(0, 6);

const hometownData = [
  { name: '本地', value: 72 },
  { name: '周边', value: 38 },
  { name: '外省', value: 18 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-[#00D4FF]/30 bg-[#0A0A10]/80 p-3 backdrop-blur-xl shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all">
        <p className="mb-2 text-[11px] font-medium tracking-wide text-slate-400 uppercase">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill, boxShadow: `0 0 8px ${entry.color || entry.fill}` }} />
                <span className="text-[11px] text-slate-300">{entry.name || '数值'}</span>
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-wider">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeStructureTab, setActiveStructureTab] = useState('全部');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] p-6 text-slate-200 font-sans selection:bg-[#00D4FF]/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,212,255,0.05),transparent)]">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[40%] bg-[#00D4FF]/10 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* --- HEADER --- */}
        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/5 pb-6">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              <div className="h-8 w-1.5 rounded bg-gradient-to-b from-[#00D4FF] to-[#3B82F6] shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                人员结构分析驾驶舱
              </span>
              <span className="rounded border border-[#00D4FF]/20 bg-[#00D4FF]/10 px-2 py-0.5 text-[10px] font-semibold text-[#00D4FF] uppercase tracking-widest shadow-[inset_0_0_10px_rgba(0,212,255,0.1)]">
                Enterprise
              </span>
            </h1>
            <p className="mt-3 text-[11px] font-mono text-slate-500 flex items-center gap-3 uppercase tracking-widest">
              <Calendar size={14} className="text-[#00D4FF]" />
              <span>截止日期: 2026-12-31</span>
              <span className="h-3 w-[1px] bg-slate-700" />
              <span className="text-[#00D4FF] drop-shadow-[0_0_5px_rgba(0,212,255,0.8)]">{currentTime.toLocaleTimeString()}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg border border-slate-700/50 bg-[#161b22]/50 p-1 backdrop-blur-xl">
              <button className="rounded px-4 py-1.5 text-xs font-semibold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 shadow-[inset_0_0_10px_rgba(0,212,255,0.1)]">全量部门</button>
              <button className="rounded px-4 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all">研发中心</button>
              <button className="rounded px-4 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all">营销部</button>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-800 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-[#161b22]/50 px-4 py-2 text-xs font-medium text-slate-300 hover:border-[#00D4FF]/30 hover:text-[#00D4FF] transition-all backdrop-blur-xl">
                <Filter size={14} /> 筛选器
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 text-xs font-medium text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.15)] hover:bg-[#00D4FF]/20 transition-all backdrop-blur-xl">
                <Download size={14} /> 导出报表
              </button>
              <button className="rounded-lg border border-slate-700/50 bg-[#161b22]/50 p-2 text-slate-400 hover:text-[#00D4FF] transition-all backdrop-blur-xl">
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* --- CORE METRICS --- */}
        <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <MetricCard 
            label="总人数" 
            value={128} 
            unit="人" 
            icon={<Users size={20} />} 
            trend="+2.4% vs last month"
          />
          <MetricCard 
            label="在岗人数" 
            value={122} 
            unit="人" 
            icon={<UserCheck size={20} />} 
            trend="在岗率 95.3%"
          />
          <MetricCard 
            label="从业人数统计" 
            value={128} 
            unit="人" 
            icon={<ShieldCheck size={20} />} 
            trend="历史峰值"
          />
          <MetricCard 
            label="平均年龄" 
            value={34.6} 
            unit="岁" 
            icon={<Clock size={20} />} 
            trend="年轻化趋势 -0.2"
            trendColor="text-blue-400"
          />
          <MetricCard 
            label="男女比例" 
            value="56.3:43.7" 
            icon={<TrendingUp size={20} />} 
            trend="男多女少"
            trendColor="text-orange-400"
          />
        </section>

        {/* --- CHARTS GRID --- */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* 1. 性别分布 */}
          <ChartCard title="性别结构分布">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  <Cell fill="#00D4FF" />
                  <Cell fill="#F43F5E" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs tracking-wider text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 2. 年龄分布 */}
          <ChartCard title="年龄阶梯分布">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barCyan)" radius={[4, 4, 0, 0]} barSize={24}>
                  <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={10} fontFamily="monospace" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 3. 学历构成 */}
          <ChartCard title="学历资质构成">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={educationData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  {educationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 4. 员工工龄分布 */}
          <ChartCard title="员工工龄分布">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workingAgeData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barPurple)" radius={[4, 4, 0, 0]} barSize={24}>
                  <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={10} fontFamily="monospace" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 5. 员工司龄分布 */}
          <ChartCard title="员工司龄分布">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tenureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTenure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#00D4FF" fillOpacity={1} fill="url(#colorTenure)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 6. 政治面貌 */}
          <ChartCard title="政治面貌统计">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={politicalData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  {politicalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 7. 用工类型 */}
          <ChartCard title="用工类型">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employmentData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barEmerald" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barEmerald)" radius={[4, 4, 0, 0]} barSize={28}>
                  <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={10} fontFamily="monospace" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 8. 一线岗位人员占比 */}
          <ChartCard title="一线岗位人员占比">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={frontLinePieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  {frontLinePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#00D4FF' : '#1e293b'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 9. 岗位序列 */}
          <ChartCard title="岗位序列组成">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={positionData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 10. 职称、职业资格、职业技能结构分布 */}
          <ChartCard title="职称、职业资格、职业技能结构分布" className="md:col-span-2">
            <div className="flex h-full w-full gap-4">
              <div className="flex w-24 shrink-0 flex-col justify-center gap-2 border-r border-white/5 pr-4">
                {['全部', '职称', '职业资格', '职业技能'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveStructureTab(tab)}
                    className={`relative overflow-hidden rounded px-3 py-2 text-left text-xs transition-all duration-300 ${
                      activeStructureTab === tab 
                        ? 'bg-gradient-to-r from-[#00D4FF]/20 to-transparent text-[#00D4FF] border-l-2 border-[#00D4FF] font-medium' 
                        : 'border-l-2 border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={structureData[activeStructureTab]} 
                    layout="vertical" 
                    margin={{ top: 10, right: 40, left: 10, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="barCyanHoriz" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.2}/>
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      width={80}
                    />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="url(#barCyanHoriz)" radius={[0, 4, 4, 0]} barSize={16}>
                      <LabelList dataKey="value" position="right" fill="#cbd5e1" fontSize={10} fontFamily="monospace" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ChartCard>

          {/* 11. 人才籍贯分布 */}
          <ChartCard title="人才籍贯分布">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hometownData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  {hometownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 5) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* --- FOOTER DECORATION --- */}
        <footer className="mt-12 pb-6 text-center text-[10px] text-slate-500 uppercase tracking-[0.3em] opacity-50 flex flex-col items-center gap-2">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
          Figma Make HRMS Engine v4.0 • Enterprise Edition • Secure Data Tunnel Active
        </footer>
      </div>
    </div>
  );
}
