import React from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon, trend, trendColor }) => {
  // Simple "counter" effect simulation using motion
  const displayValue = typeof value === 'number' ? value : parseFloat(value.toString());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1a1a24]/80 to-[#12121a]/80 p-4 backdrop-blur-xl"
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 10px rgba(0, 212, 255, 0.1)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</div>
        <div className="text-[#00D4FF]/60">{icon}</div>
      </div>
      
      <div className="mt-2 flex items-baseline gap-1">
        <motion.span 
          className="text-3xl font-bold tracking-tight text-white font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {value}
        </motion.span>
        {unit && <span className="text-xs text-slate-400">{unit}</span>}
      </div>

      {trend && (
        <div className={`mt-2 text-xs font-medium ${trendColor || 'text-emerald-400'}`}>
          {trend}
        </div>
      )}

      {/* Background glow effect */}
      <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-[#00D4FF]/5 blur-2xl" />
    </motion.div>
  );
};
