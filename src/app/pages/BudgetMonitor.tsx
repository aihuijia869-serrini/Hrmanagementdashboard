import React, { useState } from "react";
import {
  DollarSign, CheckCircle2, ArrowLeftRight, Wallet,
  AlertTriangle, RefreshCw, Search, X, TrendingUp, ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer, Cell, PieChart, Pie,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

// ─── Ant Design Color Palette ─────────────────────────────────────────────────
const C = {
  // 拂晓蓝 (Daybreak Blue) — primary
  primary:        "#1677FF",
  primaryLight:   "#E6F4FF",
  primaryBorder:  "#91CAFF",
  primaryDark:    "#0958D9",

  // Semantic
  success:        "#52C41A",
  successLight:   "#F6FFED",
  successBorder:  "#B7EB8F",

  warning:        "#FA8C16",
  warningLight:   "#FFF7E6",
  warningBorder:  "#FFD591",

  error:          "#FF4D4F",
  errorLight:     "#FFF1F0",
  errorBorder:    "#FFA39E",

  purple:         "#722ED1",
  purpleLight:    "#F9F0FF",
  purpleBorder:   "#D3ADF7",

  // Neutral
  bg:             "#FFFFFF",
  bgLayout:       "#F5F5F5",
  bgContainer:    "#FFFFFF",
  bgFill:         "#F5F5F5",
  bgFillSecond:   "#FAFAFA",

  // Text
  textPrimary:    "#000000E0",   // 87%
  textSecondary:  "#00000073",   // 45%
  textTertiary:   "#00000040",   // 25%
  textDisabled:   "#00000025",

  // Border
  border:         "#D9D9D9",
  borderSecond:   "#F0F0F0",

  // Component tokens
  cardRadius:     "6px",
  shadow:         "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.05)",
  shadowHover:    "0 4px 12px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const monthlyData = [
  { month: "1月",  budget: 120, actual: 10 },
  { month: "2月",  budget: 120, actual: 30 },
  { month: "3月",  budget: 120, actual: 0  },
  { month: "4月",  budget: 120, actual: 80 },
  { month: "5月",  budget: 120, actual: 0  },
  { month: "6月",  budget: 120, actual: 0  },
  { month: "7月",  budget: 120, actual: 0  },
  { month: "8月",  budget: 120, actual: 0  },
  { month: "9月",  budget: 120, actual: 0  },
  { month: "10月", budget: 120, actual: 0  },
  { month: "11月", budget: 120, actual: 0  },
  { month: "12月", budget: 120, actual: 0  },
];

const unitData = [
  { id: 1, name: "惠州市城安建设工程有限公司",         budget: 324005, paid: 72015, rate: 22.23, remaining: 251990, status: "预警" },
  { id: 2, name: "惠州市城市开发投资有限公司",         budget: 250000, paid: 0,     rate: 0,     remaining: 250000, status: "正常" },
  { id: 3, name: "惠州市储备军粮供应有限公司",         budget: 0,      paid: 0,     rate: 0,     remaining: 0,      status: "正常" },
  { id: 4, name: "惠州市市政动迁建设有限公司",         budget: 0,      paid: 0,     rate: 0,     remaining: 0,      status: "正常" },
  { id: 5, name: "广东惠鲜农产品投资有限公司",         budget: 0,      paid: 0,     rate: 0,     remaining: 0,      status: "正常" },
  { id: 6, name: "惠州市建筑工程有限公司",             budget: 0,      paid: 0,     rate: 0,     remaining: 0,      status: "正常" },
  { id: 7, name: "惠州市建设集团工程建设监理有限公司", budget: 0,      paid: 0,     rate: 0,     remaining: 0,      status: "正常" },
  { id: 8, name: "惠州市城投城市运营服务有限公司",     budget: 0,      paid: 0,     rate: 0,     remaining: 0,      status: "正常" },
];

const specialItems = [
  { type: "单列人员", name: "军转安置", paid: "22,055.00", inTotal: false },
  { type: "单列项目", name: "交通补贴", paid: "12,000.00", inTotal: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Ant Design Card ──────────────────────────────────────────────────────────
function AntCard({
  children, className = "", style = {}, hoverable = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverable?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`bg-white transition-shadow duration-200 ${className}`}
      style={{
        borderRadius: C.cardRadius,
        border: `1px solid ${C.border}`,
        boxShadow: hoverable && hovered ? C.shadowHover : C.shadow,
        ...style,
      }}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
    >
      {children}
    </div>
  );
}

// ─── Card Divider ─────────────────────────────────────────────────────────────
const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`h-px ${className}`} style={{ background: C.borderSecond }} />
);

// ─── Ant Design Tag / Badge ────────────────────────────────────────────────────
function AntTag({
  warn, size = "default",
}: { warn: boolean; size?: "default" | "large" }) {
  const cfg = warn
    ? { bg: C.errorLight, border: C.errorBorder, text: C.error, icon: <AlertTriangle size={size === "large" ? 13 : 11} strokeWidth={2} />, label: "预警" }
    : { bg: C.successLight, border: C.successBorder, text: C.success, icon: <CheckCircle2 size={size === "large" ? 13 : 11} strokeWidth={2} />, label: "正常" };
  return (
    <span
      className="inline-flex items-center gap-1 font-medium"
      style={{
        fontSize: size === "large" ? 12 : 11,
        padding: size === "large" ? "2px 8px" : "1px 6px",
        borderRadius: 4,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        lineHeight: "20px",
      }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ─── Ant Design Statistic ─────────────────────────────────────────────────────
function AntStatistic({
  title, value, suffix, valueColor,
}: { title: string; value: string; suffix?: string; valueColor?: string }) {
  return (
    <div>
      <div className="text-xs mb-1" style={{ color: C.textSecondary, lineHeight: "22px" }}>{title}</div>
      <div className="flex items-baseline gap-1 leading-none">
        <span
          className="font-bold"
          style={{ fontSize: 24, color: valueColor ?? C.textPrimary, letterSpacing: "-0.01em", lineHeight: 1.2 }}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xs" style={{ color: C.textSecondary }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

// ─── KPI Card (Ant Design style) ──────────────────────────────────────────────
function KpiCard({ title, value, suffix, icon, iconBg, iconColor }: {
  title: string; value: string; suffix: string;
  icon: React.ReactNode; iconBg: string; iconColor: string;
}) {
  return (
    <AntCard hoverable className="px-5 py-4 flex flex-col">
      {/* Title row — top, matches 预算执行率 card */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full flex-none" style={{ background: C.primary }} />
          <span className="text-sm font-semibold" style={{ color: C.textPrimary, lineHeight: "22px" }}>{title}</span>
        </div>
        <div
          className="flex-none w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className="font-bold leading-tight"
          style={{ fontSize: 24, color: C.textPrimary, letterSpacing: "-0.01em" }}
        >
          {value}
        </span>
        <span className="text-xs" style={{ color: C.textSecondary }}>{suffix}</span>
      </div>
    </AntCard>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabButton({ label, active, onClick }: {
  label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium transition-all duration-150 relative"
      style={{
        color: active ? C.primary : C.textSecondary,
        background: "transparent",
        borderBottom: active ? `2px solid ${C.primary}` : "2px solid transparent",
        lineHeight: "22px",
      }}
    >
      {label}
    </button>
  );
}

// ─── Ant Button ───────────────────────────────────────────────────────────────
function AntBtn({
  children, onClick, type = "default",
}: {
  children: React.ReactNode; onClick?: () => void; type?: "default" | "primary" | "text";
}) {
  const [hovered, setHovered] = useState(false);
  const styles: Record<string, React.CSSProperties> = {
    default: {
      background: hovered ? C.bgFill : C.bgContainer,
      border: `1px solid ${C.border}`,
      color: C.textPrimary,
    },
    primary: {
      background: hovered ? C.primaryDark : C.primary,
      border: `1px solid ${hovered ? C.primaryDark : C.primary}`,
      color: "#FFFFFF",
    },
    text: {
      background: hovered ? C.bgFill : "transparent",
      border: "1px solid transparent",
      color: C.primary,
    },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-150 active:opacity-70"
      style={{ borderRadius: 6, lineHeight: "22px", ...styles[type] }}
    >
      {children}
    </button>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const AntTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 text-xs rounded shadow-lg"
      style={{
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        borderRadius: 8,
        lineHeight: "20px",
      }}
    >
      <p className="font-medium mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</p>
      {payload.map((e: any, i: number) => (
        <div key={i} className="flex items-center gap-3 justify-between">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-sm" style={{ background: e.color ?? e.fill }} />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{e.name}</span>
          </span>
          <span className="font-semibold">{e.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ unit, onClose }: { unit: typeof unitData[0]; onClose: () => void }) {
  const isWarn = unit.status === "预警";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <AntCard
        className="w-[560px] overflow-hidden"
        style={{ borderRadius: 8, boxShadow: "0 6px 16px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.12)" }}
      >
        <div onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm" style={{ color: C.textPrimary }}>{unit.name}</span>
              <AntTag warn={isWarn} size="large" />
            </div>
            <button
              className="w-6 h-6 flex items-center justify-center rounded transition-colors duration-150 hover:bg-gray-100"
              style={{ color: C.textSecondary }}
              onClick={onClose}
            >
              <X size={14} />
            </button>
          </div>

          <Divider />

          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px" style={{ background: C.borderSecond, border: `1px solid ${C.borderSecond}`, borderRadius: 6, overflow: "hidden" }}>
              {[
                { label: "年度预算（元）",  value: fmt(unit.budget),            color: C.primary   },
                { label: "累计已发放（元）", value: fmt(unit.paid),              color: C.success   },
                { label: "预算执行率",       value: `${unit.rate.toFixed(2)}%`,  color: isWarn ? C.error : C.primary },
                { label: "剩余额度（元）",   value: fmt(unit.remaining),         color: C.warning   },
              ].map(item => (
                <div key={item.label} className="bg-white px-5 py-4">
                  <div className="text-xs mb-2" style={{ color: C.textSecondary }}>{item.label}</div>
                  <div className="font-bold" style={{ fontSize: 20, color: item.color, letterSpacing: "-0.01em" }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div>
              <div className="text-xs font-medium mb-3" style={{ color: C.textSecondary }}>月度发放走势（万元）</div>
              <div style={{ background: C.bgFillSecond, borderRadius: 6, padding: "12px 4px 4px" }}>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart accessibilityLayer={false} data={monthlyData} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.borderSecond} />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: C.textSecondary }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: C.textSecondary }} axisLine={false} tickLine={false} />
                    <Bar dataKey="actual" name="实发" fill={C.primary} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <AntBtn type="primary" onClick={onClose}>关闭</AntBtn>
            </div>
          </div>
        </div>
      </AntCard>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export const BudgetMonitor = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "single" | "merged">("single");
  const [selectedUnit, setSelectedUnit] = useState<typeof unitData[0] | null>(null);

  const totalBudget   = 1445995;
  const totalPaid     = 120110;
  const totalTransfer = 0;
  const remaining     = totalBudget - totalPaid;
  const execPct       = (totalPaid / totalBudget) * 100;
  const execPctStr    = execPct.toFixed(2);

  const normalCount = unitData.filter(u => u.status === "正常").length;
  const warnCount   = unitData.filter(u => u.status === "预警").length;

  const donutData = [
    { name: "已发放", value: parseFloat(execPctStr)                     },
    { name: "剩余",   value: parseFloat((100 - execPct).toFixed(2)) },
  ];

  const TABS = [
    { key: "overview" as const, label: "整体情况" },
    { key: "single"   as const, label: "单户分析" },
    { key: "merged"   as const, label: "合并分析" },
  ];

  return (
    <div
      className="flex flex-col gap-4 pb-8 -m-4 md:-m-6 px-4 md:px-6 pt-4 md:pt-5 min-h-full"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif", background: C.bgLayout }}
    >
      {/* ── Tab Bar ─────────────────────────────────────────────── */}
      <AntCard className="px-2">
        <div className="flex items-center gap-0">
          {TABS.map(({ key, label }) => (
            <TabButton
              key={key}
              label={label}
              active={activeTab === key}
              onClick={() => setActiveTab(key)}
            />
          ))}
        </div>
      </AntCard>

      {/* ── KPI Row + Execution Rate ─────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4">
        {/* 2×2 KPI grid */}
        <div className="col-span-8 grid grid-cols-2 gap-4">
          <KpiCard
            title="年度工资预算总额"
            value={fmt(totalBudget)}
            suffix="元"
            icon={<DollarSign size={20} strokeWidth={1.8} />}
            iconBg={C.primaryLight}
            iconColor={C.primary}
          />
          <KpiCard
            title="累计已发放总额"
            value={fmt(totalPaid)}
            suffix="元"
            icon={<CheckCircle2 size={20} strokeWidth={1.8} />}
            iconBg={C.successLight}
            iconColor={C.success}
          />
          <KpiCard
            title="累计已划转金额"
            value={fmt(totalTransfer)}
            suffix="元"
            icon={<ArrowLeftRight size={20} strokeWidth={1.8} />}
            iconBg={C.warningLight}
            iconColor={C.warning}
          />
          <KpiCard
            title="剩余可用额度"
            value={fmt(remaining)}
            suffix="元"
            icon={<Wallet size={20} strokeWidth={1.8} />}
            iconBg={C.purpleLight}
            iconColor={C.purple}
          />
        </div>

        {/* Execution Rate card */}
        <AntCard className="col-span-4 px-5 py-4 flex flex-col">
          {/* Card title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full" style={{ background: C.primary }} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>预算执行率</span>
            </div>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: C.primaryLight, color: C.primary }}
            >
              <TrendingUp size={15} strokeWidth={2} />
            </div>
          </div>

          {/* Donut — top */}
          <div className="flex justify-center mb-4">
            <div className="relative" style={{ width: 140, height: 140 }}>
              <PieChart width={140} height={140}>
                <Pie
                  data={donutData}
                  cx={66} cy={66}
                  innerRadius={44} outerRadius={60}
                  startAngle={90} endAngle={-270}
                  dataKey="value" strokeWidth={0}
                  accessibilityLayer={false}
                >
                  <Cell fill={C.primary} />
                  <Cell fill={C.bgFill} />
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-bold" style={{ fontSize: 22, color: C.primary, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {execPctStr}%
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: C.textSecondary }}>
              <span>执行进度</span>
              <span style={{ color: C.textPrimary, fontWeight: 500 }}>{execPctStr}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.bgFill, border: `1px solid ${C.borderSecond}` }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${execPctStr}%`, background: C.primary }}
              />
            </div>
          </div>

          <Divider className="mb-4" />

          {/* Warning status */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs" style={{ color: C.textSecondary }}>预警状态</span>
            <AntTag warn={true} size="large" />
          </div>
        </AntCard>
      </div>

      {/* ── Special Items ─────────────────────────────────────────── */}
      <AntCard className="overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="w-1 h-4 rounded-full" style={{ background: C.primary }} />
          <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>单列情况监控</span>
        </div>
        <Divider />
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: C.bgFillSecond }}>
              {["单列类型", "名称", "已发放额度（元）", "是否计入工资总额", "操作"].map((h, i) => (
                <th
                  key={h}
                  className="px-5 py-2.5 font-medium text-left"
                  style={{
                    color: C.textSecondary,
                    textAlign: i >= 2 && i !== 3 ? "right" : i === 3 ? "center" : "left",
                    borderBottom: `1px solid ${C.borderSecond}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specialItems.map((item, i) => (
              <tr
                key={i}
                className="transition-colors duration-150 hover:bg-[#E6F4FF]/30"
                style={{ borderBottom: `1px solid ${C.borderSecond}` }}
              >
                <td className="px-5 py-3" style={{ color: C.textSecondary }}>{item.type}</td>
                <td className="px-5 py-3 font-medium" style={{ color: C.textPrimary }}>{item.name}</td>
                <td className="px-5 py-3 text-right font-medium" style={{ color: C.textPrimary }}>{item.paid}</td>
                <td className="px-5 py-3 text-center">
                  <AntTag warn={true} />
                </td>
                <td className="px-5 py-3 text-right" style={{ color: C.textTertiary }}>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AntCard>

      {/* ── Unit Monitor ──────────────────────────────────────────── */}
      <AntCard className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full" style={{ background: C.primary }} />
              <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>按单位监控</span>
            </div>
            <div className="flex items-center gap-2">
              <AntTag warn={false} />
              <span className="text-xs" style={{ color: C.textSecondary }}>{normalCount} 家</span>
              <AntTag warn={true} />
              <span className="text-xs" style={{ color: C.textSecondary }}>{warnCount} 家</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AntBtn>
              <RefreshCw size={12} strokeWidth={2} />
              刷新
            </AntBtn>
            <AntBtn>
              <Search size={12} strokeWidth={2} />
              查询
            </AntBtn>
          </div>
        </div>

        <Divider />

        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: C.bgFillSecond }}>
              {[
                { label: "企业名称",       align: "left"  },
                { label: "年度预算（元）",  align: "right" },
                { label: "已发放（元）",    align: "right" },
                { label: "执行率",         align: "right" },
                { label: "剩余额度（元）",  align: "right" },
                { label: "预警状态",       align: "center"},
                { label: "操作",           align: "right" },
              ].map(col => (
                <th
                  key={col.label}
                  className="px-4 py-2.5 font-medium"
                  style={{
                    color: C.textSecondary,
                    textAlign: col.align as any,
                    borderBottom: `1px solid ${C.borderSecond}`,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {unitData.map(unit => {
              const isWarn = unit.status === "预警";
              return (
                <tr
                  key={unit.id}
                  className="transition-colors duration-150 hover:bg-[#E6F4FF]/30"
                  style={{ borderBottom: `1px solid ${C.borderSecond}` }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: C.textPrimary }}>{unit.name}</td>
                  <td className="px-4 py-3 text-right" style={{ color: C.textSecondary }}>{fmt(unit.budget)}</td>
                  <td className="px-4 py-3 text-right" style={{ color: C.textSecondary }}>{fmt(unit.paid)}</td>
                  <td className="px-4 py-3 text-right font-semibold" style={{ color: isWarn ? C.error : C.success }}>
                    {unit.rate.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-right" style={{ color: C.textSecondary }}>{fmt(unit.remaining)}</td>
                  <td className="px-4 py-3 text-center">
                    <AntTag warn={isWarn} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="inline-flex items-center gap-0.5 text-xs transition-colors duration-150 hover:opacity-70"
                      style={{ color: C.primary }}
                      onClick={() => setSelectedUnit(unit)}
                    >
                      详情
                      <ChevronRight size={11} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AntCard>

      {selectedUnit && (
        <DetailModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
      )}
    </div>
  );
};
