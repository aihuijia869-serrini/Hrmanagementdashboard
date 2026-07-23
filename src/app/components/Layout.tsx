import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { GlobalFilter } from "./dashboard/GlobalFilter";
import { Sidebar } from "./Sidebar";

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
      <div className="min-h-screen bg-[#FFFBFE] dark:bg-[#0a0f1c] text-[#1C1B1F] dark:text-slate-200 overflow-hidden relative flex" style={{ fontFamily: "'Roboto', sans-serif" }}>
        {/* Background (Dark Mode) */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block bg-[#050A15]">
          <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-[#165DFF]/10 rounded-full blur-[150px] mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#00D4FF]/5 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        {/* Background (Light Mode) — Material You warm surface */}
        <div className="fixed inset-0 pointer-events-none z-0 dark:hidden block bg-[#FFFBFE]"></div>

        <Sidebar />

        <div className="relative z-10 flex flex-col h-screen flex-1 min-w-0">
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
