import React from 'react';
import { motion } from 'motion/react';
import { MoreHorizontal, Maximize2, RefreshCw } from 'lucide-react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#12121a]/60 p-5 backdrop-blur-md transition-all duration-300 ${className}`}
      style={{
        boxShadow: 'inset 0 0 20px rgba(0, 212, 255, 0.05)',
      }}
    >
      {/* Decorative lines/glow */}
      <div className="absolute top-0 left-0 h-[2px] w-12 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" />
      <div className="absolute top-0 left-0 h-12 w-[2px] bg-gradient-to-b from-transparent via-[#00D4FF] to-transparent" />
      
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wider text-slate-300">
          <span className="mr-2 inline-block h-3 w-1 bg-[#00D4FF]" />
          {title}
        </h3>
        <div className="flex gap-2 text-slate-500">
          <button className="hover:text-[#00D4FF] transition-colors"><RefreshCw size={14} /></button>
          <button className="hover:text-[#00D4FF] transition-colors"><Maximize2 size={14} /></button>
          <button className="hover:text-[#00D4FF] transition-colors"><MoreHorizontal size={14} /></button>
        </div>
      </div>
      
      <div className="h-[240px] w-full">
        {children}
      </div>
    </motion.div>
  );
};
