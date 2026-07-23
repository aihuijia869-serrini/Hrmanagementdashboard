import React, { useState } from 'react';
import {
  Users, UserCheck, Clock, GraduationCap, TrendingUp, ShieldCheck
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, LabelList 
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { MetricCard } from '../components/MetricCard';

const COLORS = ['#00D4FF', '#4338CA', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4'];

const genderData = [
  { id: 'gender-male', name: '男', value: 72, percent: '56.3%' },
  { id: 'gender-female', name: '女', value: 56, percent: '43.7%' },
];

const ageData = [
  { id: 'age-under-25', name: '25以下', value: 18 },
  { id: 'age-25-34', name: '25-34', value: 52 },
  { id: 'age-35-44', name: '35-44', value: 38 },
  { id: 'age-45-54', name: '45-54', value: 16 },
  { id: 'age-over-55', name: '55以上', value: 4 },
];

const educationData = [
  { id: 'edu-graduate', name: '研究生', value: 16 },
  { id: 'edu-bachelor', name: '本科', value: 78 },
  { id: 'edu-associate', name: '大专', value: 26 },
  { id: 'edu-other', name: '其他', value: 8 },
];

const workingAgeData = [
  { id: 'working-under-1', name: '1年下', value: 10 },
  { id: 'working-1-5', name: '1-5年', value: 35 },
  { id: 'working-5-10', name: '5-10年', value: 42 },
  { id: 'working-10-20', name: '10-20年', value: 31 },
  { id: 'working-over-20', name: '20年以上', value: 10 },
];

const tenureData = [
  { id: 'tenure-under-1', name: '1年下', value: 22 },
  { id: 'tenure-1-3', name: '1-3年', value: 45 },
  { id: 'tenure-3-5', name: '3-5年', value: 32 },
  { id: 'tenure-5-10', name: '5-10年', value: 21 },
  { id: 'tenure-over-10', name: '10年以上', value: 8 },
];

const politicalData = [
  { id: 'political-party', name: '党员', value: 38 },
  { id: 'political-league', name: '团员', value: 25 },
  { id: 'political-public', name: '群众', value: 61 },
  { id: 'political-other', name: '其他', value: 4 },
];

const employmentData = [
  { id: 'employment-regular', name: '正式', value: 102 },
  { id: 'employment-dispatch', name: '派遣', value: 18 },
  { id: 'employment-outsource', name: '外包', value: 8 },
];

const frontLinePieData = [
  { id: 'frontline-production', name: '一线生产', value: 85 },
  { id: 'frontline-nonProduction', name: '非一线', value: 43 },
];

const positionData = [
  { id: 'position-management', name: '管理', value: 15 },
  { id: 'position-technical', name: '技术', value: 58 },
  { id: 'position-functional', name: '职能', value: 35 },
  { id: 'position-business', name: '业务', value: 20 },
];

const structureData: Record<string, { id: string, name: string, value: number }[]> = {
  '职称': [
    { id: 'title-senior-high', name: '正高级', value: 15 },
    { id: 'title-deputy-high', name: '副高级', value: 30 },
    { id: 'title-high', name: '高级', value: 55 },
    { id: 'title-middle', name: '中级', value: 33 },
    { id: 'title-junior', name: '初级', value: 80 },
  ],
  '职业资格': [
    { id: 'qual-constructor-1', name: '一级建造师', value: 12 },
    { id: 'qual-constructor-2', name: '二级建造师', value: 25 },
    { id: 'qual-cost-engineer', name: '注册造价师', value: 18 },
    { id: 'qual-safety-engineer', name: '注册安全师', value: 10 },
    { id: 'qual-fire-engineer', name: '注册消防师', value: 5 },
  ],
  '职业技能': [
    { id: 'skill-senior-technician', name: '高级技师', value: 8 },
    { id: 'skill-technician', name: '技师', value: 15 },
    { id: 'skill-senior-worker', name: '高级工', value: 45 },
    { id: 'skill-middle-worker', name: '中级工', value: 60 },
    { id: 'skill-junior-worker', name: '初级工', value: 30 },
  ]
};

structureData['全部'] = [
  ...structureData['职称'],
  ...structureData['职业资格'],
  ...structureData['职业技能']
].sort((a, b) => b.value - a.value).slice(0, 6);

const hometownData = [
  { id: 'hometown-local', name: '本地', value: 72 },
  { id: 'hometown-nearby', name: '周边', value: 38 },
  { id: 'hometown-outprovince', name: '外省', value: 18 },
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

export const PersonnelStructure = () => {
  const [activeStructureTab, setActiveStructureTab] = useState('全部');

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
      {/* KPI Metrics */}
      <section>
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-4 bg-[#165DFF] rounded-r-md mr-2 dark:shadow-[0_0_8px_#165DFF]"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wider">人员结构分析</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <MetricCard label="总人数" value={128} unit="人" icon={<Users size={20} />} trend="+2.4% vs last month" />
          <MetricCard label="在岗人数" value={122} unit="人" icon={<UserCheck size={20} />} trend="在岗率 95.3%" />
          <MetricCard label="从业人数统计" value={128} unit="人" icon={<ShieldCheck size={20} />} trend="历史峰值" />
          <MetricCard label="平均年龄" value={34.6} unit="岁" icon={<Clock size={20} />} trend="年轻化趋势 -0.2" trendColor="text-blue-400" />
          <MetricCard label="男女比例" value="56.3:43.7" icon={<TrendingUp size={20} />} trend="男多女少" trendColor="text-orange-400" />
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-1">
        <ChartCard title="性别结构分布">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart accessibilityLayer={false}>
              <Pie data={genderData} cx="50%" cy="45%" innerRadius={55} outerRadius={75} paddingAngle={6} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                <Cell fill="#00D4FF" />
                <Cell fill="#F43F5E" />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-xs tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="年龄阶梯分布">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <BarChart accessibilityLayer={false} data={ageData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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

        <ChartCard title="学历资质构成">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart accessibilityLayer={false}>
              <Pie data={educationData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                {educationData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="员工工龄分布">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <BarChart accessibilityLayer={false} data={workingAgeData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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

        <ChartCard title="员工司龄分布">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <AreaChart accessibilityLayer={false} data={tenureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        <ChartCard title="政治面貌统计">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart accessibilityLayer={false}>
              <Pie data={politicalData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                {politicalData.map((entry, index) => <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="用工类型">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <BarChart accessibilityLayer={false} data={employmentData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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

        <ChartCard title="一线岗位人员占比">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart accessibilityLayer={false}>
              <Pie data={frontLinePieData} cx="50%" cy="45%" innerRadius={55} outerRadius={75} paddingAngle={6} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                {frontLinePieData.map((entry, index) => <Cell key={entry.id} fill={index === 0 ? '#00D4FF' : '#1e293b'} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="岗位序列组成">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart accessibilityLayer={false}>
              <Pie data={positionData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                {positionData.map((entry, index) => <Cell key={entry.id} fill={COLORS[(index + 3) % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

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
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <BarChart accessibilityLayer={false} data={structureData[activeStructureTab]} layout="vertical" margin={{ top: 10, right: 40, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barCyanHoriz" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={80} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="url(#barCyanHoriz)" radius={[0, 4, 4, 0]} barSize={16}>
                    <LabelList dataKey="value" position="right" fill="#cbd5e1" fontSize={10} fontFamily="monospace" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="人才籍贯分布">
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <PieChart accessibilityLayer={false}>
              <Pie data={hometownData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
                {hometownData.map((entry, index) => <Cell key={entry.id} fill={COLORS[(index + 5) % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-[11px] tracking-wider text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
};
