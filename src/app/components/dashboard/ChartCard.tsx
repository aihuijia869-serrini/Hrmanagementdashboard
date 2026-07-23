import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ChartCard({ title, children, onClick, className = "" }: ChartCardProps) {
  return (
    <div 
      className={`
        flex flex-col w-full h-full rounded-xl overflow-hidden
        bg-white/80 dark:bg-[#0B1121]/60 backdrop-blur-xl 
        border border-slate-200/50 dark:border-[#165DFF]/20
        shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] group
        transition-all duration-300 hover:border-[#165DFF]/50 hover:shadow-md dark:hover:shadow-[0_8px_32px_rgba(22,93,255,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]
        ${className}
      `}
    >
      <div 
        className="flex justify-between items-center px-4 py-3 border-b border-slate-200/50 dark:border-[#165DFF]/20 cursor-pointer bg-gradient-to-r from-slate-50/50 to-transparent dark:from-[#165DFF]/5 dark:to-transparent dark:hover:from-[#165DFF]/10 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-3.5 bg-gradient-to-b from-[#00D4FF] to-[#165DFF] rounded-sm shadow-[0_0_8px_#00D4FF]"></div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 tracking-wide text-sm">{title}</h3>
        </div>
        <div className="text-slate-400 dark:text-slate-400 group-hover:text-[#165DFF] dark:group-hover:text-[#00D4FF] transition-colors flex items-center text-[11px]">
          <span>详情</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
      <div className="flex-1 p-4 relative min-h-0">
        {children}
      </div>
    </div>
  );
}
