import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardLayout } from '../components/common/DashboardLayout';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  monthlyTrendsData, 
  foodCategoryBreakdown, 
  weeklyPickupStatusData, 
  carbonFootprintTrend 
} from '../data/mockData';
import { 
  Utensils, 
  HeartHandshake, 
  Package, 
  Leaf, 
  Download, 
  Calendar, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { stats, showToast } = useApp();
  const [timeRange, setTimeRange] = useState('6m');

  const handleExportData = () => {
    showToast('Analytics summary exported as CSV / PDF report.', 'success');
  };

  return (
    <DashboardLayout
      title="Platform Analytics & Sustainability Impact"
      subtitle="Quantitative metrics measuring surplus recovery, hunger relief, and municipal carbon offset."
      breadcrumb="Analytics"
      actionButton={
        <button
          onClick={handleExportData}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Viva Report</span>
        </button>
      }
    >
      {/* 4 Key Performance Indicator Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Food Saved
            </span>
            <div className="p-2 bg-green-50 text-green-700 rounded">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {stats.totalFoodSavedKg.toLocaleString()} <span className="text-sm font-normal text-gray-500">kg</span>
          </div>
          <div className="mt-1 text-xs text-green-700 font-medium">
            Saved from municipal landfills
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Meals Provided
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {stats.totalMealsProvided.toLocaleString()} <span className="text-sm font-normal text-gray-500">portions</span>
          </div>
          <div className="mt-1 text-xs text-blue-600 font-medium">
            Served through 28 partner shelters
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Donations Logged
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {stats.totalDonationsCount.toLocaleString()} <span className="text-sm font-normal text-gray-500">batches</span>
          </div>
          <div className="mt-1 text-xs text-amber-700 font-medium">
            Across 46 restaurant partners
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Estimated CO₂ Reduction
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">
            {stats.co2ReductionKg.toLocaleString()} <span className="text-sm font-normal text-gray-500">kg CO₂e</span>
          </div>
          <div className="mt-1 text-xs text-emerald-800 font-medium">
            Based on ~2.5 kg CO₂ avoided per kg food
          </div>
        </div>

      </div>

      {/* Chart Row 1: Food Donated Over Time & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Food Donated Over Time (Monthly Area Chart) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-md p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Surplus Food Donated Over Time (kg)
              </h3>
              <p className="text-xs text-gray-500">
                Monthly progression of recovered meals across Bengaluru.
              </p>
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
              +140% growth over 6 months
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="foodSavedKg" name="Food Saved (kg)" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorFood)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donations by Category (Pie Chart) */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Donations by Food Category (%)
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Breakdown of surplus types contributed by donors.
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={foodCategoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {foodCategoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val) => [`${val}%`, 'Share']}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clean Legend list */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
            {foodCategoryBreakdown.map(item => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Chart Row 2: Pickup Completion Rate & Carbon Footprint Reduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Pickup Completion Rate (Bar Chart) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-md p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Weekly Pickup Completion & Timeliness
              </h3>
              <p className="text-xs text-gray-500">
                On-time delivery vs delayed delivery runs this week.
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-600">
              96.2% On-Time SLA
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPickupStatusData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="onTime" name="On Time Deliveries" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" name="Delayed Deliveries" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Footprint Reduction (Line Chart) */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-gray-900">
                Carbon Offset (kg CO₂e)
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Weekly Trend
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Greenhouse gas emissions avoided by diverting organic matter from decomposition.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbonFootprintTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="co2Saved" name="CO₂ Prevented (kg)" stroke="#059669" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
