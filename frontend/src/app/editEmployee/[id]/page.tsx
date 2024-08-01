'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Employee } from '@/types/types';
import { editItem } from '@/api/editItem';
import Form from '@/components/Form';
import { getItemById } from '@/api/getItemById';

export default function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    id &&
      getItemById(url, id).then((data) => {
        setEmployee(data);
      });
  }, [id, url]);

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
      const { message } = await editItem(
        url,
        id,
        employee.name,
        employee.surname,
        employee.department.name,
      );
      setSuccessMessage(message);
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
