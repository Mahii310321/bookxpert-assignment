import { useEmployees } from '@/contexts/EmployeeContext';
import { Employee } from '@/types/employee';
import { Edit, Printer, Trash2, User } from 'lucide-react';
import React, { useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { getInitials } from '@/lib/utils';



interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onPrint: (employee: Employee) => void;
}


function EmployeeTable({ employees, onEdit, onPrint }: EmployeeTableProps) {
    const { deleteEmployee, toggleEmployeeStatus } = useEmployees();
    const [deleteId, setDeleteId] = useState<string | null>(null);



    function handleDelete() {
        if (deleteId) {
            deleteEmployee(deleteId);
            setDeleteId(null);
        }
    };



    if (employees.length === 0) {
        return (
            <div className="table-container p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No employees found</h3>
                <p className="text-muted-foreground mt-1">
                    Try adjusting your search or filter criteria
                </p>
            </div>
        );
    }


    return (
        <>
            <div className="table-container overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Profile</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Date of Birth</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id} className="hover:bg-muted/30 transition-colors">
                                <TableCell className="font-medium text-primary">{employee.id}</TableCell>
                                <TableCell>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={employee.profileImage} alt={employee.fullName} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                            {getInitials(employee.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{employee.fullName}</TableCell>
                                <TableCell>{employee.gender}</TableCell>
                                <TableCell>
                                    {format(new Date(employee.dateOfBirth), 'MMM dd, yyyy')}
                                </TableCell>
                                <TableCell>{employee.state}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Switch
                                            checked={employee.isActive}
                                            onCheckedChange={() => toggleEmployeeStatus(employee.id)}
                                        />
                                        <span className={employee.isActive ? 'badge-active' : 'badge-inactive'}>
                                            {employee.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(employee)}
                                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(employee.id)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onPrint(employee)}
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                        >
                                            <Printer className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the employee
                            record from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default EmployeeTable