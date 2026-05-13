import { X, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DrillDownModalProps {
  isOpen: boolean;
  title: string;
  type: string; // 'kpi' or 'chart'
  onClose: () => void;
}

export function DrillDownModal({ isOpen, title, type, onClose }: DrillDownModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Mock table data based on title
  const columns = ['工号', '姓名', '部门', '岗位', '状态', '备注'];
  const data = [
    { id: 'EMP001', name: '张三', dept: '研发部', role: '高级工程师', status: '在职', note: '-' },
    { id: 'EMP002', name: '李四', dept: '市场部', role: '市场总监', status: '在职', note: '-' },
    { id: 'EMP003', name: '王五', dept: '销售部', role: '区域经理', status: '在职', note: '-' },
    { id: 'EMP004', name: '赵六', dept: '研发部', role: '产品经理', status: '在职', note: '本月转正' },
    { id: 'EMP005', name: '孙七', dept: '人事部', role: 'HRBP', status: '在职', note: '-' },
  ];

  const isWarning = title.includes('预警');

  // Map titles to detail page routes
  const getDetailRoute = (title: string): string => {
    if (title.includes('人员结构') || title.includes('学历') || title.includes('年龄') || title.includes('人员类型')) {
      return '/personnel';
    } else if (title.includes('人工成本') || title.includes('成本')) {
      return '/cost';
    } else if (title.includes('人员变动') || title.includes('入职') || title.includes('离职') || title.includes('流失')) {
      return '/turnover';
    } else if (title.includes('工资') || title.includes('预算') || title.includes('执行')) {
      return '/salary';
    } else if (title.includes('预警') || title.includes('培训')) {
      return '/warnings';
    }
    return '/';
  };

  const handleViewDetails = () => {
    const route = getDetailRoute(title);
    navigate(route);
    onClose();
  };

  const handleExport = () => {
    // Mock export functionality - in production would export to Excel/CSV
    const exportData = data.map(row => ({
      工号: row.id,
      姓名: row.name,
      部门: row.dept,
      岗位: row.role,
      状态: row.status,
      备注: row.note
    }));

    console.log('导出数据:', exportData);
    alert(`已导出 ${data.length} 条明细记录\n文件名: ${title}_明细台账_${new Date().toLocaleDateString('zh-CN')}.xlsx`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className={`
        relative w-full max-w-4xl bg-white dark:bg-[#0f172a] border rounded-xl shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200
        ${isWarning ? 'border-red-200 dark:border-[#F53F3F]/50 shadow-[0_0_30px_rgba(245,63,63,0.1)] dark:shadow-[0_0_30px_rgba(245,63,63,0.15)]' : 'border-blue-200 dark:border-[#165DFF]/30 shadow-[0_0_30px_rgba(22,93,255,0.1)] dark:shadow-[0_0_30px_rgba(22,93,255,0.15)]'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-5 rounded-full ${isWarning ? 'bg-[#F53F3F]' : 'bg-[#165DFF]'}`}></div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">{title} - 明细数据</h2>
            <span className="bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded ml-2">数据实时生成</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10"
            >
              <Download className="w-3.5 h-3.5" />
              导出台账
            </button>
            <button
              onClick={handleViewDetails}
              className={`flex items-center gap-1.5 text-xs text-white px-3 py-1.5 rounded transition-colors ${isWarning ? 'bg-[#F53F3F] hover:bg-[#F53F3F]/80' : 'bg-[#165DFF] hover:bg-[#165DFF]/80'}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              查看完整分析
            </button>
            <div className="w-px h-4 bg-slate-300 dark:bg-white/20 mx-1"></div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - Data Table */}
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          <div className="rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-50/50 dark:bg-[#111827]/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-white/10">
                <tr>
                  {columns.map(col => (
                    <th key={col} className="px-4 py-3 font-medium">{col}</th>
                  ))}
                  <th className="px-4 py-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-400">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors bg-white dark:bg-transparent">
                    <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                    <td className="px-4 py-3 text-slate-800 dark:text-white">{row.name}</td>
                    <td className="px-4 py-3">{row.dept}</td>
                    <td className="px-4 py-3">{row.role}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">{row.status}</span>
                    </td>
                    <td className="px-4 py-3">{row.note}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[#165DFF] hover:text-blue-700 dark:hover:text-white transition-colors text-xs">查看画像</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Mock */}
          <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
            <span>共 1,245 条记录，当前第 1/125 页</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">上一页</button>
              <button className="px-2 py-1 rounded bg-[#165DFF] text-white border border-[#165DFF]">1</button>
              <button className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">2</button>
              <button className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">3</button>
              <button className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">...</button>
              <button className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
