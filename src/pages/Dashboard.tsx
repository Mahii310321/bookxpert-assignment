import EmployeeForm from '@/components/dashboard/EmployeeForm';
import EmployeeTable from '@/components/dashboard/EmployeeTable';
import Header from '@/components/dashboard/Header';
import PrintView from '@/components/dashboard/PrintView';
import SearchFilter from '@/components/dashboard/SearchFilter';
import StatCard from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { useEmployees } from '@/contexts/EmployeeContext';
import { Employee, FilterGender, FilterStatus } from '@/types/employee';
import { Plus, Printer, UserCheck, Users, UserX } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

function Dashboard() {
  const { employees, totalEmployees, activeEmployees, inactiveEmployees } = useEmployees();


  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);


  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<FilterGender>('All');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');


  // Print ref
  const printRef = useRef<HTMLDivElement>(null);
  const singlePrintRef = useRef<HTMLDivElement>(null);
  const [printEmployee, setPrintEmployee] = useState<Employee | null>(null);


  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === 'All' || emp.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && emp.isActive) ||
        (statusFilter === 'Inactive' && !emp.isActive);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, genderFilter, statusFilter]);

  const hasActiveFilters = searchTerm !== '' || genderFilter !== 'All' || statusFilter !== 'All';

  function clearFilters() {
    setSearchTerm('');
    setGenderFilter('All');
    setStatusFilter('All');
  };

  function handleAddEmployee() {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  function handleEditEmployee(employee: Employee) {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  const handlePrintAll = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Employee List',
  });

  const handlePrintSingle = useReactToPrint({
    contentRef: singlePrintRef,
    documentTitle: printEmployee ? `Employee - ${printEmployee.fullName}` : 'Employee',
  });

  const handlePrintEmployee = (employee: Employee) => {
    setPrintEmployee(employee);
    setTimeout(() => {
      handlePrintSingle();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">

          <StatCard
            title="Total Employees"
            value={totalEmployees}
            icon={Users}
            variant="primary"
            description="All registered employees"
          />
          <StatCard
            title="Active Employees"
            value={activeEmployees}
            icon={UserCheck}
            variant="success"
            description="Currently working"
          />
          <StatCard
            title="Inactive Employees"
            value={inactiveEmployees}
            icon={UserX}
            variant="warning"
            description="On leave or terminated"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Employee List</h2>
            <p className="text-muted-foreground">
              Manage and view all employee records
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handlePrintAll()}
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              Print All
            </Button>
            <Button onClick={handleAddEmployee} className="btn-gradient gap-2">
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </div>
        </div>
        {/* Search & Filters */}
        <div className="mb-6 animate-slide-up">
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            genderFilter={genderFilter}
            onGenderChange={setGenderFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Results Count */}
        {hasActiveFilters && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredEmployees.length} of {totalEmployees} employees
          </p>
        )}

        {/* Employee Table */}
        <div className="animate-slide-up">
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onPrint={handlePrintEmployee}
          />
        </div>
      </main>

      {/* Employee Form Modal */}
      <EmployeeForm
        open={isFormOpen}
        onClose={handleCloseForm}
        employee={editingEmployee}
      />

      {/* Hidden Print Views */}
      <div className="hidden">
        <PrintView ref={printRef} employees={filteredEmployees} />
        {printEmployee && (
          <PrintView
            ref={singlePrintRef}
            employees={[printEmployee]}
            title={`Employee: ${printEmployee.fullName}`}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard