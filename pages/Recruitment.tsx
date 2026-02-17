
import React from 'react';
import { Briefcase, MapPin, Users, ChevronRight, PlusCircle } from 'lucide-react';
import { JobOpening } from '../types';

const JOBS: JobOpening[] = [
  { id: '1', title: 'Senior Product Manager', department: 'Design', location: 'London (Hybrid)', status: 'Open', applicants: 24 },
  { id: '2', title: 'Backend Engineer (Go)', department: 'Engineering', location: 'Remote', status: 'Open', applicants: 12 },
  { id: '3', title: 'Sales Director', department: 'Sales', location: 'New York', status: 'Draft', applicants: 0 },
  { id: '4', title: 'Marketing Coordinator', department: 'Marketing', location: 'San Francisco', status: 'Closed', applicants: 45 },
];

const Recruitment: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Recruitment</h1>
          <p className="text-slate-500">Post jobs, manage applicants and scale your team.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          <PlusCircle className="w-5 h-5" />
          Create Job Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Jobs', value: '12', color: 'bg-blue-600' },
          { label: 'New Applicants', value: '86', color: 'bg-indigo-600' },
          { label: 'Interviews Scheduled', value: '24', color: 'bg-violet-600' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-6 rounded-2xl text-white shadow-lg shadow-indigo-100`}>
            <p className="text-white/70 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Job Openings</h3>
          <div className="flex gap-2">
            {['All', 'Open', 'Draft', 'Closed'].map(filter => (
              <button key={filter} className="px-3 py-1 text-xs font-bold rounded-lg hover:bg-slate-50 text-slate-500">
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="divide-y divide-slate-50">
          {JOBS.map((job) => (
            <div key={job.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{job.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="w-3 h-3" /> {job.applicants} Applicants
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  job.status === 'Open' ? 'bg-emerald-50 text-emerald-600' :
                  job.status === 'Draft' ? 'bg-slate-100 text-slate-600' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  {job.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
