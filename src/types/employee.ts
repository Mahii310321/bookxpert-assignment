export interface Employee {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
}

export type FilterGender = 'All' | 'Male' | 'Female' | 'Other';
export type FilterStatus = 'All' | 'Active' | 'Inactive';
