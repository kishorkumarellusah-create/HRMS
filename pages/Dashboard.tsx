
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, UserPlus, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const attendanceData = [
  { name: 'Mon', present: 120, late: 4 },
  { name: 'Tue', present: 118, late: 6 },
  { name: 'Wed', present: 122, late: 2 },
  { name: 'Thu', present: 115, late: 9 },
  { name: 'Fri', present: 110, late: 14 },
];

const growthData = [
  { month: 'Jan', count: 80 },
  { month: 'Feb', count: 85 },
  { month: 'Mar', count: 92 },
  { month: 'Apr', count: 105 },
  { month: 'May', count: 118 },
  { month: 'Jun', count: 125 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {trend && (
        <div className={`mt-2 flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
          {Math.abs(trend)}% from last month
        </div>
      )}
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome Back, Sarah</h1>
        <p className="text-slate-500">Here's what's happening with your workforce today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value="128" icon={Users} trend={12} color="bg-indigo-500" />
        <StatCard title="New Applicants" value="42" icon={UserPlus} trend={5} color="bg-blue-500" />
        <StatCard title="Leave Requests" value="12" icon={Clock} trend={-2} color="bg-amber-500" />
        <StatCard title="Open Positions" value="8" icon={AlertCircle} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Overview</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="present" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Headcount Growth</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Recent Employee Activities</h3>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { name: 'Michael Chen', action: 'joined the Engineering team', time: '2 hours ago', avatar: '1' },
            { name: 'Sarah Miller', action: 'requested vacation leave', time: '4 hours ago', avatar: '2' },
            { name: 'John Doe', action: 'updated his bank details', time: 'Yesterday', avatar: '3' },
            { name: 'Alicia Keys', action: 'promoted to Senior Designer', time: 'Yesterday', avatar: '4' },
          ].map((activity, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <img src={`https://picsum.photos/seed/user${activity.avatar}/40/40`} className="w-10 h-10 rounded-full" alt="" />
              <div>
                <p className="text-sm text-slate-800"><span className="font-semibold">{activity.name}</span> {activity.action}</p>
                <p className="text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
