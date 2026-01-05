import { useEmployees } from '@/contexts/EmployeeContext';
import { Employee, EmployeeFormData } from '@/types/employee';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, User } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { indianStates } from '@/data/states';
import { getInitials } from '@/lib/utils';


interface EmployeeFormProps {
    open: boolean;
    onClose: () => void;
    employee?: Employee | null;
}

const initialFormData: EmployeeFormData = {
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    profileImage: '',
    state: '',
    isActive: true,
};




function EmployeeForm({ open, onClose, employee }: EmployeeFormProps) {
    const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addEmployee, updateEmployee } = useEmployees();

    const isEditing = !!employee;

    useEffect(() => {
        if (employee) {
            setFormData({
                fullName: employee.fullName,
                gender: employee.gender,
                dateOfBirth: employee.dateOfBirth,
                profileImage: employee.profileImage,
                state: employee.state,
                isActive: employee.isActive,
            });
            setImagePreview(employee.profileImage);
        } else {
            setFormData(initialFormData);
            setImagePreview('');
        }
        setErrors({});
    }, [employee, open]);




    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.warning(
                    'File too large',
                    {
                        description: 'Please select an image under 5MB',
                    });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setFormData(prev => ({ ...prev, profileImage: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else {
            const dob = new Date(formData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 18) {
                newErrors.dateOfBirth = 'Employee must be at least 18 years old';
            }
            if (dob > today) {
                newErrors.dateOfBirth = 'Date of birth cannot be in the future';
            }
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (isEditing && employee) {
            updateEmployee(employee.id, formData);
            toast.success(
                'Employee Updated',
                {
                    description: `${formData.fullName}'s record has been updated.`,
                });
        } else {
            addEmployee(formData);
            toast.success(
                'Employee Added',
                {
                    description: `${formData.fullName} has been added to the system.`,
                });
        }

        setIsSubmitting(false);
        onClose();
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the employee information below.'
                            : 'Fill in the details to add a new employee.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                                <AvatarImage src={imagePreview} alt="Preview" />
                                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                    {formData.fullName ? getInitials(formData.fullName) : <User className="w-8 h-8" />}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <p className="text-xs text-muted-foreground">Click to upload a profile photo</p>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Enter full name"
                            className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                            <p className="text-xs text-destructive">{errors.fullName}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <Label>Gender *</Label>
                        <Select
                            value={formData.gender}
                            onValueChange={(value: 'Male' | 'Female' | 'Other') =>
                                setFormData(prev => ({ ...prev, gender: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className={errors.dateOfBirth ? 'border-destructive' : ''}
                        />
                        {errors.dateOfBirth && (
                            <p className="text-xs text-destructive">{errors.dateOfBirth}</p>
                        )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                        <Label>State *</Label>
                        <Select
                            value={formData.state}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                        >
                            <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent className="max-h-50">
                                {indianStates.map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.state && (
                            <p className="text-xs text-destructive">{errors.state}</p>
                        )}
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                            <Label htmlFor="isActive" className="text-sm font-medium">
                                Active Status
                            </Label>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Set whether this employee is currently active
                            </p>
                        </div>
                        <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) =>
                                setFormData(prev => ({ ...prev, isActive: checked }))
                            }
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 btn-gradient" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : isEditing ? (
                                'Update Employee'
                            ) : (
                                'Add Employee'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );


}

export default EmployeeForm