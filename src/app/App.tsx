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
  Area
} from 'recharts';
import { ChartCard } from './components/ChartCard';
import { MetricCard } from './components/MetricCard';

// --- DATA DEFINITIONS ---

const COLORS = ['#00D4FF', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6366F1'];

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

const skillsDataMap: Record<string, { name: string, value: number }[]> = {
  '全部': [
    { name: '高级职称', value: 45 },
    { name: '职业资格A类', value: 38 },
    { name: '高级技师', value: 25 },
    { name: '其他持证', value: 60 },
  ],
  '职称': [
    { name: '正高级', value: 15 },
    { name: '副高级', value: 30 },
    { name: '高级', value: 55 },
    { name: '中级', value: 33 },
    { name: '初级', value: 80 },
  ],
  '职业资格': [
    { name: '注册建造师', value: 22 },
    { name: '注册建筑师', value: 12 },
    { name: '注册会计师', value: 18 },
    { name: '法律资格', value: 8 },
  ],
  '职业技能': [
    { name: '高级技师', value: 20 },
    { name: '技师', value: 40 },
    { name: '高级工', value: 60 },
    { name: '中级工', value: 45 },
    { name: '初级工', value: 30 },
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#12121a]/90 p-3 backdrop-blur-md shadow-2xl">
        <p className="mb-1 text-xs font-bold text-slate-300">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-xs text-slate-400">{entry.name || '数值'}:</span>
              <span className="text-xs font-bold text-white">{entry.value}</span>
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
  const [activeSkillTab, setActiveSkillTab] = useState('职称');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] p-6 text-white font-sans selection:bg-[#00D4FF]/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00D4FF]/5 to-transparent" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D4FF]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10">
        {/* --- HEADER --- */}
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
              <div className="h-8 w-1 bg-[#00D4FF] rounded-full" />
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                人员结构分析驾驶舱
              </span>
              <span className="rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-2 py-0.5 text-[10px] font-medium text-[#00D4FF] uppercase tracking-wider">
                Enterprise
              </span>
            </h1>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-2">
              <Calendar size={12} />
              <span>数据截止日期: 2026-12-31</span>
              <span className="h-3 w-[1px] bg-slate-800" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-1">
              <button className="rounded-md px-3 py-1.5 text-xs font-medium bg-[#00D4FF] text-[#050506]">全量部门</button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">研发中心</button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">营销部</button>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-800 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:border-[#00D4FF]/50 transition-all">
                <Filter size={14} /> 筛选器
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-[#00D4FF]/10 hover:text-[#00D4FF] transition-all">
                <Download size={14} /> 导出
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-[#00D4FF]/10 hover:text-[#00D4FF] transition-all">
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
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 2. 年龄分布 */}
          <ChartCard title="年龄阶梯分布">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#00D4FF" radius={[4, 4, 0, 0]} barSize={30} />
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
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  labelLine={false}
                  dataKey="value"
                >
                  {educationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 4. 员工工龄分布 */}
          <ChartCard title="员工工龄分布">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workingAgeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 5. 员工司龄分布 */}
          <ChartCard title="员工司龄分布">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tenureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTenure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorTenure)" strokeWidth={2} />
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
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {politicalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 7. 用工类型 */}
          <ChartCard title="用工类型">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
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
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {frontLinePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : '#1e293b'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
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
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 10. 人员籍贯分布 */}
          <ChartCard title="人员籍贯分布">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hometownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {hometownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 5) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs text-slate-400">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 11. 职称、职业资格、职业技能结构分布 */}
          <ChartCard title="职称、职业资格、职业技能结构分布" className="md:col-span-2">
            <div className="flex h-full gap-4">
              {/* Vertical Tabs */}
              <div className="flex flex-col gap-2 border-r border-white/5 pr-4 pt-2">
                {['全部', '职称', '职业资格', '职业技能'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSkillTab(tab)}
                    className={`whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium transition-all rounded-md ${
                      activeSkillTab === tab 
                        ? 'bg-[#00D4FF]/20 text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.2)]' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Chart Area */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={skillsDataMap[activeSkillTab]} 
                    layout="vertical" 
                    margin={{ top: 10, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#cbd5e1' }}
                      width={100}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#00D4FF" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ChartCard>
        </section>

        {/* --- FOOTER DECORATION --- */}
        <footer className="mt-8 pb-4 text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          Figma Make HRMS Engine v4.0 • Enterprise Edition • Secure Data Tunnel Active
        </footer>
      </div>
    </div>
  );
}
