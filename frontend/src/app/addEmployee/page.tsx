'use client';

import { addItem } from '@/api/addItem';
import Form from '@/components/Form';
import { Employee } from '@/types/types';
import { useState } from 'react';

export default function AddEmployeePage() {
  const [employee, setEmployee] = useState<Employee>({
    _id: '',
    name: '',
    surname: '',
    department: {
      _id: '',
      name: '',
    },
  });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const url: string = process.env.NEXT_PUBLIC_API_URL + '/employees';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: name === 'department' ? { ...prevEmployee.department, name: value } : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    successMessage && setSuccessMessage('');
    error && setError('');

    try {
      const { message } = await addItem(
        url,
        employee.name,
        employee.surname,
        employee.department.name,
      );
      setSuccessMessage(message);
      setEmployee({
        _id: '',
        name: '',
        surname: '',
        department: {
          _id: '',
          name: '',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <Form
      employee={employee}
      onSubmit={onSubmit}
      handleChange={handleChange}
      successMessage={successMessage}
      error={error}
    />
  );
}
