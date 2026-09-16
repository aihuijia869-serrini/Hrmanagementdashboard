import React, { useState, useMemo, useEffect } from "react";
import {
  Shield,
  BookOpen,
  Award,
  Users,
  Target,
  Trophy,
  RotateCw,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileCheck2,
  BellRing,
  Clock,
  ChevronRight,
  BarChart3,
  Calendar,
  Building2,
  Sparkles,
  Send,
  Layers,
  GraduationCap
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

// ── Static Mock Data ──

// 1. 培训费用指标 (2个环形图数据: 人均培训费用 + 培训预算执行率)
const COST_PER_PERSON = [
  { name: "本年度费用", value: 3000, color: "#2563EB" },
  { name: "预算余量", value: 500, color: "#E2E8F0" },
];

const BUDGET_EXECUTION_RATE = [
  { name: "已执行预算", value: 86.3, color: "#0EA5E9" },
  { name: "未执行预算", value: 13.7, color: "#E2E8F0" },
];

// 2. 报名中课程数据 (列表显示：课程名称、报名截止时间、报名人数)
const ENROLLING_COURSES = [
  { id: 1, name: "2026年合规管理与风险防控班", deadline: "2026-09-25", count: "128人", color: "#2563EB" },
  { id: 2, name: "新一代数字化工具应用实操班", deadline: "2026-09-28", count: "95人", color: "#0EA5E9" },
  { id: 3, name: "施工现场隐患排查双控强化班", deadline: "2026-10-02", count: "142人", color: "#10B981" },
  { id: 4, name: "中层干部卓越领导力研修班", deadline: "2026-10-05", count: "86人", color: "#F59E0B" },
  { id: 5, name: "集团财务制度与税务筹划班", deadline: "2026-10-08", count: "64人", color: "#8B5CF6" },
];

// 3. 培训讲师数据 (柱状图: 内部讲师数 30人, 外部讲师数 25人)
const LECTURER_DATA = [
  { name: "内部讲师", count: 30, color: "#2563EB" },
  { name: "外部讲师", count: 25, color: "#10B981" },
];

// 4. 培训实施进度（实施中课程）(横向条形图)
const IN_PROGRESS_COURSES = [
  { name: "2026年安全生产特种作业考核班", progress: 92.6, rateText: "92.6%", color: "#2563EB" },
  { name: "网络与数据安全合规专项班", progress: 87.4, rateText: "87.4%", color: "#0EA5E9" },
  { name: "国有资产数字化监管实务班", progress: 81.5, rateText: "81.5%", color: "#06B6D4" },
  { name: "工程项目风险防控强化班", progress: 76.9, rateText: "76.9%", color: "#10B981" },
  { name: "中高层领导力提升研修班", progress: 72.4, rateText: "72.4%", color: "#8B5CF6" },
  { name: "新入职员工岗前综合培训班", progress: 69.8, rateText: "69.8%", color: "#6366F1" },
];

// 5. 未执行计划拆分
const UNEXECUTED_PLAN_BREAKDOWN = [
  { name: "待实施计划", count: 18, percentage: "72.0%", color: "#3B82F6" },
  { name: "超期计划", count: 7, percentage: "28.0%", color: "#EF4444" },
];

// 6. 培训计划执行率趋势 (1-9月)
const PLAN_EXECUTION_TREND = [
  { month: "1月", executionRate: 72.4, target: 80.0 },
  { month: "2月", executionRate: 75.8, target: 80.0 },
  { month: "3月", executionRate: 79.2, target: 82.0 },
  { month: "4月", executionRate: 83.5, target: 85.0 },
  { month: "5月", executionRate: 81.0, target: 85.0 },
  { month: "6月", executionRate: 86.8, target: 88.0 },
  { month: "7月", executionRate: 85.4, target: 88.0 },
  { month: "8月", executionRate: 88.2, target: 90.0 },
  { month: "9月", executionRate: 89.6, target: 90.0 },
];

// 7. 培训形式分布 (多 X 轴图数据: 包含形式模式 X1 轴 + 课程维度 X2 轴)
const MULTI_X_TRAINING_MODE_DATA = [
  { mode: "线上培训", category: "平台微课/自学", classCount: 8, peopleCount: 260, color: "#2563EB" },
  { mode: "线下培训", category: "面授/实操演练", classCount: 6, peopleCount: 180, color: "#0EA5E9" },
  { mode: "混合式培训", category: "线上理论+线下考", classCount: 4, peopleCount: 140, color: "#10B981" },
];

// 8. 培训类型分布数据
const TRAINING_TYPE_DISTRIBUTION = [
  { name: "安全合规", count: 28 },
  { name: "业务技能", count: 24 },
  { name: "管理提升", count: 18 },
  { name: "新员工", count: 12 },
  { name: "党建纪检", count: 10 },
  { name: "综合素质", count: 8 },
];

// 9. 未实施计划详情列表 (表头：计划名称、所属组织、计划时间、状态: 超期 / 待实施)
const UNEXECUTED_WARNING_TABLE = [
  { id: "P-01", planName: "2026建工特种资质复审班", org: "工程管理部", planDate: "2026-09-25", status: "超期" },
  { id: "P-02", planName: "智能调度系统应急演练班", org: "运营指挥中心", planDate: "2026-09-28", status: "待实施" },
  { id: "P-03", planName: "新合规准则下的税务统筹班", org: "财务与资产部", planDate: "2026-10-02", status: "待实施" },
  { id: "P-04", planName: "全员消防安全现场演练班", org: "安全监管部", planDate: "2026-09-22", status: "超期" },
];

// 细线导航栏选项
const NAV_TABS = [
  "总览",
  "人员结构分析",
  "人事变动分析",
  "人工成本分析",
  "培训情况分析",
  "工资总额执行分析",
];

// ── Reusable Component: Module Section Header ──
function ModuleHeader({ title, subtext, action }: { title: string; subtext?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-2 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-[3px] h-4 rounded-full bg-gradient-to-b from-[#2563EB] to-[#0EA5E9]" />
        <h3 className="text-[14px] font-bold text-[#0F172A] tracking-wide flex items-center gap-1.5">
          {title}
        </h3>
        {subtext && <span className="text-[11px] text-[#64748B] font-normal">{subtext}</span>}
      </div>
      {action}
    </div>
  );
}

// ── Reusable Custom Tooltip for Recharts ──
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-[#E2E8F0] shadow-lg rounded-lg px-3 py-2 text-[12px] z-50">
        <p className="font-semibold text-[#0F172A] mb-1">{label || payload[0]?.payload?.mode}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-item-${index}`} className="flex items-center gap-2 text-[#475569] my-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            <span>{entry.name}:</span>
            <span className="font-mono font-bold text-[#0F172A]">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function App() {
  const [scale, setScale] = useState(1);
  const [activeTab, setActiveTab] = useState("培训情况分析");
  const [mode, setMode] = useState<"single" | "combined">("single");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Responsive 1920x1080 Scale Transform Calculation
  useEffect(() => {
    const updateScale = () => {
      const sw = window.innerWidth / 1920;
      const sh = window.innerHeight / 1080;
      setScale(Math.min(sw, sh));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Handle Refresh Action
  const handleRefresh = () => {
    setIsRefreshing(true);
    setNotification("数据驾驶舱已同步最新状态");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle Fullscreen Toggle
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Floating ambient light particles
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: `p-${i}`,
        size: 2 + (i % 3),
        top: `${(i * 29 + 11) % 94}%`,
        left: `${(i * 43 + 7) % 96}%`,
        dur: 6 + (i % 5),
        delay: i * 0.3,
      })),
    []
  );

  // Dynamic KPI Values based on Mode ("single" vs "combined")
  const kpiValues = useMemo(() => {
    if (mode === "single") {
      return {
        classCount: { current: "2", previous: "0", rate: "0 %" },
        peopleCount: { current: "6", previous: "0", rate: "0 %" },
        cost: { current: "0", previous: "0", rate: "0 %" },
        classHours: { current: "29", previous: "0", rate: "0 %" },
        studentHours: { current: "30", previous: "0", rate: "0 %" },
      };
    }
    return {
      classCount: { current: "18", previous: "12", rate: "+50.0 %" },
      peopleCount: { current: "3,850", previous: "2,920", rate: "+31.8 %" },
      cost: { current: "128.5", previous: "105.0", rate: "+22.4 %" },
      classHours: { current: "360", previous: "280", rate: "+28.6 %" },
      studentHours: { current: "48,200", previous: "38,500", rate: "+25.2 %" },
    };
  }, [mode]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#F8FAFC",
        position: "relative",
      }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-4 left-1/2 z-50 bg-[#0F172A] text-white px-4 py-2 rounded-full text-[12px] font-medium shadow-xl flex items-center gap-2 border border-[#334155]"
          >
            <Sparkles size={14} className="text-[#0EA5E9]" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed 1920x1080 Canvas Container */}
      <div
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
        {/* Background Gradient & Tech Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EEF4FA]" />
        <div className="absolute inset-0 bg-grid-tech pointer-events-none opacity-80" />
        <div className="absolute top-[220px] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#2563EB]/10 via-[#0EA5E9]/5 to-transparent blur-[120px] pointer-events-none" />

        {/* Floating micro particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#2563EB]/25 pointer-events-none"
            style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* ── 顶部通栏 HEADER (90px Height) ── */}
        <header className="absolute top-0 left-0 right-0 h-[90px] bg-white/85 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_2px_16px_rgba(37,99,235,0.06)] z-30 flex flex-col justify-between px-10 py-2">
          
          {/* Top row */}
          <div className="flex items-center justify-between w-full">
            
            {/* Top-Left: Group Logo Badge */}
            <div className="flex items-center gap-3 min-w-[320px]">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white px-3 py-1 rounded-lg shadow-sm">
                <Building2 size={16} />
                <span className="text-[13px] font-extrabold tracking-wider">惠州城投集团</span>
              </div>
              <span className="text-[11px] text-[#64748B] font-medium hidden md:inline">
                人力资源数据指挥中心
              </span>
            </div>

            {/* 居中标题：“人力资源结构分析驾驶舱” */}
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[25px] font-extrabold tracking-[0.14em] text-[#0F172A] whitespace-nowrap drop-shadow-sm"
            >
              人力资源结构分析驾驶舱
            </motion.h1>

            {/* Top-Right Action Controls */}
            <div className="flex items-center gap-2 min-w-[320px] justify-end">
              <button
                onClick={handleRefresh}
                title="刷新数据"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all active:scale-95"
              >
                <RotateCw size={14} className={isRefreshing ? "animate-spin text-[#2563EB]" : ""} />
              </button>
              <button
                onClick={handleFullscreen}
                title="全屏模式"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all active:scale-95"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Sub-Navigation thin bar (标题下方细线导航栏，默认“培训情况分析”高亮) */}
          <div className="flex items-center justify-center gap-8 pb-1 border-t border-[#E2E8F0]/60 pt-1">
            {NAV_TABS.map((tab) => (
              <button
                key={`nav-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`text-[12px] font-medium relative pb-1 transition-all ${
                  activeTab === tab
                    ? "text-[#2563EB] font-bold"
                    : "text-[#64748B] hover:text-[#334155]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-[#0EA5E9]"
                  />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* ── MAIN CONTENT AREA (Top 90px to Bottom 0) ── */}
        <div className="absolute top-[90px] bottom-0 left-0 right-0 px-8 pt-3 pb-3 flex flex-col gap-2.5 overflow-hidden">
          
          {/* ── (二) 核心 KPI 指标行（培训整体情况） (5 胶囊式指标卡, Height ~85px) ── */}
          <div className="grid grid-cols-5 gap-3.5 h-[85px] shrink-0">
            
            {/* KPI 1: 培训班总数 (珊瑚粉图标) */}
            <div className="glass-card px-4 py-1.5 flex items-center justify-between group shadow-[0_4px_16px_rgba(244,63,94,0.06)] border-[#F43F5E]/20">
              <div className="shimmer-line" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F43F5E]/15 to-[#FB7185]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] shadow-sm shrink-0">
                  <GraduationCap size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#0F172A]">培训班总数</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[22px] font-black font-mono text-[#0F172A] tracking-tight">
                      {kpiValues.classCount.current}
                    </span>
                    <span className="text-[10px] text-[#64748B]">个</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-[10px] text-[#64748B] gap-0.5 font-mono">
                <span>本年度: <strong className="text-[#0F172A]">{kpiValues.classCount.current}</strong></span>
                <span>上年度: <strong>{kpiValues.classCount.previous}</strong></span>
                <span className="text-[#10B981] font-bold flex items-center">
                  增长率: {kpiValues.classCount.rate}
                </span>
              </div>
            </div>

            {/* KPI 2: 培训人次 (薄荷绿图标) */}
            <div className="glass-card px-4 py-1.5 flex items-center justify-between group shadow-[0_4px_16px_rgba(16,185,129,0.06)] border-[#10B981]/20">
              <div className="shimmer-line" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#10B981]/15 to-[#34D399]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shadow-sm shrink-0">
                  <Users size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#0F172A]">培训人次</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[22px] font-black font-mono text-[#0F172A] tracking-tight">
                      {kpiValues.peopleCount.current}
                    </span>
                    <span className="text-[10px] text-[#64748B]">人次</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-[10px] text-[#64748B] gap-0.5 font-mono">
                <span>本年度: <strong className="text-[#0F172A]">{kpiValues.peopleCount.current}</strong></span>
                <span>上年度: <strong>{kpiValues.peopleCount.previous}</strong></span>
                <span className="text-[#10B981] font-bold flex items-center">
                  增长率: {kpiValues.peopleCount.rate}
                </span>
              </div>
            </div>

            {/* KPI 3: 培训总费用（万元） (暖橙色图标) */}
            <div className="glass-card px-4 py-1.5 flex items-center justify-between group shadow-[0_4px_16px_rgba(245,158,11,0.06)] border-[#F59E0B]/20">
              <div className="shimmer-line" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F59E0B]/15 to-[#FBBF24]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shadow-sm shrink-0">
                  <Award size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#0F172A]">培训总费用（万元）</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[22px] font-black font-mono text-[#0F172A] tracking-tight">
                      {kpiValues.cost.current}
                    </span>
                    <span className="text-[10px] text-[#64748B]">万元</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-[10px] text-[#64748B] gap-0.5 font-mono">
                <span>本年度: <strong className="text-[#0F172A]">{kpiValues.cost.current}</strong></span>
                <span>上年度: <strong>{kpiValues.cost.previous}</strong></span>
                <span className="text-[#10B981] font-bold flex items-center">
                  增长率: {kpiValues.cost.rate}
                </span>
              </div>
            </div>

            {/* KPI 4: 培训班总学时（小时） (政务蓝图标) */}
            <div className="glass-card px-4 py-1.5 flex items-center justify-between group shadow-[0_4px_16px_rgba(37,99,235,0.06)] border-[#2563EB]/20">
              <div className="shimmer-line" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2563EB]/15 to-[#60A5FA]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] shadow-sm shrink-0">
                  <Clock size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#0F172A]">培训班总学时（小时）</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[22px] font-black font-mono text-[#0F172A] tracking-tight">
                      {kpiValues.classHours.current}
                    </span>
                    <span className="text-[10px] text-[#64748B]">小时</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-[10px] text-[#64748B] gap-0.5 font-mono">
                <span>本年度: <strong className="text-[#0F172A]">{kpiValues.classHours.current}</strong></span>
                <span>上年度: <strong>{kpiValues.classHours.previous}</strong></span>
                <span className="text-[#10B981] font-bold flex items-center">
                  增长率: {kpiValues.classHours.rate}
                </span>
              </div>
            </div>

            {/* KPI 5: 学员总学时（小时） (天蓝色图标) */}
            <div className="glass-card px-4 py-1.5 flex items-center justify-between group shadow-[0_4px_16px_rgba(14,165,233,0.06)] border-[#0EA5E9]/20">
              <div className="shimmer-line" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/15 to-[#38BDF8]/10 border border-[#0EA5E9]/30 flex items-center justify-center text-[#0EA5E9] shadow-sm shrink-0">
                  <Target size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#0F172A]">学员总学时（小时）</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[22px] font-black font-mono text-[#0F172A] tracking-tight">
                      {kpiValues.studentHours.current}
                    </span>
                    <span className="text-[10px] text-[#64748B]">小时</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-[10px] text-[#64748B] gap-0.5 font-mono">
                <span>本年度: <strong className="text-[#0F172A]">{kpiValues.studentHours.current}</strong></span>
                <span>上年度: <strong>{kpiValues.studentHours.previous}</strong></span>
                <span className="text-[#10B981] font-bold flex items-center">
                  增长率: {kpiValues.studentHours.rate}
                </span>
              </div>
            </div>

          </div>

          {/* ── MIDDLE GRID (Left Info Column + Center Main Visual + Right Info Column, Height ~570px) ── */}
          <div className="grid grid-cols-12 gap-3.5 h-[565px] shrink-0">
            
            {/* ── LEFT INFO COLUMN (3 Cols) ── */}
            <div className="col-span-3 flex flex-col gap-3 h-full overflow-hidden">
              
              {/* Left Card 1: 培训费用指标 */}
              <div className="glass-card p-3 flex flex-col h-[200px]">
                <div className="shimmer-line" />
                <ModuleHeader title="培训费用指标" subtext="费用与预算执行概况" />
                
                <div className="grid grid-cols-2 gap-2 h-full mt-0.5 items-center">
                  {/* 环形图 1: 人均培训费用 */}
                  <div className="flex flex-col items-center bg-slate-50/80 p-2 rounded-xl border border-slate-200/60 h-full justify-between">
                    <span className="text-[11px] font-bold text-[#0F172A]">人均培训费用</span>
                    <div className="w-[85px] h-[85px] relative my-0.5">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={COST_PER_PERSON} innerRadius={28} outerRadius={40} paddingAngle={2} dataKey="value">
                            {COST_PER_PERSON.map((entry, idx) => (
                              <Cell key={`cost-cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[12px] font-black font-mono text-[#0F172A]">3000元</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-[9.5px] text-[#64748B] font-mono leading-tight">
                      <span>上年度: 1,620元</span>
                      <span className="text-[#10B981] font-bold">增减率: +14.2%</span>
                    </div>
                  </div>

                  {/* 环形图 2: 培训预算执行率 */}
                  <div className="flex flex-col items-center bg-slate-50/80 p-2 rounded-xl border border-slate-200/60 h-full justify-between">
                    <span className="text-[11px] font-bold text-[#0F172A]">培训预算执行率</span>
                    <div className="w-[85px] h-[85px] relative my-0.5">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={BUDGET_EXECUTION_RATE} innerRadius={28} outerRadius={40} paddingAngle={2} dataKey="value">
                            {BUDGET_EXECUTION_RATE.map((entry, idx) => (
                              <Cell key={`budget-cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[12px] font-black font-mono text-[#0F172A]">86.3%</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-[9.5px] text-[#64748B] font-mono leading-tight">
                      <span>上年度: 78.5%</span>
                      <span className="text-[#10B981] font-bold">增减率: +7.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Card 2: 报名中课程 (列表显示：课程名称、报名截止时间、报名人数) */}
              <div className="glass-card p-3 flex flex-col h-[205px]">
                <div className="shimmer-line" />
                <ModuleHeader title="报名中课程" subtext="课程排期与预选概况" />
                <div className="flex flex-col gap-1.5 overflow-y-auto pr-0.5 mt-0.5 flex-1">
                  {ENROLLING_COURSES.map((course) => (
                    <div
                      key={`enrolling-${course.id}`}
                      className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-slate-100/80 transition-all text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: course.color }} />
                        <span className="font-medium text-[#0F172A] truncate" title={course.name}>
                          {course.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 font-mono text-[10.5px]">
                        <span className="text-[#64748B]">截止: {course.deadline.slice(5)}</span>
                        <span className="font-bold text-[#2563EB] bg-[#2563EB]/10 px-1.5 py-0.5 rounded">
                          {course.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Left Card 3: 培训讲师 (柱状图: 内部讲师数 30人, 外部讲师数 25人) */}
              <div className="glass-card p-3 flex flex-col flex-1">
                <div className="shimmer-line" />
                <ModuleHeader title="培训讲师" subtext="内部 vs 外部师资结构 (人)" />
                <div className="flex-1 min-h-0 w-full mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={LECTURER_DATA} margin={{ top: 15, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }} />
                      <YAxis tick={{ fontSize: 10, fill: "#64748B" }} domain={[0, 40]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" name="讲师人数" radius={[6, 6, 0, 0]} barSize={32}>
                        {LECTURER_DATA.map((entry, index) => (
                          <Cell key={`lecturer-cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* ── CENTER MAIN VISUAL ZONE (6 Cols) ── */}
            <div className="col-span-6 flex flex-col h-full overflow-hidden">
              <div className="glass-card p-4 flex flex-col h-full justify-between relative">
                <div className="shimmer-line" />
                
                {/* Center Upper Control / Filter Bar */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0]/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-[14px] font-bold text-[#0F172A] tracking-wider">
                      培训情况分析
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-[#E2E8F0] rounded-lg text-[11px] font-mono text-[#475569]">
                      <Calendar size={12} className="text-[#2563EB]" />
                      <span>统计日期 2026-01-01 至 2026-12-31</span>
                    </div>

                    <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg border border-[#E2E8F0]">
                      <button
                        onClick={() => setMode("single")}
                        className={`px-2.5 py-0.5 text-[11px] rounded transition-all font-medium ${
                          mode === "single"
                            ? "bg-[#2563EB] text-white shadow-sm font-bold"
                            : "text-[#64748B] hover:text-[#334155]"
                        }`}
                      >
                        单户分析
                      </button>
                      <button
                        onClick={() => setMode("combined")}
                        className={`px-2.5 py-0.5 text-[11px] rounded transition-all font-medium ${
                          mode === "combined"
                            ? "bg-[#2563EB] text-white shadow-sm font-bold"
                            : "text-[#64748B] hover:text-[#334155]"
                        }`}
                      >
                        合并分析
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Central Visual Graphic: Shield + Book + Data Nodes */}
                <div className="relative flex-1 flex flex-col items-center justify-center my-1">
                  
                  {/* Outer Glowing Rings */}
                  <div className="absolute w-[330px] h-[330px] rounded-full border border-[#2563EB]/15 animate-[spin_25s_linear_infinite] pointer-events-none" />
                  <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#0EA5E9]/25 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />
                  <div className="absolute w-[230px] h-[230px] rounded-full bg-gradient-to-tr from-[#2563EB]/10 to-[#0EA5E9]/10 blur-xl pointer-events-none" />

                  {/* SVG Connection Lines & Orbit Nodes */}
                  <svg className="absolute w-[350px] h-[350px] pointer-events-none" viewBox="0 0 350 350">
                    <line x1="175" y1="175" x2="60" y2="65" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="175" y1="175" x2="290" y2="65" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="175" y1="175" x2="60" y2="285" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="175" y1="175" x2="290" y2="285" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <circle cx="60" cy="65" r="4" fill="#2563EB" />
                    <circle cx="290" cy="65" r="4" fill="#0EA5E9" />
                    <circle cx="60" cy="285" r="4" fill="#10B981" />
                    <circle cx="290" cy="285" r="4" fill="#8B5CF6" />
                  </svg>

                  {/* Shield + Book Main Center Graphic Node */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-36 h-36 rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#0EA5E9] to-[#06B6D4] p-1 shadow-[0_12px_40px_rgba(37,99,235,0.3)] flex items-center justify-center z-10"
                  >
                    <div className="w-full h-full rounded-[22px] bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white relative overflow-hidden">
                      <Shield size={58} className="text-white drop-shadow-md" />
                      <div className="absolute inset-0 flex items-center justify-center pt-2">
                        <BookOpen size={28} className="text-white/90 drop-shadow" />
                      </div>
                      <span className="text-[11px] font-black tracking-widest uppercase mt-2 text-white/95">
                        培训情况分析
                      </span>
                    </div>
                  </motion.div>

                  {/* 在开班级：18个 ，参加学员数：580人 */}
                  <div className="absolute -top-1 bg-white/95 border border-[#2563EB]/30 shadow-md rounded-full px-4 py-1 flex items-center gap-4 text-[12px] z-20">
                    <span className="font-bold text-[#0F172A] flex items-center gap-1">
                      <GraduationCap size={15} className="text-[#2563EB]" />
                      在开班级: <strong className="font-mono text-[14px] text-[#2563EB]">18</strong> 个
                    </span>
                    <span className="w-1 h-3 bg-[#E2E8F0]" />
                    <span className="font-bold text-[#0F172A] flex items-center gap-1">
                      <Users size={15} className="text-[#0EA5E9]" />
                      参加学员数: <strong className="font-mono text-[14px] text-[#0EA5E9]">580</strong> 人
                    </span>
                  </div>

                  {/* 4 Corner Satellite Data Badges */}
                  <div className="absolute top-10 left-4 bg-white/90 border border-[#2563EB]/20 shadow-md rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    <span className="text-[11px] font-medium text-[#475569]">人均培训学时:</span>
                    <span className="text-[13px] font-mono font-extrabold text-[#2563EB]">48.2 小时</span>
                  </div>

                  <div className="absolute top-10 right-4 bg-white/90 border border-[#0EA5E9]/20 shadow-md rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                    <span className="text-[11px] font-medium text-[#475569]">人均培训费用:</span>
                    <span className="text-[13px] font-mono font-extrabold text-[#0EA5E9]">3000 元</span>
                  </div>

                  <div className="absolute bottom-10 left-4 bg-white/90 border border-[#10B981]/20 shadow-md rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-[11px] font-medium text-[#475569]">课程报名率:</span>
                    <span className="text-[13px] font-mono font-extrabold text-[#10B981]">98.2%</span>
                  </div>

                  <div className="absolute bottom-10 right-4 bg-white/90 border border-[#8B5CF6]/20 shadow-md rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <span className="text-[11px] font-medium text-[#475569]">课程满意度:</span>
                    <span className="text-[13px] font-mono font-extrabold text-[#8B5CF6]">98%</span>
                  </div>
                </div>

                {/* Bottom visual section: 3 组数据指标 */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50/80 p-3 rounded-2xl border border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] font-mono font-bold text-[13px] shrink-0">
                      89.6%
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-[#0F172A]">计划完成率</span>
                      <span className="text-[10px] text-[#64748B]">按期开班执行率</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center text-[#0EA5E9] font-mono font-bold text-[13px] shrink-0">
                      55
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-[#0F172A]">计划内培训数</span>
                      <span className="text-[10px] text-[#64748B]">年度大纲预定项目</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] font-mono font-bold text-[13px] shrink-0">
                      35
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-[#0F172A]">计划外培训数</span>
                      <span className="text-[10px] text-[#64748B]">临时响应与专项评估</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── RIGHT INFO COLUMN (3 Cols) ── */}
            <div className="col-span-3 flex flex-col gap-3 h-full overflow-hidden">
              
              {/* Right Card 1: 培训实施进度（实施中课程） */}
              <div className="glass-card p-3 flex flex-col h-[325px]">
                <div className="shimmer-line" />
                <ModuleHeader title="培训实施进度" subtext="实施中课程完成度 (%)" />
                
                <div className="flex flex-col gap-2 mt-1 flex-1 overflow-y-auto pr-0.5">
                  {IN_PROGRESS_COURSES.map((item, index) => (
                    <div key={`course-progress-${index}`} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11.5px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-extrabold font-mono text-white shrink-0 ${
                              index === 0
                                ? "bg-[#F59E0B]"
                                : index === 1
                                ? "bg-[#0EA5E9]"
                                : index === 2
                                ? "bg-[#10B981]"
                                : "bg-[#94A3B8]"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="font-semibold text-[#0F172A] truncate" title={item.name}>
                            {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-extrabold text-[12px] text-[#0F172A] shrink-0 ml-1">
                          {item.rateText}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${item.color} 0%, #0EA5E9 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Card 2: 未执行计划 */}
              <div className="glass-card p-3 flex flex-col flex-1">
                <div className="shimmer-line" />
                <ModuleHeader title="未执行计划" subtext="待实施与超期预警" />
                
                <div className="flex items-center gap-3 mt-1 flex-1">
                  <div className="flex flex-col items-center justify-center bg-amber-50/80 border border-amber-200/80 rounded-2xl p-2.5 shrink-0 w-[110px]">
                    <span className="text-[10px] font-bold text-amber-700">未执行总计划</span>
                    <span className="text-[22px] font-black font-mono text-amber-600 my-0.5">25</span>
                    <span className="text-[9.5px] text-[#64748B]">待实施/超期计划</span>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    {UNEXECUTED_PLAN_BREAKDOWN.map((item, idx) => (
                      <div key={`uep-item-${idx}`} className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#475569] font-medium">{item.name}</span>
                          <span className="font-mono font-bold text-[#0F172A]">{item.count} 项 ({item.percentage})</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: item.percentage, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                    <Clock size={12} className="text-[#EF4444]" />
                    <span>7 项超期计划需重点督办</span>
                  </span>
                  <button
                    onClick={() => {
                      setNotification("督办通知已推送至相关责任部门负责人");
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="flex items-center gap-1 bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all shadow-sm active:scale-95"
                  >
                    <Send size={11} />
                    <span>一键督办</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ── BOTTOM ANALYSIS AREA (4 Cards, Height ~280px) ── */}
          <div className="grid grid-cols-12 gap-3.5 h-[275px] shrink-0">
            
            {/* Bottom Card 1: 培训计划执行率趋势 */}
            <div className="col-span-3 glass-card p-3 flex flex-col h-full">
              <div className="shimmer-line" />
              <ModuleHeader title="培训计划执行率趋势" subtext="1-9月月度走势 (%)" />
              <div className="flex-1 min-h-0 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PLAN_EXECUTION_TREND} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorExec" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B" }} />
                    <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: "#64748B" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="executionRate" name="执行率" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExec)" />
                    <Line type="monotone" dataKey="target" name="目标线" stroke="#F59E0B" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Card 2: 培训形式分布 (多 X 轴图: 双 X 轴维度展示) */}
            <div className="col-span-3 glass-card p-3 flex flex-col h-full">
              <div className="shimmer-line" />
              <ModuleHeader title="培训形式分布" subtext="多 X 轴维度 (形式/主模式/班次)" />
              <div className="flex-1 min-h-0 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MULTI_X_TRAINING_MODE_DATA} margin={{ top: 22, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    {/* Primary X-Axis at bottom: 培训形式 */}
                    <XAxis xAxisId="mode" dataKey="mode" tick={{ fontSize: 11, fill: "#0F172A", fontWeight: 700 }} />
                    {/* Secondary X-Axis at top: 课程模式分类 */}
                    <XAxis xAxisId="category" dataKey="category" orientation="top" tick={{ fontSize: 9.5, fill: "#64748B" }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#64748B" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar xAxisId="mode" yAxisId="left" dataKey="classCount" name="班级数量 (个)" radius={[6, 6, 0, 0]} barSize={26}>
                      {MULTI_X_TRAINING_MODE_DATA.map((entry, index) => (
                        <Cell key={`multi-x-bar-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Card 3: 培训类型分布 */}
            <div className="col-span-3 glass-card p-3 flex flex-col h-full">
              <div className="shimmer-line" />
              <ModuleHeader title="培训类型分布" subtext="各类班级数 (个)" />
              <div className="flex-1 min-h-0 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TRAINING_TYPE_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} interval={0} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748B" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="班级数量" radius={[4, 4, 0, 0]} barSize={14}>
                      {TRAINING_TYPE_DISTRIBUTION.map((_, index) => (
                        <Cell key={`type-dist-${index}`} fill={index % 2 === 0 ? "#0EA5E9" : "#2563EB"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Card 4: 未实施计划详情 */}
            <div className="col-span-3 glass-card p-3 flex flex-col h-full">
              <div className="shimmer-line" />
              <ModuleHeader title="未实施计划详情" subtext="重点跟踪与状态督办" />
              
              <div className="flex-1 overflow-x-auto overflow-y-auto mt-1 border border-[#E2E8F0] rounded-xl bg-white/60">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100/80 text-[#64748B] font-semibold sticky top-0 border-b border-[#E2E8F0]">
                    <tr>
                      <th className="py-1.5 px-2">计划名称</th>
                      <th className="py-1.5 px-2">所属组织</th>
                      <th className="py-1.5 px-2 text-center">计划时间</th>
                      <th className="py-1.5 px-2 text-center">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#334155]">
                    {UNEXECUTED_WARNING_TABLE.map((row) => (
                      <tr key={`unexec-detail-${row.id}`} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2 font-bold text-[#0F172A] truncate max-w-[120px]" title={row.planName}>
                          {row.planName}
                        </td>
                        <td className="py-1.5 px-2 whitespace-nowrap text-[#475569]">
                          {row.org}
                        </td>
                        <td className="py-1.5 px-2 text-center font-mono text-[10px] whitespace-nowrap">
                          {row.planDate}
                        </td>
                        <td className="py-1.5 px-2 text-center whitespace-nowrap">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                              row.status === "超期"
                                ? "bg-rose-100 text-rose-700 border border-rose-200"
                                : "bg-amber-100 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
