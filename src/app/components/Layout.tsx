import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { GlobalFilter } from "./dashboard/GlobalFilter";

export const FilterContext = React.createContext<{
  refreshKey: number;
  triggerRefresh: () => void;
}>({ refreshKey: 0, triggerRefresh: () => {} });

export function Layout() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <FilterContext.Provider value={{ refreshKey, triggerRefresh }}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] text-slate-800 dark:text-slate-200 overflow-x-hidden font-sans selection:bg-[#165DFF]/30 transition-colors duration-300 relative">
        {/* Background Effects (Dark Mode) */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#165DFF]/10 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#165DFF]/5 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-20"></div>
        </div>

        {/* Background Effects (Light Mode) */}
        <div className="fixed inset-0 pointer-events-none z-0 dark:hidden block bg-gradient-to-br from-blue-50/50 via-white to-slate-100/50">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#165DFF]/5 rounded-full blur-[100px] mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 flex flex-col h-screen">
          {/* Top Global Filter Bar - Sticky */}
          <header className="flex-none sticky top-0 z-50">
            <GlobalFilter />
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            <div className="max-w-[1920px] mx-auto w-full h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </FilterContext.Provider>
  );
}
