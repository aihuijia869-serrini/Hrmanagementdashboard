import { PersonnelStructureModule } from "./modules/PersonnelStructureModule";
import { LaborCostModule } from "./modules/LaborCostModule";
import { TurnoverModule } from "./modules/TurnoverModule";
import { SalaryExecutionModule } from "./modules/SalaryExecutionModule";
import { KeyWarningsModule } from "./modules/KeyWarningsModule";

interface ModuleGridProps {
  onChartClick: (title: string) => void;
}

export function ModuleGrid({ onChartClick }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
      {/* Row 1 */}
      <div className="lg:col-span-2 h-[420px]">
        <PersonnelStructureModule onClick={onChartClick} />
      </div>
      <div className="lg:col-span-1 h-[420px]">
        <LaborCostModule onClick={onChartClick} />
      </div>
      <div className="lg:col-span-1 h-[420px]">
        <TurnoverModule onClick={onChartClick} />
      </div>
      
      {/* Row 2 */}
      <div className="lg:col-span-2 h-[380px]">
        <SalaryExecutionModule onClick={onChartClick} />
      </div>
      <div className="lg:col-span-2 h-[380px]">
        <KeyWarningsModule onClick={onChartClick} />
      </div>
    </div>
  );
}
