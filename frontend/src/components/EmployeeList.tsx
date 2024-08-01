'use client';

import { Employee } from '@/types/types';
import { useEffect, useState } from 'react';
import EmployeeItem from './EmployeeItem';
import { getAllItems } from '@/api/getAllItems';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllItems(process.env.NEXT_PUBLIC_API_URL + '/employees')
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch employees');
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {employees.map((employee: Employee) => (
        <EmployeeItem
          employee={employee}
          key={employee._id}
          onDelete={() => setRefresh((prev) => !prev)}
        />
      ))}
    </ul>
  );
}
