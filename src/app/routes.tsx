import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { PersonnelStructure } from "./pages/PersonnelStructure";
import { LaborCost } from "./pages/LaborCost";
import { PersonnelTurnover } from "./pages/PersonnelTurnover";
import { WageExecution } from "./pages/WageExecution";
import { TrainingSituation } from "./pages/TrainingSituation";
import { BudgetMonitor } from "./pages/BudgetMonitor";

// Dummy page for routes that haven't been built yet
function DummyPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[500px] text-slate-500 dark:text-slate-400">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Overview },
      { path: "personnel", Component: PersonnelStructure },
      { path: "cost", Component: LaborCost },
      { path: "turnover", Component: PersonnelTurnover },
      { path: "salary", Component: WageExecution },
      { path: "training", Component: TrainingSituation },
      { path: "budget", Component: BudgetMonitor },
      { path: "warnings", Component: () => <DummyPage title="关键预警明细详情页" /> },
      { path: "*", Component: () => <DummyPage title="页面建设中 (404 Not Found)" /> },
    ],
  },
]);
