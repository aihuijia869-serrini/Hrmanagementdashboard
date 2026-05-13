import { Users, DollarSign, UserMinus, Percent, AlertCircle, ShieldCheck, UserX, BookOpen } from "lucide-react";

interface KPIGridProps {
  onCardClick: (title: string) => void;
}

export function KPIGrid({ onCardClick }: KPIGridProps) {
  const kpis = [
    { id: 1, title: "在职人员总数", value: "12,450", unit: "人", icon: Users, trend: "+2.4%", trendUp: true, color: "text-[#165DFF]", bg: "bg-blue-50 dark:bg-[#165DFF]/10", border: "border-blue-100 dark:border-[#165DFF]/30" },
    { id: 2, title: "人工成本总额", value: "4.2", unit: "亿", icon: DollarSign, trend: "+1.2%", trendUp: true, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-400/10", border: "border-emerald-100 dark:border-emerald-400/30" },
    { id: 3, title: "本期人员变动", value: "324", unit: "人次", icon: UserMinus, trend: "-5.0%", trendUp: false, color: "text-[#FF7D00]", bg: "bg-orange-50 dark:bg-[#FF7D00]/10", border: "border-orange-100 dark:border-[#FF7D00]/30" },
    { id: 4, title: "工资预算执行率", value: "89.5", unit: "%", icon: Percent, trend: "正常", trendUp: true, color: "text-[#165DFF]", bg: "bg-blue-50 dark:bg-[#165DFF]/10", border: "border-blue-100 dark:border-[#165DFF]/30" },
    { id: 5, title: "全局关键预警", value: "12", unit: "项", icon: AlertCircle, trend: "+3", trendUp: false, color: "text-[#F53F3F]", bg: "bg-red-50 dark:bg-[#F53F3F]/10", border: "border-red-200 dark:border-[#F53F3F]/50", shadow: "shadow-[0_0_15px_rgba(245,63,63,0.15)]", pulse: true },
    { id: 6, title: "新员工留存率", value: "92.1", unit: "%", icon: ShieldCheck, trend: "+0.5%", trendUp: true, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-400/10", border: "border-emerald-100 dark:border-emerald-400/30" },
    { id: 7, title: "关键岗位流失率", value: "3.2", unit: "%", icon: UserX, trend: "-0.8%", trendUp: true, color: "text-[#FF7D00]", bg: "bg-orange-50 dark:bg-[#FF7D00]/10", border: "border-orange-100 dark:border-[#FF7D00]/30" },
    { id: 8, title: "整体培训覆盖率", value: "78.4", unit: "%", icon: BookOpen, trend: "+4.1%", trendUp: true, color: "text-[#165DFF]", bg: "bg-blue-50 dark:bg-[#165DFF]/10", border: "border-blue-100 dark:border-[#165DFF]/30" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={kpi.id}
            onClick={() => onCardClick(kpi.title)}
            className={`
              relative p-4 rounded-xl cursor-pointer transition-all duration-300
              bg-white dark:bg-[#1e293b]/40 backdrop-blur-sm border hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              ${kpi.border} hover:border-[#165DFF]/40 dark:hover:border-white/40
              ${kpi.shadow ? 'shadow-sm ' + kpi.shadow : 'shadow-sm'}
              overflow-hidden group
            `}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium group-hover:text-slate-700 dark:group-hover:text-slate-300">{kpi.title}</span>
                <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.pulse ? 'animate-pulse' : ''}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`text-2xl font-bold font-mono tracking-tight ${kpi.title === '全局关键预警' ? 'text-[#F53F3F]' : 'text-slate-800 dark:text-white'}`}>
                  {kpi.value}
                </span>
                <span className="text-xs text-slate-500">{kpi.unit}</span>
              </div>
              <div className="mt-2 flex items-center">
                <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 ${
                  kpi.trendUp 
                    ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-rose-100/50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}>
                  {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2">较上期</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
