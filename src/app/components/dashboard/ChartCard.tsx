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
        flex flex-col w-full h-full rounded-2xl overflow-hidden
        bg-white dark:bg-[#111827]/70 backdrop-blur-xl 
        border border-slate-200 dark:border-[#334155]/60
        shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] group
        transition-all duration-300 hover:border-[#165DFF]/40 hover:shadow-md dark:hover:shadow-[0_8px_32px_rgba(22,93,255,0.1)]
        ${className}
      `}
    >
      <div 
        className="flex justify-between items-center px-5 py-3 border-b border-slate-100 dark:border-white/5 cursor-pointer bg-slate-50 dark:bg-gradient-to-r dark:from-transparent dark:hover:from-white/5 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-3.5 bg-[#165DFF] rounded-sm"></div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 tracking-wide">{title}</h3>
        </div>
        <div className="text-slate-400 dark:text-slate-500 group-hover:text-[#165DFF] dark:group-hover:text-[#165DFF] transition-colors flex items-center text-xs">
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
