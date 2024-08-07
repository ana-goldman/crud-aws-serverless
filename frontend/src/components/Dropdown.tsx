'use client';

import { getAllItems } from '@/api/getAllItems';
import { Department } from '@/types/types';
import { useEffect, useState } from 'react';

type DropdownProps = {
  initialDepartment?: Department | null;
  onDepartmentChange: (department: Department | null) => void;
};

export default function Dropdown({ initialDepartment = null, onDepartmentChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(
    initialDepartment,
  );

  useEffect(() => {
    getAllItems(process.env.NEXT_PUBLIC_API_URL + '/departments')
      .then((data) => {
        setDepartments(data);
      })
      .catch((err) => {
        console.error('Failed to fetch departmens:', err);
      });
  }, []);

  useEffect(() => {
    if (initialDepartment) {
      setSelectedDepartment(initialDepartment);
    }
  }, [initialDepartment]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleDepartmentClick = (department: Department) => {
    setSelectedDepartment(department);
    onDepartmentChange(department);
    closeDropdown();
  };

  return (
    <div className='w-full mb-5'>
      <div className='relative '>
        <button
          type='button'
          className={`flex bg-white items-baseline shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
            isOpen || selectedDepartment?.name ? 'text-gray-600' : 'text-gray-400'
          }`}
          onClick={toggleDropdown}
          aria-haspopup='true'
          aria-expanded={isOpen}
        >
          {selectedDepartment && selectedDepartment.name !== ''
            ? selectedDepartment.name
            : 'Select department'}
          <svg
            className='w-2.5 h-2.5 ml-2.5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        </button>

        {isOpen && (
          <div className='origin-top-right absolute right-0 mt-2 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-full text-gray-600 leading-tight focus:outline-none'>
            <ul role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
              {departments.length > 0 ? (
                departments.map((department: Department) => (
                  <li key={department._id} role='none'>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={() => handleDepartmentClick(department)}
                      role='menuitem'
                    >
                      {department.name}
                    </a>
                  </li>
                ))
              ) : (
                <li role='none'>
                  <span className='block px-4 py-2 text-sm text-gray-700'>
                    No departments exist
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
