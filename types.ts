
export type Department = 'Engineering' | 'HR' | 'Marketing' | 'Sales' | 'Finance' | 'Design';
export type EmploymentStatus = 'Full-time' | 'Contract' | 'Remote' | 'Probation';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  email: string;
  avatar: string;
  status: EmploymentStatus;
  joinDate: string;
  performanceScore?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface JobOpening {
  id: string;
  title: string;
  department: Department;
  location: string;
  status: 'Open' | 'Closed' | 'Draft';
  applicants: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
