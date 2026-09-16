import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Treemap,
} from "recharts";
import {
  Users,
  ShieldCheck,
  UserCheck,
  Clock,
  Scale,
  RotateCw,
  Download,
  Maximize2,
  Building2,
  Award,
  Landmark,
} from "lucide-react";

/* ═══════════════════════════ DESIGN TOKENS & DATA ═══════════════════════════ */

// 1. 学历结构
const educationData = [
  { name: "研究生及以上", note: "含博士1人", value: 50, pct: 4.9, color: "#2563EB" },
  { name: "本科", value: 542, pct: 53.19, color: "#0EA5E9" },
  { name: "大专及以下", value: 412, pct: 40.43, color: "#10B981" },
  { name: "无数据", value: 15, pct: 1.47, color: "#94A3B8" },
];

// 2. 政治面貌 (调换至底部分析区 40% 大卡片)
const politicalData = [
  { name: "党员", value: 400, pct: "38.66%", color: "#2563EB" },
  { name: "群众", value: 514, pct: "49.66%", color: "#0EA5E9" },
  { name: "共青团员", value: 18, pct: "1.77%", color: "#F97316" },
  { name: "民主党派", value: 2, pct: "0.20%", color: "#8B5CF6" },
  { name: "无数据", value: 101, pct: "9.71%", color: "#94A3B8" },
];

// 3. 籍贯分布 (紧凑型玫瑰图数据: 广东高亮绿811人 78.59%)
const nativePlaceData = [
  { name: "广东省", value: 811, pct: "78.59%", color: "#10B981" },
  { name: "广西省", value: 83, pct: "8.02%", color: "#0EA5E9" },
  { name: "湖南省", value: 52, pct: "5.02%", color: "#38BDF8" },
  { name: "湖北省", value: 28, pct: "2.71%", color: "#818CF8" },
  { name: "四川省", value: 21, pct: "2.03%", color: "#A7F3D0" },
  { name: "其他省份", value: 40, pct: "3.63%", color: "#CBD5E1" },
];

// 4. 工龄结构 - 鲜艳色彩梯度
const workTenureData = [
  { name: "21年以上", value: 339, color: "#2563EB" },
  { name: "16-20年", value: 151, color: "#0EA5E9" },
  { name: "11-15年", value: 193, color: "#10B981" },
  { name: "6-10年", value: 166, color: "#F59E0B" },
  { name: "5年以下", value: 170, color: "#8B5CF6" },
];

// 5. 司龄结构 - 鲜艳色彩梯度
const companyTenureData = [
  { name: "21年以上", value: 650, color: "#0284C7" },
  { name: "16-20年", value: 119, color: "#10B981" },
  { name: "11-15年", value: 95, color: "#38BDF8" },
  { name: "6-10年", value: 85, color: "#EC4899" },
  { name: "5年以下", value: 70, color: "#F59E0B" },
];

// 6. 用工类型 (固定工/正式工10人、合同工500人、实习生100人、退休返聘10人、劳务派遣300、其他50人)
const employmentData = [
  { name: "合同工", value: 500, pct: "51.55%", color: "#2563EB" },
  { name: "劳务派遣", value: 300, pct: "30.93%", color: "#0EA5E9" },
  { name: "实习生", value: 100, pct: "10.31%", color: "#10B981" },
  { name: "其他", value: 50, pct: "5.15%", color: "#8B5CF6" },
  { name: "正式工", value: 10, pct: "1.03%", color: "#F59E0B" },
  { name: "退休返聘", value: 10, pct: "1.03%", color: "#EC4899" },
];

// 7. 民族结构 (环形玫瑰图数据)
const ethnicData = [
  { name: "汉族", value: 1022, pct: "98.74%", color: "#2563EB", outerR: 42 },
  { name: "壮族", value: 6, pct: "0.58%", color: "#0EA5E9", outerR: 35 },
  { name: "苗族", value: 3, pct: "0.29%", color: "#10B981", outerR: 30 },
  { name: "土家族", value: 2, pct: "0.19%", color: "#F59E0B", outerR: 26 },
  { name: "其他", value: 2, pct: "0.19%", color: "#8B5CF6", outerR: 24 },
];

// 8. 年龄结构 (底部分析区左侧 60% - 鲜艳色彩)
const ageData = [
  { name: "56岁以上", value: 79, color: "#8B5CF6", highlight: false },
  { name: "50-55岁", value: 136, color: "#2563EB", highlight: false },
  { name: "46-50岁", value: 126, color: "#0EA5E9", highlight: false },
  { name: "41-45岁", value: 142, color: "#F59E0B", highlight: false },
  { name: "40岁以下", value: 536, color: "#10B981", highlight: true },
];

// 9. 管理层次分布 (调换至左侧栏模块二 - 鲜艳配色甜甜圈图)
const managementHierarchyData = [
  { name: "集团领导正职", value: 2, pct: "0.19%", color: "#EC4899" },
  { name: "集团领导副职", value: 6, pct: "0.58%", color: "#F59E0B" },
  { name: "集团中层正级", value: 18, pct: "1.74%", color: "#8B5CF6" },
  { name: "集团中层副职", value: 29, pct: "2.80%", color: "#2563EB" },
  { name: "二级企业中层正职", value: 45, pct: "4.35%", color: "#0EA5E9" },
  { name: "二级企业中层副职", value: 85, pct: "8.21%", color: "#10B981" },
  { name: "其他人员", value: 850, pct: "82.13%", color: "#64748B" },
];

type KpiItem = {
  label: string;
  icon: React.ElementType;
  value?: number;
  unit?: string;
  decimals?: number;
  text?: string;
  iconColor: string;
  badgeBg: string;
  cardBorder: string;
};

const kpiItems: KpiItem[] = [
  {
    label: "从业人数",
    value: 1035,
    unit: "人",
    icon: Users,
    decimals: 0,
    iconColor: "#2563EB",
    badgeBg: "bg-[#2563EB]/12 border-[#2563EB]/30",
    cardBorder: "border-[#2563EB]/30 hover:border-[#2563EB]",
  },
  {
    label: "职工人数",
    value: 1019,
    unit: "人",
    icon: ShieldCheck,
    decimals: 0,
    iconColor: "#0EA5E9",
    badgeBg: "bg-[#0EA5E9]/12 border-[#0EA5E9]/30",
    cardBorder: "border-[#0EA5E9]/30 hover:border-[#0EA5E9]",
  },
  {
    label: "在岗职工",
    value: 1016,
    unit: "人",
    icon: UserCheck,
    decimals: 0,
    iconColor: "#10B981",
    badgeBg: "bg-[#10B981]/12 border-[#10B981]/30",
    cardBorder: "border-[#10B981]/30 hover:border-[#10B981]",
  },
  {
    label: "平均年龄",
    value: 40.95,
    unit: "岁",
    icon: Clock,
    decimals: 2,
    iconColor: "#D97706",
    badgeBg: "bg-[#F59E0B]/12 border-[#F59E0B]/30",
    cardBorder: "border-[#F59E0B]/30 hover:border-[#F59E0B]",
  },
  {
    label: "男女比例",
    text: "71.64:28.36",
    icon: Scale,
    iconColor: "#8B5CF6",
    badgeBg: "bg-[#8B5CF6]/12 border-[#8B5CF6]/30",
    cardBorder: "border-[#8B5CF6]/30 hover:border-[#8B5CF6]",
  },
];

const NAV_TABS = [
  "总览",
  "人员结构分析",
  "人事变动分析",
  "人工成本分析",
  "培训情况分析",
  "工资总额执行分析",
];

/* ═══════════════════════════ UTILITIES & COMMON COMPONENTS ═══════════════════════════ */

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = 0;
    let rafId: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setN(value);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value]);
  return <span className="tabular-nums font-mono">{n.toFixed(decimals)}</span>;
}

function Card({
  title,
  children,
  delay = 0,
  className = "",
  motionLabel,
  headerExtra,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
  motionLabel?: string;
  headerExtra?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      className={`relative bg-white/93 backdrop-blur-md rounded-[16px] border border-[#E2E8F0]
        shadow-[0_4px_24px_rgba(37,99,235,0.07)] flex flex-col overflow-hidden group hover:-translate-y-[2px] transition-all duration-300 ${className}`}
    >
      {/* Top 1px white highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent z-10 pointer-events-none" />

      {/* Dynamic light scan effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2563EB 35%, #0EA5E9 65%, transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.6, ease: "linear" }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 pt-3 pb-[8px] shrink-0 border-b border-[#F1F5F9] bg-gradient-to-r from-[#2563EB]/4 via-[#0EA5E9]/2 to-transparent">
        <div className="flex items-center gap-2">
          {/* 3px wide blue-cyan gradient vertical bar */}
          <span className="w-[3px] h-[15px] rounded-full bg-gradient-to-b from-[#2563EB] to-[#0EA5E9] shadow-[0_0_6px_rgba(37,99,235,0.4)]" />
          <span className="text-[15px] font-medium text-[#334155] tracking-wide">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {motionLabel && (
            <span className="text-[10px] font-mono text-[#94A3B8] opacity-75">
              {motionLabel}
            </span>
          )}
          {headerExtra}
        </div>
      </div>

      <div className="flex-1 p-3 min-h-0 flex flex-col">{children}</div>
    </motion.div>
  );
}

/* ═══════════════════════════ LEFT PANEL ═══════════════════════════ */

// 1. 学历结构 - 横向进度条图
function EducationCard() {
  return (
    <Card
      title="学历结构"
      delay={0.1}
      motionLabel="【动效】进度生幅"
      className="flex-[1.1]"
    >
      <div className="flex flex-col justify-center gap-2.5 h-full">
        {educationData.map((d) => (
          <div key={`edu-${d.name}`}>
            <div className="flex justify-between mb-1 text-[12px]">
              <span className="text-[#334155] font-medium leading-none">
                {d.name}
                {d.note && (
                  <span className="text-[10px] text-[#2563EB] ml-1 font-normal">
                    ({d.note})
                  </span>
                )}
              </span>
              <span className="font-mono text-[#0F172A] font-semibold text-[12px]">
                {d.value}人&nbsp;
                <span className="text-[#2563EB] font-bold ml-1">{d.pct.toFixed(2)}%</span>
              </span>
            </div>
            <div className="h-[8px] bg-[#EEF2F7] rounded-[8px] overflow-hidden p-[0.5px] border border-[#E2E8F0]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(d.pct, 100)}%` }}
                transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
                className="h-full rounded-[8px] relative"
                style={{
                  background: `linear-gradient(90deg, ${d.color}, ${d.color}cc)`,
                }}
              >
                {/* Bar top highlight */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 rounded-r-[8px]" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// 2. 管理层次分布 - 甜甜圈图 (增加精美浅色底色背景)
function ManagementHierarchyCard() {
  return (
    <Card
      title="管理层次分布"
      delay={0.18}
      motionLabel="【动效】底色卡片 / 甜甜圈展开"
      className="flex-[1.3] bg-gradient-to-br from-[#2563EB]/8 via-white to-[#0EA5E9]/5 border-[#2563EB]/25"
    >
      <div className="flex h-full items-center gap-2 min-h-0 bg-white/70 backdrop-blur-sm rounded-xl p-2 border border-[#2563EB]/15 shadow-inner">
        {/* Hollow Donut Chart on Left */}
        <div className="w-[125px] h-full shrink-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={managementHierarchyData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2.5}
                dataKey="value"
                stroke="#FFFFFF"
                strokeWidth={1.5}
                animationBegin={200}
                animationDuration={1000}
              >
                {managementHierarchyData.map((e) => (
                  <Cell key={`mgmt-cell-${e.name}`} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 11,
                  boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
                }}
                formatter={(v: number, name: string) => {
                  const item = managementHierarchyData.find((d) => d.name === name);
                  return [`${v}人 (${item?.pct})`, "人数占比"];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center pointer-events-none">
            <span className="text-[8.5px] text-[#64748B] block font-mono leading-tight">管理层次</span>
            <span className="text-[12px] font-bold text-[#2563EB] font-mono leading-tight">1035</span>
          </div>
        </div>

        {/* Legend list on Right */}
        <div className="flex-1 flex flex-col justify-center gap-0.5 min-w-0 pr-0.5 overflow-hidden">
          {managementHierarchyData.map((d) => (
            <div
              key={`mgmt-list-${d.name}`}
              className="flex items-center justify-between text-[10.5px] py-0.5 border-b border-[#F1F5F9] last:border-0"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-[#334155] font-medium truncate">{d.name}</span>
              </div>
              <span className="font-mono text-[#0F172A] font-semibold shrink-0 ml-1">
                {d.value}人 <span className="text-[9.5px] text-[#64748B] font-normal">({d.pct})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// 3. 籍贯分布 - 地图结构 (Map Structure 区域标注 + 脉冲辐射节点)
function NativePlaceCard() {
  return (
    <Card
      title="籍贯分布"
      delay={0.26}
      motionLabel="【动效】区域地图热点"
      className="flex-[1.25]"
    >
      <div className="flex h-full items-center gap-3">
        {/* China / South China Map Structure Visual */}
        <div className="w-[130px] h-full shrink-0 relative bg-gradient-to-br from-[#2563EB]/5 to-[#0EA5E9]/10 rounded-xl border border-[#2563EB]/20 flex items-center justify-center overflow-hidden p-1.5">
          {/* Map Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#2563EB 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* China Regional Vector Map SVG */}
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-sm">
            {/* Background China outline path mockup */}
            <path
              d="M 20 40 Q 60 10 120 20 T 180 50 Q 190 90 160 130 T 100 145 Q 50 150 30 110 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            {/* Guangdong Province Highlight Shape */}
            <path
              d="M 105 110 C 115 105 135 112 145 125 C 135 138 115 135 105 128 Z"
              fill="#10B981"
              opacity="0.85"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Pulse Dot at Guangdong / Huizhou */}
            <circle cx="125" cy="120" r="5" fill="#10B981" className="animate-ping opacity-75" />
            <circle cx="125" cy="120" r="4" fill="#065F46" />
            <circle cx="125" cy="120" r="2" fill="#FFFFFF" />

            {/* Other Province Dots */}
            <circle cx="95" cy="115" r="2.5" fill="#0EA5E9" /> {/* Guangxi */}
            <circle cx="115" cy="90" r="2.5" fill="#38BDF8" />  {/* Hunan */}
            <circle cx="120" cy="72" r="2" fill="#818CF8" />    {/* Hubei */}
            <circle cx="75" cy="85" r="2" fill="#A7F3D0" />     {/* Sichuan */}
          </svg>

          {/* Map Label Overlay */}
          <div className="absolute bottom-1 left-1.5 right-1.5 bg-white/90 backdrop-blur-sm border border-[#10B981]/40 rounded-lg px-2 py-0.5 text-center shadow-sm">
            <span className="text-[9px] text-[#065F46] font-bold block leading-tight">广东省主集中区</span>
            <span className="text-[11px] font-mono font-bold text-[#10B981] leading-tight">811人 (78.59%)</span>
          </div>
        </div>

        {/* Province ranking breakdown */}
        <div className="flex-1 flex flex-col justify-center gap-1 pr-0.5">
          {nativePlaceData.map((p) => (
            <div
              key={`map-list-${p.name}`}
              className={`flex items-center justify-between rounded-lg px-2 py-0.5 border text-[10.5px] transition-colors ${
                p.name === "广东省"
                  ? "bg-[#10B981]/10 border-[#10B981]/40 shadow-sm"
                  : "bg-[#F8FAFC] border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: p.color }}
                />
                <span
                  className={`truncate font-medium ${
                    p.name === "广东省" ? "text-[#065F46] font-bold" : "text-[#334155]"
                  }`}
                >
                  {p.name}
                </span>
              </div>
              <span className="font-mono text-[10.5px] font-semibold text-[#0F172A]">
                {p.value}人{" "}
                <span
                  className={`text-[9.5px] font-normal ${
                    p.name === "广东省" ? "text-[#10B981] font-bold" : "text-[#64748B]"
                  }`}
                >
                  ({p.pct})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════ CENTER VISUAL AREA (Compact Layout) ═══════════════════════════ */

function SemiRealisticMaleSilhouette() {
  return (
    <svg viewBox="0 0 160 230" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="maleBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="maleSuitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="220" rx="55" ry="8" fill="#2563EB" opacity="0.22" />
      <circle cx="80" cy="40" r="23" fill="url(#maleBodyGrad)" />
      <path
        d="M 60 36 C 60 22 72 16 80 16 C 92 16 98 24 98 34 C 92 28 82 26 74 32 C 68 36 64 36 60 36 Z"
        fill="#1E3A8A"
        opacity="0.85"
      />
      <rect x="74" y="60" width="12" height="15" rx="3" fill="url(#maleBodyGrad)" />
      <path d="M 72 70 L 80 82 L 88 70 Z" fill="#FFFFFF" opacity="0.9" />
      <path d="M 78 78 L 82 78 L 81 125 L 80 132 L 79 125 Z" fill="#0EA5E9" />
      <path
        d="M 28 205 C 26 152 45 106 80 100 C 115 106 134 152 132 205 L 132 215 Q 80 225 28 215 Z"
        fill="url(#maleSuitGrad)"
      />
      <path d="M 80 100 L 64 128 L 80 142 Z" fill="#172554" opacity="0.5" />
      <path d="M 80 100 L 96 128 L 80 142 Z" fill="#172554" opacity="0.5" />
      <path d="M 44 116 Q 22 148 26 180 Q 30 188 38 180 Q 38 150 60 128 Z" fill="url(#maleSuitGrad)" />
      <path d="M 116 116 Q 138 148 134 180 Q 130 188 122 180 Q 122 150 100 128 Z" fill="url(#maleSuitGrad)" />
    </svg>
  );
}

function SemiRealisticFemaleSilhouette() {
  return (
    <svg viewBox="0 0 160 230" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="femaleBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="femaleSuitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="220" rx="48" ry="7" fill="#0EA5E9" opacity="0.22" />
      <path
        d="M 52 40 C 50 18 72 14 80 14 C 98 14 108 24 106 48 C 102 65 96 80 94 92 C 86 88 84 80 84 75 C 72 75 60 62 52 40 Z"
        fill="#075985"
        opacity="0.75"
      />
      <circle cx="80" cy="38" r="21" fill="url(#femaleBodyGrad)" />
      <rect x="75" y="57" width="10" height="13" rx="3" fill="url(#femaleBodyGrad)" />
      <path d="M 70 68 Q 80 82 90 68" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
      <path
        d="M 32 205 C 30 155 48 108 80 102 C 112 108 130 155 128 205 L 128 215 Q 80 224 32 215 Z"
        fill="url(#femaleSuitGrad)"
      />
      <path d="M 48 118 Q 28 148 32 180 Q 36 186 42 180 Q 42 152 64 128 Z" fill="url(#femaleSuitGrad)" />
      <path d="M 112 118 Q 132 148 128 180 Q 124 186 118 180 Q 118 152 96 128 Z" fill="url(#femaleSuitGrad)" />
    </svg>
  );
}

function CenterHero({
  mode,
  setMode,
}: {
  mode: "single" | "combined";
  setMode: (m: "single" | "combined") => void;
}) {
  return (
    <div className="flex-1 bg-white/93 backdrop-blur-md rounded-[16px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(37,99,235,0.07)] relative overflow-hidden flex flex-col p-3.5 min-h-0">
      {/* Top Bar inside Center Area: Control Bar for Date & Analysis Mode */}
      <div className="flex items-center justify-between z-20 pb-2 border-b border-[#F1F5F9] bg-gradient-to-r from-[#2563EB]/5 via-[#0EA5E9]/3 to-transparent px-2.5 py-1.5 rounded-xl">
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-[14px] rounded-full bg-gradient-to-b from-[#2563EB] to-[#0EA5E9]" />
          <span className="text-[12px] font-semibold text-[#1E293B]">
            人员结构分析视角
          </span>
          <div className="h-3.5 w-px bg-[#CBD5E1]" />
          <span className="text-[11px] font-mono text-[#64748B]">
            统计周期：<span className="text-[#2563EB] font-bold">2026-01-01 至 2026-12-31</span>
          </span>
        </div>

        {/* Single / Combined Toggle */}
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-full border border-[#E2E8F0] shadow-inner">
          <button
            onClick={() => setMode("single")}
            className={`px-3 py-0.5 text-[11px] rounded-full transition-all font-medium ${
              mode === "single"
                ? "bg-[#2563EB] text-white shadow-sm font-bold"
                : "text-[#64748B] hover:text-[#334155]"
            }`}
          >
            单户分析
          </button>
          <button
            onClick={() => setMode("combined")}
            className={`px-3 py-0.5 text-[11px] rounded-full transition-all font-medium ${
              mode === "combined"
                ? "bg-[#2563EB] text-white shadow-sm font-bold"
                : "text-[#64748B] hover:text-[#334155]"
            }`}
          >
            合并分析
          </button>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[280px] bg-gradient-to-tr from-[#2563EB]/14 via-[#0EA5E9]/12 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Dynamic Background Tech Mesh / Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0 overflow-hidden">
        <defs>
          <pattern id="centerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="2 4" />
            <circle cx="0" cy="0" r="1.5" fill="#2563EB" />
          </pattern>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#centerGrid)" />
        {/* Animated Tech Curves */}
        <motion.path
          d="M -100 120 Q 200 40 500 150 T 1100 100"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          animate={{ d: ["M -100 120 Q 200 40 500 150 T 1100 100", "M -100 100 Q 200 160 500 80 T 1100 140", "M -100 120 Q 200 40 500 150 T 1100 100"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -100 180 Q 300 240 600 140 T 1100 220"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          animate={{ d: ["M -100 180 Q 300 240 600 140 T 1100 220", "M -100 200 Q 300 120 600 220 T 1100 160", "M -100 180 Q 300 240 600 140 T 1100 220"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Figures Container - Tighter & More Compact */}
      <div className="flex-1 flex items-center justify-center z-10 min-h-0 relative py-1">
        {/* Connecting SVG Light Trails */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
            <linearGradient id="lineMale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineFemale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M 240 160 Q 240 185 190 205" stroke="url(#lineMale)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <path d="M 440 160 Q 440 185 490 205" stroke="url(#lineFemale)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>

        <div className="flex items-end justify-center gap-[90px] w-full max-w-[620px] z-10">
          {/* Male Silhouette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-1 relative"
          >
            <div className="w-[140px] h-[190px] drop-shadow-lg">
              <SemiRealisticMaleSilhouette />
            </div>
            <div className="bg-white/95 border border-[#2563EB]/35 rounded-xl px-4 py-1.5 text-center shadow-[0_4px_18px_rgba(37,99,235,0.14)] -mt-2">
              <div className="text-[11px] text-[#64748B] font-medium">男性人员形象</div>
              <div className="font-mono font-bold text-[#2563EB] flex items-baseline justify-center gap-1">
                <span className="text-[21px]">730</span>
                <span className="text-[11px] text-[#64748B] font-normal">人</span>
                <span className="text-[11px] text-[#2563EB] ml-0.5">71.64%</span>
              </div>
            </div>
          </motion.div>

          {/* Divider Badge */}
          <div className="flex flex-col items-center gap-1 pb-6 opacity-50">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#2563EB]" />
            <div className="w-7 h-7 rounded-full border border-[#2563EB]/40 bg-white shadow-sm flex items-center justify-center">
              <span className="text-[8.5px] font-bold text-[#2563EB] font-mono">VS</span>
            </div>
            <div className="w-px h-10 bg-gradient-to-t from-transparent to-[#2563EB]" />
          </div>

          {/* Female Silhouette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-1 relative"
          >
            <div className="w-[130px] h-[190px] drop-shadow-lg">
              <SemiRealisticFemaleSilhouette />
            </div>
            <div className="bg-white/95 border border-[#0EA5E9]/35 rounded-xl px-4 py-1.5 text-center shadow-[0_4px_18px_rgba(14,165,233,0.14)] -mt-2">
              <div className="text-[11px] text-[#64748B] font-medium">女性人员形象</div>
              <div className="font-mono font-bold text-[#0EA5E9] flex items-baseline justify-center gap-1">
                <span className="text-[21px]">289</span>
                <span className="text-[11px] text-[#64748B] font-normal">人</span>
                <span className="text-[11px] text-[#0EA5E9] ml-0.5">28.36%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connected Glowing Data Cards - Enlarged with Vibrant Colorful Icons */}
      <div className="grid grid-cols-5 gap-3 z-10 shrink-0 mt-1">
        {kpiItems.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={`kpi-${kpi.label}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
              className={`bg-white rounded-2xl border px-4 py-3.5 flex flex-col justify-between gap-1.5 shadow-[0_6px_24px_rgba(37,99,235,0.12)] transition-all cursor-default group relative overflow-hidden ${kpi.cardBorder}`}
            >
              {/* Soft Bottom Ambient Glow */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-[8px] pointer-events-none opacity-60"
                style={{ background: kpi.iconColor }}
              />

              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-[#475569] font-semibold truncate">
                  {kpi.label}
                </span>
                {/* Colorful Badge with Icon */}
                <div
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${kpi.badgeBg}`}
                >
                  <Icon size={15} style={{ color: kpi.iconColor }} />
                </div>
              </div>

              <div className="font-mono font-bold text-[24px] text-[#0F172A] leading-tight pt-0.5">
                {kpi.text ? (
                  <span className="text-[14px] text-[#0F172A] font-bold tracking-tight">
                    {kpi.text}
                  </span>
                ) : (
                  <>
                    <AnimatedNumber value={kpi.value ?? 0} decimals={kpi.decimals} />
                    <span className="text-[12px] text-[#64748B] font-medium ml-1">
                      {kpi.unit}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════ RIGHT PANEL ═══════════════════════════ */

// 1. 工龄结构
function WorkTenureCard() {
  return (
    <Card
      title="工龄结构"
      delay={0.12}
      motionLabel="【动效】横向生长"
      className="flex-[1.15]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={workTenureData}
          layout="vertical"
          margin={{ top: 2, right: 52, left: -4, bottom: 2 }}
        >
          <defs>
            <linearGradient id="wGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.92} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.35} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 5" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={{ stroke: "#E2E8F0" }} />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#334155"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={58}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v: number) => [`${v}人`, "人数"]}
          />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            barSize={11}
            animationDuration={1200}
          >
            {workTenureData.map((d) => (
              <Cell key={`work-cell-${d.name}`} fill={d.color} />
            ))}
            <LabelList
              key="label-list-work"
              dataKey="value"
              position="right"
              style={{
                fontSize: 10,
                fill: "#0F172A",
                fontFamily: "Roboto Mono, monospace",
                fontWeight: 600,
              }}
              formatter={(v: any) => `${v}人`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

// 2. 司龄结构
function CompanyTenureCard() {
  return (
    <Card
      title="司龄结构"
      delay={0.22}
      motionLabel="【动效】横向生长"
      className="flex-[1.15]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={companyTenureData}
          layout="vertical"
          margin={{ top: 2, right: 58, left: -4, bottom: 2 }}
        >
          <defs>
            <linearGradient id="cGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.92} />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.35} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 5" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={{ stroke: "#E2E8F0" }} />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#334155"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={58}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(v: number) => [`${v}人`, "人数"]}
          />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            barSize={11}
            animationDuration={1200}
          >
            {companyTenureData.map((d) => (
              <Cell key={`comp-cell-${d.name}`} fill={d.color} />
            ))}
            <LabelList
              key="label-list-comp"
              dataKey="value"
              position="right"
              style={{
                fontSize: 10,
                fill: "#0F172A",
                fontFamily: "Roboto Mono, monospace",
                fontWeight: 600,
              }}
              formatter={(v: any) => `${v}人`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

// 3. 用工类型 (固定工/正式工10人、合同工500人、实习生100人、退休返聘10人、劳务派遣300人、其他50人)
function EmploymentTypeCard() {
  return (
    <Card
      title="用工类型"
      delay={0.32}
      motionLabel="【动效】分类占比分布"
      className="flex-[1.2]"
    >
      <div className="flex h-full items-center gap-2.5">
        {/* Ring Chart on Left */}
        <div className="w-[105px] h-full shrink-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={employmentData}
                cx="50%"
                cy="50%"
                innerRadius={24}
                outerRadius={44}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                animationBegin={300}
                animationDuration={1100}
              >
                {employmentData.map((e) => (
                  <Cell key={`emp-cell-${e.name}`} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 11,
                  boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
                }}
                formatter={(v: number, name: string) => {
                  const item = employmentData.find((d) => d.name === name);
                  return [`${v}人 (${item?.pct})`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center pointer-events-none">
            <span className="text-[8px] text-[#64748B] block font-mono">用工</span>
            <span className="text-[11px] font-bold text-[#0F172A] font-mono leading-tight">
              970<span className="text-[9px] font-normal text-[#64748B]">人</span>
            </span>
          </div>
        </div>

        {/* Categories List on Right */}
        <div className="flex-1 flex flex-col justify-center gap-1 min-w-0 pr-0.5">
          {employmentData.map((d) => (
            <div
              key={`emp-item-${d.name}`}
              className="flex items-center justify-between text-[10px] py-0.5 border-b border-[#F1F5F9] last:border-0"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-[2px] shrink-0" style={{ background: d.color }} />
                <span className="text-[#334155] font-medium truncate">{d.name}</span>
              </div>
              <span className="font-mono font-bold text-[#0F172A] shrink-0">
                {d.value}人 <span className="text-[9px] font-normal text-[#64748B]">({d.pct})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// 4. 民族结构 - 环形玫瑰图 (Ring Rose Chart)
function EthnicCard() {
  return (
    <Card
      title="民族结构"
      delay={0.4}
      motionLabel="【动效】环形玫瑰辐射"
      className="flex-[1.05]"
    >
      <div className="flex h-full items-center gap-2">
        {/* Ring Rose Chart */}
        <div className="w-[105px] h-full shrink-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {ethnicData.map((e, idx) => (
                <Pie
                  key={`ethnic-rose-${e.name}`}
                  data={[e]}
                  cx="50%"
                  cy="50%"
                  innerRadius={18}
                  outerRadius={e.outerR}
                  dataKey="value"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  startAngle={360 - idx * 72}
                  endAngle={360 - (idx + 1) * 72}
                  animationBegin={300 + idx * 80}
                  animationDuration={900}
                >
                  <Cell fill={e.color} />
                </Pie>
              ))}
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 11,
                  boxShadow: "0 4px 12px rgba(37,99,235,0.08)",
                }}
                formatter={(v: number, name: string) => {
                  const item = ethnicData.find((d) => d.name === name) || ethnicData[0];
                  return [`${item.value}人 (${item.pct})`, item.name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center pointer-events-none">
            <span className="text-[8px] text-[#64748B] block font-mono">民族</span>
            <span className="text-[11px] font-bold text-[#2563EB] font-mono leading-tight">1035</span>
          </div>
        </div>

        {/* Ethnic Breakdown List */}
        <div className="flex-1 flex flex-col justify-center gap-1 overflow-hidden pr-0.5">
          {ethnicData.slice(0, 3).map((d) => (
            <div key={`ethnic-list-${d.name}`} className="flex items-center justify-between text-[10.5px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-[#334155] font-medium truncate">{d.name}</span>
              </div>
              <span className="font-mono text-[#0F172A] font-semibold">{d.value}人</span>
            </div>
          ))}
          <div className="text-[9.5px] text-[#64748B] font-mono border-t border-[#F1F5F9] pt-0.5">
            少数民族共 13人 (1.26%)
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════ BOTTOM ANALYSIS BAR (Height Increased to 350px) ═══════════════════════════ */

// 左侧 60%: 年龄构成分析 - 纵向柱状图 (40岁以下高亮薄荷绿)
function AgeStructureCard() {
  return (
    <Card
      title="年龄构成分析"
      delay={0.48}
      motionLabel="【动效】纵向柱状生幅 / 40岁以下高亮"
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ageData} margin={{ top: 28, right: 28, left: -10, bottom: 4 }}>
          <defs>
            {ageData.map((d) => (
              <linearGradient key={`age-bar-grad-${d.name}`} id={`ageBarG-${d.name}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={d.color} stopOpacity={0.95} />
                <stop offset="85%" stopColor={d.color} stopOpacity={0.35} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 5" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#334155"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
          />
          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              fontSize: 11,
              boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
            }}
            formatter={(v: number) => {
              const item = ageData.find((d) => d.value === v);
              const pct = ((v / 1035) * 100).toFixed(2);
              return [`${v}人 (${pct}%)`, item?.name || "人数"];
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80} animationDuration={1300}>
            {ageData.map((d) => (
              <Cell key={`age-vbar-cell-${d.name}`} fill={`url(#ageBarG-${d.name})`} />
            ))}
            <LabelList
              key="label-list-age"
              dataKey="value"
              position="top"
              style={{
                fontSize: 12.5,
                fill: "#0F172A",
                fontFamily: "Roboto Mono, monospace",
                fontWeight: 700,
              }}
              formatter={(v: any) => `${v}人`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

// 右侧 40%: 政治面貌 (使用 矩形树图 Treemap)
const PoliticalTreemapContent = (props: any) => {
  const { x, y, width, height, name, value } = props;

  if (!width || !height || width <= 0 || height <= 0) return null;

  const item = politicalData.find((d) => d.name === name);
  const bg = item?.color || "#2563EB";

  const showSubText = width > 50 && height > 38;
  const showMainText = width > 30 && height > 20;

  return (
    <g>
      <rect
        x={x + 1}
        y={y + 1}
        width={width - 2}
        height={height - 2}
        rx={8}
        ry={8}
        style={{
          fill: bg,
          stroke: "#FFFFFF",
          strokeWidth: 2,
          opacity: 0.92,
        }}
      />
      {showMainText && (
        <text
          x={x + width / 2}
          y={showSubText ? y + height / 2 - 8 : y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontSize={width < 60 ? 11 : 13}
          fontWeight="600"
        >
          {name}
        </text>
      )}
      {showSubText && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(255, 255, 255, 0.95)"
          fontSize={11}
          fontFamily="Roboto Mono, monospace"
          fontWeight="500"
        >
          {value}人 ({item?.pct})
        </text>
      )}
    </g>
  );
};

function PoliticalBottomCard() {
  const politicalTreemapData = useMemo(
    () =>
      politicalData.map((d) => ({
        name: d.name,
        size: d.value,
        value: d.value,
        pct: d.pct,
        color: d.color,
      })),
    []
  );

  return (
    <Card
      title="政治面貌"
      delay={0.52}
      motionLabel="【动效】矩形树图分布"
      className="h-full"
    >
      <div className="flex flex-col h-full gap-2">
        <div className="flex-1 min-h-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={politicalTreemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#FFFFFF"
              fill="#2563EB"
              content={<PoliticalTreemapContent />}
              animationDuration={1000}
            >
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 11,
                  boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
                }}
                formatter={(v: number, name: string) => {
                  const item = politicalData.find((d) => d.name === name);
                  return [`${v}人 (${item?.pct || ""})`, "人数占比"];
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>

        {/* Bottom Legend for small political categories */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-1.5 border-t border-[#F1F5F9]">
          {politicalData.map((d) => (
            <div key={`pol-legend-${d.name}`} className="flex items-center gap-1 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
              <span className="text-[#475569] font-medium">{d.name}:</span>
              <span className="font-mono text-[#0F172A] font-semibold">{d.value}人 ({d.pct})</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════ MAIN DASHBOARD COMPONENT ═══════════════════════════ */

export default function App() {
  const [activeTab, setActiveTab] = useState("人员结构分析");
  const [mode, setMode] = useState<"single" | "combined">("combined");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Sparse floating particles (8s cycle)
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: `p-${i}`,
        size: 2 + (i % 3),
        top: `${(i * 31 + 7) % 92}%`,
        left: `${(i * 47 + 5) % 96}%`,
        dur: 7 + (i % 4),
        delay: i * 0.4,
      })),
    []
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#EEF2F7",
        position: "relative",
      }}
    >
      {/* Fixed 1920x1080 Container with scale transform */}
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
        {/* ── Background: #F7F9FC -> #EEF2F7 Linear Gradient ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F9FC] via-[#F1F5F9] to-[#EEF2F7]" />

        {/* 8% Opacity #2563EB Fine Grid (80px gap) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Center-bottom Faint Blue Radial Glow */}
        <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-[#2563EB]/10 via-[#0EA5E9]/5 to-transparent blur-[120px] pointer-events-none" />

        {/* Sparse Ambient Floating Particles (8s cycle) */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#2563EB]/20 pointer-events-none"
            style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* ── TOP HEADER NAVBAR (90px Height) ── */}
        <header className="absolute top-0 left-0 right-0 h-[90px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_2px_16px_rgba(37,99,235,0.06)] z-30 flex flex-col justify-between px-12 py-2">
          {/* Top row */}
          <div className="flex items-center justify-between w-full">
            
            {/* Top-Left: Group Logo Badge & Tagline */}
            <div className="flex items-center gap-3 min-w-[320px]">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white px-3 py-1 rounded-lg shadow-sm">
                <Building2 size={16} />
                <span className="text-[13px] font-bold tracking-wider">惠州城投集团</span>
              </div>
              <span className="text-[11px] text-[#64748B] font-medium hidden md:inline">
                人力资源数据指挥舱
              </span>
            </div>

            {/* Center: Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[26px] font-bold tracking-[0.15em] text-[#1E293B] whitespace-nowrap drop-shadow-sm"
            >
              惠州市城市建设投资集团 · 人力资源结构分析驾驶舱
            </motion.h1>

            {/* Top-Right: Refresh, Export, Fullscreen Action Icons */}
            <div className="flex items-center gap-2 min-w-[500px] justify-end">
              <button
                title="刷新数据"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all"
              >
                <RotateCw size={14} />
              </button>
              <button
                title="导出报告"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all"
              >
                <Download size={14} />
              </button>
              <button
                title="全屏模式"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Sub-Navigation thin bar */}
          <div className="flex items-center justify-center gap-8 pb-1">
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

        {/* ── MAIN CONTENT (12-Column Grid, 48px margins, 24px gap) ── */}
        <main
          className="absolute top-[90px] bottom-0 left-0 right-0 grid grid-cols-12 gap-[24px] px-[48px] pt-[16px] pb-[16px] overflow-hidden"
          style={{ height: "calc(1080px - 90px)" }}
        >
          {/* LEFT PANEL (22% width => 3 cols in 12-col grid) */}
          <div className="col-span-3 flex flex-col gap-[16px] h-full overflow-hidden">
            <EducationCard />
            {/* Left Module 2: 管理层次分布 */}
            <ManagementHierarchyCard />
            <NativePlaceCard />
          </div>

          {/* CENTER VISUAL AREA & BOTTOM ANALYSIS BAR (56% + 100% bottom => 6 cols center) */}
          <div className="col-span-6 flex flex-col gap-[16px] h-full min-w-0 overflow-hidden">
            {/* Center Upper + KPI Zone with Analysis View Control Bar */}
            <CenterHero mode={mode} setMode={setMode} />

            {/* Bottom Analysis Bar (Height Increased to 350px) */}
            <div className="h-[350px] shrink-0 grid grid-cols-10 gap-[20px]">
              {/* Bottom Left 60% => 6 cols */}
              <div className="col-span-6 h-full">
                <AgeStructureCard />
              </div>
              {/* Swapped: 政治面貌 (Bottom Right 40% => 4 cols) */}
              <div className="col-span-4 h-full">
                <PoliticalBottomCard />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (22% width => 3 cols in 12-col grid) */}
          <div className="col-span-3 flex flex-col gap-[16px] h-full overflow-hidden">
            <WorkTenureCard />
            <CompanyTenureCard />
            <EmploymentTypeCard />
            <EthnicCard />
          </div>
        </main>
      </div>
    </div>
  );
}
