import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon, trend, trendColor = 'text-emerald-600 dark:text-emerald-400' }) => {
  const trendUp = !trendColor || trendColor.includes('emerald') || trendColor.includes('blue');

  return (
    <div
      className="
        relative p-4 rounded-xl transition-all duration-300
        bg-white dark:bg-[#1e293b]/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50
        hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        hover:border-[#165DFF]/40 dark:hover:border-white/40
        shadow-sm overflow-hidden group
      "
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium group-hover:text-slate-700 dark:group-hover:text-slate-300">{label}</span>
          {icon && (
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-[#165DFF]/10 text-[#165DFF]">
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold font-mono tracking-tight text-slate-800 dark:text-white">
            {value}
          </span>
          {unit && <span className="text-xs text-slate-500">{unit}</span>}
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 ${
              trendUp
                ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-100/50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
            }`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2">较上期</span>
          </div>
        )}
      </div>
    </div>
  );
};
