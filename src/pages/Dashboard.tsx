import Header from '@/components/dashboard/Header';
import { useEmployees } from '@/contexts/EmployeeContext';
import { Employee, FilterGender, FilterStatus } from '@/types/employee';
import React, { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';

function Dashboard() {
  // const { employees, totalEmployees, activeEmployees, inactiveEmployees } = useEmployees();


  // // Form state
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);


  // // Filter state
  // const [searchTerm, setSearchTerm] = useState('');
  // const [genderFilter, setGenderFilter] = useState<FilterGender>('All');
  // const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');


  // // Print ref
  // const printRef = useRef<HTMLDivElement>(null);
  // const singlePrintRef = useRef<HTMLDivElement>(null);
  // const [printEmployee, setPrintEmployee] = useState<Employee | null>(null);


  // // Filtered employees
  // const filteredEmployees = useMemo(() => {
  //   return employees.filter(emp => {
  //     const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesGender = genderFilter === 'All' || emp.gender === genderFilter;
  //     const matchesStatus =
  //       statusFilter === 'All' ||
  //       (statusFilter === 'Active' && emp.isActive) ||
  //       (statusFilter === 'Inactive' && !emp.isActive);

  //     return matchesSearch && matchesGender && matchesStatus;
  //   });
  // }, [employees, searchTerm, genderFilter, statusFilter]);

  // const hasActiveFilters = searchTerm !== '' || genderFilter !== 'All' || statusFilter !== 'All';

  // function clearFilters() {
  //   setSearchTerm('');
  //   setGenderFilter('All');
  //   setStatusFilter('All');
  // };

  // function handleAddEmployee() {
  //   setEditingEmployee(null);
  //   setIsFormOpen(true);
  // };

  // function handleEditEmployee(employee: Employee) {
  //   setEditingEmployee(employee);
  //   setIsFormOpen(true);
  // };

  // function handleCloseForm() {
  //   setIsFormOpen(false);
  //   setEditingEmployee(null);
  // };

  // const handlePrintAll = useReactToPrint({
  //   contentRef: printRef,
  //   documentTitle: 'Employee List',
  // });

  // const handlePrintSingle = useReactToPrint({
  //   contentRef: singlePrintRef,
  //   documentTitle: printEmployee ? `Employee - ${printEmployee.fullName}` : 'Employee',
  // });

  // const handlePrintEmployee = (employee: Employee) => {
  //   setPrintEmployee(employee);
  //   setTimeout(() => {
  //     handlePrintSingle();
  //   }, 100);
  // };

  return (
    <div className="min-h-screen bg-background">
      <Header />


    </div>
  );
}

export default Dashboard