'use client';

import { Department } from '@/types/types';
import { useEffect, useState } from 'react';
import DepartmentItem from './DepartmentItem';
import { getAllItems } from '@/api/getAllItems';

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllItems(process.env.NEXT_PUBLIC_API_URL + '/departments')
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch employees');
        setLoading(false);
      });
  }, [refresh]);

  const selectDepartment = (department: Department) => {
    if (department._id === activeDepartment?._id) {
      setActiveDepartment(null);
    } else {
      setActiveDepartment(department);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {departments.map((department: Department) => (
        <DepartmentItem
          department={department}
          activeDepartment={activeDepartment}
          key={department._id}
          selectDepartment={() => selectDepartment(department)}
          onDelete={() => setRefresh((prev) => !prev)}
        />
      ))}
    </ul>
  );
}
