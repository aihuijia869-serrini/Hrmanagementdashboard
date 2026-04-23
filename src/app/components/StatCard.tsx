interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-500',
    text: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'bg-green-500',
    text: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-500',
    text: 'text-purple-600',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'bg-orange-500',
    text: 'text-orange-600',
  },
};

export default function StatCard({ title, value, unit, icon, color }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} rounded-2xl p-6 shadow-sm border border-white/50 backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${colors.icon} rounded-xl p-3 text-white`}>{icon}</div>
      </div>
      <div className="space-y-1">
        <p className="text-slate-600 text-sm">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${colors.text}`}>{value.toLocaleString()}</span>
          <span className="text-slate-500 text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
}
