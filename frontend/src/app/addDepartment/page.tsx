'use client';

import Link from 'next/link';
import { addItem } from '@/api/addItem';
import { useState } from 'react';

export default function AddDepartmentPage() {
  const [name, setName] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const url: string = process.env.NEXT_PUBLIC_API_URL + '/departments';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    successMessage && setSuccessMessage('');
    error && setError('');

    try {
      const { message } = await addItem(url, name);
      setSuccessMessage(message);
      setName('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <form className='w-full min-h-screen max-w-sm container mt-20 mx-auto' onSubmit={onSubmit}>
      <div className='w-full mb-5'>
        <label
          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          htmlFor='name'
        >
          Department name
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Enter department name'
        />
      </div>
      {successMessage && <p className='text-sm text-green-500'>{successMessage}</p>}
      {error && <p className='text-sm text-red-500'>{error}</p>}
      <div className='flex items-center justify-between'>
        <button className='mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Save
        </button>
      </div>
      <div className='text-center mt-4 text-gray-500'>
        <Link href='/'>Back</Link>
      </div>
    </form>
  );
}
