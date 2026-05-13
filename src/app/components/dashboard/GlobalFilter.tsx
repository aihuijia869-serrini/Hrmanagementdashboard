import { useState, useContext, useEffect } from "react";
import { 
  Building2, 
  Calendar, 
  RefreshCcw, 
  Download, 
  Maximize,
  Filter,
  Sun,
  Moon,
  Minimize
} from "lucide-react";
import { FilterContext } from "../Layout";
import { useTheme } from "next-themes";

export function GlobalFilter() {
  const [org, setOrg] = useState("集团总部");
  const [period, setPeriod] = useState("2026年度");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { triggerRefresh } = useContext(FilterContext);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    triggerRefresh();
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Check if fullscreen is supported and allowed
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      // Silently handle fullscreen errors (permissions policy, not supported, etc.)
      // This is expected in some environments like iframes
    }
  };

  const handleExportReport = () => {
    // Mock export entire dashboard report
    const reportData = {
      组织: org,
      统计周期: period,
      导出时间: new Date().toLocaleString('zh-CN'),
      报告类型: '人力数据驾驶舱总览大屏'
    };

    console.log('导出完整报告:', reportData);
    alert(`✅ 正在生成完整报告...\n\n📊 报告类型: 人力数据驾驶舱总览\n🏢 组织范围: ${org}\n📅 统计周期: ${period}\n📁 导出格式: PDF + Excel双格式\n⏰ 生成时间: ${new Date().toLocaleString('zh-CN')}\n\n报告将包含:\n• 8项核心KPI指标\n• 5大业务模块图表\n• 全部明细数据台账`);
  };

  if (!mounted) {
    return (
      <div className="bg-white/90 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#165DFF]/20 px-6 py-4 flex items-center justify-center h-20">
        <div className="text-sm text-slate-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#165DFF]/20 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative transition-colors duration-300">
      {/* Tech line indicator (Dark mode only) */}
      <div className="hidden dark:block absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#165DFF] to-transparent w-full opacity-50"></div>

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-[#165DFF]/10 border border-blue-100 dark:border-[#165DFF]/30">
          <Building2 className="w-5 h-5 text-[#165DFF]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-wide">
            人力数据驾驶舱 <span className="text-[#165DFF] ml-2 text-lg">|</span> <span className="text-slate-500 dark:text-slate-400 text-base font-normal ml-2">总览大屏</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Org Selector */}
        <div className="flex items-center bg-slate-50 dark:bg-[#1e293b]/60 border border-slate-200 dark:border-[#334155] rounded-md px-3 py-1.5 hover:border-[#165DFF]/50 transition-colors cursor-pointer">
          <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">组织:</span>
          <select 
            value={org}
            onChange={(e) => handleFilterChange(setOrg, e.target.value)}
            className="bg-transparent text-slate-700 dark:text-white text-sm outline-none appearance-none cursor-pointer pr-4"
          >
            <option value="集团总部">集团总部</option>
            <option value="华东分公司">华东分公司</option>
            <option value="华南研发中心">华南研发中心</option>
          </select>
        </div>

        {/* Time Selector */}
        <div className="flex items-center bg-slate-50 dark:bg-[#1e293b]/60 border border-slate-200 dark:border-[#334155] rounded-md px-3 py-1.5 hover:border-[#165DFF]/50 transition-colors cursor-pointer">
          <Calendar className="w-4 h-4 text-[#165DFF] mr-2" />
          <select 
            value={period}
            onChange={(e) => handleFilterChange(setPeriod, e.target.value)}
            className="bg-transparent text-slate-700 dark:text-white text-sm outline-none appearance-none cursor-pointer pr-4"
          >
            <option value="2026年度">2026年度</option>
            <option value="2026年Q1">2026年Q1</option>
            <option value="2026年5月">2026年5月</option>
          </select>
        </div>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>

        {/* Action Buttons */}
        <button 
          onClick={triggerRefresh}
          className="flex items-center justify-center p-2 rounded-md bg-slate-50 dark:bg-[#1e293b]/60 border border-slate-200 dark:border-[#334155] text-slate-600 dark:text-slate-300 hover:text-[#165DFF] dark:hover:text-white hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all group" 
          title="刷新数据"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        </button>
        <button 
          onClick={() => triggerRefresh()}
          className="flex items-center justify-center p-2 rounded-md bg-slate-50 dark:bg-[#1e293b]/60 border border-slate-200 dark:border-[#334155] text-slate-600 dark:text-slate-300 hover:text-[#165DFF] dark:hover:text-white hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all" 
          title="重置维度"
        >
          <Filter className="w-4 h-4" />
        </button>
        <button
          onClick={handleExportReport}
          className="flex items-center justify-center p-2 rounded-md bg-slate-50 dark:bg-[#1e293b]/60 border border-slate-200 dark:border-[#334155] text-slate-600 dark:text-slate-300 hover:text-[#165DFF] dark:hover:text-white hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all"
          title="导出报告"
        >
          <Download className="w-4 h-4" />
        </button>
        
        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center p-2 rounded-md bg-slate-50 dark:bg-[#1e293b]/60 border border-slate-200 dark:border-[#334155] text-slate-600 dark:text-slate-300 hover:text-[#165DFF] dark:hover:text-white hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all" 
          title="切换主题"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button 
          onClick={toggleFullscreen}
          className="flex items-center justify-center p-2 rounded-md bg-[#165DFF] text-white hover:bg-[#165DFF]/90 shadow-md dark:shadow-[0_0_10px_rgba(22,93,255,0.4)] transition-all border border-[#165DFF]" 
          title={isFullscreen ? "退出全屏" : "全屏模式"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
