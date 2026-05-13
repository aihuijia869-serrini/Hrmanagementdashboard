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
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-4 bg-[#165DFF] rounded-r-md mr-2 dark:shadow-[0_0_8px_#165DFF]"></div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wider">全局核心指标总览</h2>
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
