import { Employee } from '@/types/employee';
import { format } from 'date-fns';
import React, { forwardRef } from 'react'



interface PrintViewProps {
    employees: Employee[];
    title?: string;
}

const PrintView = forwardRef<HTMLDivElement, PrintViewProps>(
    ({ employees, title = 'Employee List' }, ref) => {
        return (
            <div ref={ref} className="p-8 bg-white text-black">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-gray-500 mt-1">
                        Generated on {format(new Date(), 'MMMM dd, yyyy')}
                    </p>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date of Birth</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{employee.fullName}</td>
                                <td className="border border-gray-300 px-4 py-2">{employee.gender}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {format(new Date(employee.dateOfBirth), 'MMM dd, yyyy')}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{employee.state}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {employee.isActive ? 'Active' : 'Inactive'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Total Employees: {employees.length}</p>
                </div>
            </div>
        );

    }
)
PrintView.displayName = 'PrintView';


export default PrintView