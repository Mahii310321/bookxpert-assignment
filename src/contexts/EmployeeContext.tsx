import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Employee, EmployeeFormData } from "../types/employee";
import { mockEmployees } from "../data/mockEmployees";


interface EmployeeContextType {
    employees: Employee[],
    addEmployee: (data: EmployeeFormData) => void;
    updateEmployee: (id: string, data: EmployeeFormData) => void;
    deleteEmployee: (id: string) => void;
    toggleEmployeeStatus: (id: string) => void;
    getEmployee: (id: string) => Employee | undefined;
    totalEmployees: number;
    activeEmployees: number;
    inactiveEmployees: number;

}


interface EmployeeProviderProps {
    children: ReactNode;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        // Load from localStorage or use mock data till backend is ready
        const stored = localStorage.getItem('employees');
        if (stored) {
            setEmployees(JSON.parse(stored));
        } else {
            setEmployees(mockEmployees);
            localStorage.setItem('employees', JSON.stringify(mockEmployees));
        }
    }, []);

    function saveToStorage(data: Employee[]) {
        localStorage.setItem('employees', JSON.stringify(data));
    }

    function generateId() {
        const maxId = employees.reduce((max, emp) => {
            const num = parseInt(emp.id.replace('EMP', ''));
            return num > max ? num : max;
        }, 0);
        return `EMP${String(maxId + 1).padStart(3, '0')}`;
    }

    function addEmployee(data: EmployeeFormData) {
        const newEmployee: Employee = {
            id: generateId(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const updated = [...employees, newEmployee];
        setEmployees(updated);
        saveToStorage(updated);
    }

    function updateEmployee(id: string, data: EmployeeFormData) {
        const updated = employees.map(emp =>
            emp.id === id ? { ...emp, ...data, updatedAt: new Date().toISOString() } : emp
        );
        setEmployees(updated);
        saveToStorage(updated);
    }

    function deleteEmployee(id: string) {
        const updated = employees.filter(emp => emp.id !== id);
        setEmployees(updated);
        saveToStorage(updated);
    }

    function toggleEmployeeStatus(id: string) {
        const updated = employees.map(emp =>
            emp.id === id ? { ...emp, isActive: !emp.isActive, updatedAt: new Date().toISOString() } : emp
        );
        setEmployees(updated);
        saveToStorage(updated);
    }

    function getEmployee(id: string) {
        return employees.find(emp => emp.id === id);
    }


    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.isActive).length;
    const inactiveEmployees = employees.filter(emp => !emp.isActive).length;

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                addEmployee,
                updateEmployee,
                deleteEmployee,
                toggleEmployeeStatus,
                getEmployee,
                totalEmployees,
                activeEmployees,
                inactiveEmployees,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );

}