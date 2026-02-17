
import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';
import { LeaveRequest } from '../types';

const MOCK_LEAVES: LeaveRequest[] = [
  { id: '1', employeeId: '10', employeeName: 'Michael Chen', type: 'Annual', startDate: '2024-06-15', endDate: '2024-06-20', reason: 'Family trip to Japan', status: 'Pending' },
  { id: '2', employeeId: '11', employeeName: 'Sarah Miller', type: 'Sick', startDate: '2024-06-10', endDate: '2024-06-12', reason: 'Fever', status: 'Approved' },
  { id: '3', employeeId: '12', employeeName: 'Robert Fox', type: 'Personal', startDate: '2024-06-25', endDate: '2024-06-25', reason: 'Moving day', status: 'Rejected' },
];

const LeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState(MOCK_LEAVES);

  const updateStatus = (id: string, newStatus: any) => {
    setLeaves(prev => prev.map(l => l.id === id ? {...l, status: newStatus} : l));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
          <p className="text-slate-500">Review and manage employee time-off requests.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <Plus className="w-5 h-5" />
          Request Leave
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Pending</span>
                <span className="font-bold text-slate-800">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Approved</span>
                <span className="font-bold text-slate-800">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 flex items-center gap-2"><XCircle className="w-4 h-4 text-rose-500" /> Rejected</span>
                <span className="font-bold text-slate-800">2</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl text-white">
            <h3 className="font-bold mb-2">Calendar View</h3>
            <p className="text-indigo-100 text-sm mb-4">See who is out this week to better plan your resources.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
              Open Calendar
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800">Recent Requests</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Employee</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Dates</th>
                    <th className="px-6 py-4 font-semibold">Reason</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leaves.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={`https://picsum.photos/seed/${request.employeeId}/32/32`} className="w-8 h-8 rounded-full" alt="" />
                          <span className="text-sm font-medium text-slate-800">{request.employeeName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{request.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{request.startDate} - {request.endDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500 line-clamp-1">{request.reason}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          request.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                          request.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {request.status === 'Pending' && (
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => updateStatus(request.id, 'Approved')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => updateStatus(request.id, 'Rejected')}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
