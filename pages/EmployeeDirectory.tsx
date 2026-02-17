
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, MapPin, Building2, Download } from 'lucide-react';
import { Employee, Department } from '../types';

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'James Wilson', role: 'Full Stack Developer', department: 'Engineering', email: 'james.w@nexus.com', avatar: '10', status: 'Full-time', joinDate: '2022-03-15' },
  { id: '2', name: 'Elena Rodriguez', role: 'HR Business Partner', department: 'HR', email: 'elena.r@nexus.com', avatar: '11', status: 'Full-time', joinDate: '2021-11-01' },
  { id: '3', name: 'Marcus Thorne', role: 'Sales Executive', department: 'Sales', email: 'marcus.t@nexus.com', avatar: '12', status: 'Full-time', joinDate: '2023-01-20' },
  { id: '4', name: 'Sophie Laurent', role: 'Product Designer', department: 'Design', email: 'sophie.l@nexus.com', avatar: '13', status: 'Remote', joinDate: '2022-06-12' },
  { id: '5', name: 'David Kim', role: 'DevOps Engineer', department: 'Engineering', email: 'david.k@nexus.com', avatar: '14', status: 'Contract', joinDate: '2023-05-10' },
  { id: '6', name: 'Sarah Connor', role: 'Marketing Lead', department: 'Marketing', email: 'sarah.c@nexus.com', avatar: '15', status: 'Full-time', joinDate: '2020-09-15' },
];

const EmployeeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState<Department | 'All'>('All');

  const filtered = MOCK_EMPLOYEES.filter(emp => 
    (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     emp.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterDept === 'All' || emp.department === filterDept)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employee Directory</h1>
          <p className="text-slate-500">Manage and view all members of your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select 
          className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value as any)}
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((emp) => (
          <div key={emp.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={`https://picsum.photos/seed/user${emp.avatar}/100/100`} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${emp.status === 'Remote' ? 'bg-indigo-400' : 'bg-emerald-500'}`}></div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{emp.name}</h3>
                  <p className="text-sm text-slate-500">{emp.role}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400" />
                {emp.department}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                {emp.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                San Francisco, CA
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                emp.status === 'Full-time' ? 'bg-emerald-50 text-emerald-600' :
                emp.status === 'Remote' ? 'bg-indigo-50 text-indigo-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {emp.status}
              </span>
              <button className="text-sm font-semibold text-indigo-600 hover:underline">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
