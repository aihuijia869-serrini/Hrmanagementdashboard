import { KPIGrid } from "../components/dashboard/KPIGrid";
import { ModuleGrid } from "../components/dashboard/ModuleGrid";
import { useState, useContext } from "react";
import { DrillDownModal } from "../components/dashboard/DrillDownModal";
import { FilterContext } from "../components/Layout";

export function Overview() {
  const [modalState, setModalState] = useState<{isOpen: boolean; title: string; type: string}>({
    isOpen: false,
    title: "",
    type: ""
  });
  
  const { refreshKey } = useContext(FilterContext);

  const handleOpenModal = (title: string, type: string) => {
    setModalState({ isOpen: true, title, type });
  };

  return (
    <div key={refreshKey} className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
      {/* Top Core KPIs */}
      <section>
        <div className="flex items-center mb-4 relative">
          <div className="w-1.5 h-4 bg-gradient-to-b from-[#00D4FF] to-[#165DFF] rounded-r-md mr-2 shadow-[0_0_10px_#00D4FF] relative z-10"></div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-300 tracking-wider relative z-10">全局核心指标总览</h2>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-8 bg-[#165DFF]/10 dark:bg-[#00D4FF]/10 blur-xl rounded-full"></div>
        </div>
        <KPIGrid onCardClick={(title) => handleOpenModal(title, "kpi")} />
      </section>

      {/* Middle Business Modules Grid */}
      <section className="flex-1">
        <ModuleGrid onChartClick={(title) => handleOpenModal(title, "chart")} />
      </section>

      {/* Detail Modal */}
      {modalState.isOpen && (
        <DrillDownModal 
          isOpen={modalState.isOpen} 
          title={modalState.title}
          type={modalState.type}
          onClose={() => setModalState({ ...modalState, isOpen: false })} 
        />
      )}
    </div>
  );
}
