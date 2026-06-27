import React from 'react';
import { PieChart as LucidePieChart } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RevenueVisualizationData as ChartType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';

interface RevenueVisualizationProps {
  data: ChartType;
  isLoading: boolean;
}

export const RevenueVisualization: React.FC<RevenueVisualizationProps> = ({
  data,
  isLoading,
}) => {
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass px-3 py-2 border border-white/10 rounded-lg shadow-lg text-[10px] font-semibold text-gray-800 dark:text-gray-200">
          <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <SectionWrapper
      id="revenue-visualization"
      title="Revenue & Growth Visualizations"
      description="Visual estimation models for monetization pools and marketing channels."
      icon={<LucidePieChart className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Sources Pie Chart */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-4 flex flex-col justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5 pb-2">
            Estimated Revenue Pools
          </h4>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.revenueSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.revenueSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={customTooltip} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Customer Segments Bar Chart */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-4 flex flex-col justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5 pb-2">
            Estimated Customer Segments
          </h4>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.customerSegments}>
                <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} unit="%" />
                <Tooltip content={customTooltip} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Acquisition Channels Bar Chart */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-4 flex flex-col justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5 pb-2">
            Acquisition Channels
          </h4>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.acquisitionChannels}>
                <XAxis type="number" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} unit="%" />
                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} width={80} />
                <Tooltip content={customTooltip} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {data.acquisitionChannels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
