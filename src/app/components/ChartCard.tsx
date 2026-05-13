import React from 'react';
import { motion } from 'motion/react';
import { MoreHorizontal, Maximize2, RefreshCw } from 'lucide-react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = "", onClick }) => {
  // Extract flex direction from className if present, otherwise default to flex-col
  const hasFlexRow = className.includes('flex-row');
  const flexDirection = hasFlexRow ? 'flex-row' : 'flex-col';
  // Remove any flex-row or flex-col from className to avoid conflicts
  const cleanClassName = className.replace(/flex-(row|col)/g, '').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 10px 30px -10px rgba(0, 212, 255, 0.15)' }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-b from-[#161b22]/90 to-[#0d1117]/90 p-5 backdrop-blur-xl transition-all duration-300 flex ${flexDirection} h-[320px] ${onClick ? 'cursor-pointer' : ''} ${cleanClassName}`}
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Decorative tech corners */}
      <div className="absolute top-0 left-0 h-[1px] w-12 bg-gradient-to-r from-[#00D4FF] to-transparent opacity-70" />
      <div className="absolute top-0 left-0 h-12 w-[1px] bg-gradient-to-b from-[#00D4FF] to-transparent opacity-70" />
      
      <div className="absolute bottom-0 right-0 h-[1px] w-12 bg-gradient-to-l from-[#8B5CF6] to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 h-12 w-[1px] bg-gradient-to-t from-[#8B5CF6] to-transparent opacity-50" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00D4FF]/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-slate-200 flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-gradient-to-b from-[#00D4FF] to-[#3B82F6]" />
          {title}
        </h3>
        <div className="flex gap-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="hover:text-[#00D4FF] transition-colors"><RefreshCw size={14} /></button>
          <button className="hover:text-[#00D4FF] transition-colors"><Maximize2 size={14} /></button>
          <button className="hover:text-[#00D4FF] transition-colors"><MoreHorizontal size={14} /></button>
        </div>
      </div>
      
      <div className="relative z-10 flex-1 min-h-0 w-full">
        {children}
      </div>
    </motion.div>
  );
};
