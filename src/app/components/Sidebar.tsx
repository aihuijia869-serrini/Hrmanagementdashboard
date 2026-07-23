import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CircleDollarSign, UserMinus, FileText, GraduationCap, PieChart } from "lucide-react";

const navItems = [
  { path: "/", label: "首页总览", icon: LayoutDashboard, end: true },
  { path: "/personnel", label: "人员结构", icon: Users },
  { path: "/cost", label: "人工成本", icon: CircleDollarSign },
  { path: "/turnover", label: "人员变动", icon: UserMinus },
  { path: "/salary", label: "工资执行", icon: FileText },
  { path: "/training", label: "培训情况", icon: GraduationCap },
  { path: "/budget", label: "预算执行监控", icon: PieChart },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-xl border-r border-slate-200 dark:border-[#165DFF]/20 flex flex-col hidden md:flex transition-colors z-40 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="h-16 flex items-center px-6 border-b border-slate-200/50 dark:border-[#165DFF]/20 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#165DFF]/50 to-transparent dark:via-[#00D4FF]/50"></div>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#165DFF] to-[#00D4FF] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(22,93,255,0.4)]">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300 tracking-wider">人力数据驾驶舱</h1>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                isActive
                  ? "bg-blue-50/80 dark:bg-[#165DFF]/15 text-[#165DFF] dark:text-[#00D4FF] shadow-sm font-medium border border-[#165DFF]/10 dark:border-[#00D4FF]/30"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#165DFF]/10 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D4FF] to-[#165DFF] shadow-[0_0_8px_#00D4FF]" />}
                <item.icon className={`w-4 h-4 ${isActive ? 'text-[#165DFF] dark:text-[#00D4FF]' : 'text-slate-400 dark:text-slate-500 group-hover:text-[#165DFF] dark:group-hover:text-[#00D4FF]'}`} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200/50 dark:border-[#165DFF]/20 text-[10px] text-slate-400 dark:text-slate-500 text-center uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
        v2.0.1 Data Cockpit
      </div>
    </aside>
  );
}
