import React from 'react';
import { motion } from 'motion/react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon, trend, trendColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px -5px rgba(0, 212, 255, 0.15)' }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/90 p-5 backdrop-blur-xl transition-all"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{label}</div>
        <div className="rounded-md bg-white/5 p-1.5 text-[#00D4FF] ring-1 ring-white/10">{icon}</div>
      </div>
      
      <div className="mt-4 flex items-baseline gap-1 relative z-10">
        <motion.span 
          className="text-3xl font-bold tracking-tight text-white font-mono bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {value}
        </motion.span>
        {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>

      {trend && (
        <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${trendColor || 'text-emerald-400'}`}>
          <div className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
          {trend}
        </div>
      )}

      {/* Subtle background mesh/glow */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-[#00D4FF]/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
