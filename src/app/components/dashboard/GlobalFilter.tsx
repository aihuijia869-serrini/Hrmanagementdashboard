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
      <div className="bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-[#165DFF]/20 px-6 py-4 flex items-center justify-center h-20">
        <div className="text-sm text-slate-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-[#165DFF]/20 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] relative z-30 transition-colors duration-300">
      {/* Tech line indicator (Dark mode only) */}
      <div className="hidden dark:block absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent w-full"></div>

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-[#165DFF]/20 to-[#00D4FF]/20 border border-[#165DFF]/30 dark:border-[#00D4FF]/30">
          <Building2 className="w-4 h-4 text-[#165DFF] dark:text-[#00D4FF]" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300 tracking-wide">
            人力数据驾驶舱 <span className="text-[#165DFF] dark:text-[#00D4FF] ml-2">|</span> <span className="text-slate-500 dark:text-slate-400 font-normal ml-2">总览大屏</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Org Selector */}
        <div className="flex items-center bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-[#165DFF]/20 rounded px-3 py-1.5 hover:border-[#165DFF]/50 transition-all cursor-pointer shadow-inner">
          <span className="text-[13px] text-slate-500 dark:text-slate-400 mr-2">组织:</span>
          <select 
            value={org}
            onChange={(e) => handleFilterChange(setOrg, e.target.value)}
            className="bg-transparent text-slate-700 dark:text-slate-200 text-[13px] outline-none appearance-none cursor-pointer pr-4 font-medium"
          >
            <option value="集团总部">集团总部</option>
            <option value="华东分公司">华东分公司</option>
            <option value="华南研发中心">华南研发中心</option>
          </select>
        </div>

        {/* Time Selector */}
        <div className="flex items-center bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-[#165DFF]/20 rounded px-3 py-1.5 hover:border-[#165DFF]/50 transition-all cursor-pointer shadow-inner">
          <Calendar className="w-3.5 h-3.5 text-[#165DFF] dark:text-[#00D4FF]/80 mr-2" />
          <select 
            value={period}
            onChange={(e) => handleFilterChange(setPeriod, e.target.value)}
            className="bg-transparent text-slate-700 dark:text-slate-200 text-[13px] outline-none appearance-none cursor-pointer pr-4 font-medium"
          >
            <option value="2026年度">2026年度</option>
            <option value="2026年Q1">2026年Q1</option>
            <option value="2026年5月">2026年5月</option>
          </select>
        </div>

        <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1"></div>

        {/* Action Buttons */}
        <button 
          onClick={triggerRefresh}
          className="flex items-center justify-center p-1.5 rounded bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-[#165DFF]/20 text-slate-600 dark:text-slate-400 hover:text-[#165DFF] dark:hover:text-[#00D4FF] hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all group shadow-sm" 
          title="刷新数据"
        >
          <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
        <button 
          onClick={() => triggerRefresh()}
          className="flex items-center justify-center p-1.5 rounded bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-[#165DFF]/20 text-slate-600 dark:text-slate-400 hover:text-[#165DFF] dark:hover:text-[#00D4FF] hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all shadow-sm" 
          title="重置维度"
        >
          <Filter className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleExportReport}
          className="flex items-center justify-center p-1.5 rounded bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-[#165DFF]/20 text-slate-600 dark:text-slate-400 hover:text-[#165DFF] dark:hover:text-[#00D4FF] hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all shadow-sm"
          title="导出报告"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
        
        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center p-1.5 rounded bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-[#165DFF]/20 text-slate-600 dark:text-slate-400 hover:text-[#165DFF] dark:hover:text-[#00D4FF] hover:border-[#165DFF] hover:bg-blue-50 dark:hover:bg-[#165DFF]/10 transition-all shadow-sm" 
          title="切换主题"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        <button 
          onClick={toggleFullscreen}
          className="flex items-center justify-center p-1.5 rounded bg-gradient-to-r from-[#165DFF] to-[#00D4FF] text-white hover:from-[#165DFF] hover:to-[#14C9C9] shadow-[0_0_10px_rgba(22,93,255,0.4)] hover:shadow-[0_0_15px_rgba(22,93,255,0.6)] transition-all border border-transparent" 
          title={isFullscreen ? "退出全屏" : "全屏模式"}
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
