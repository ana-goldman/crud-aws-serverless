import { Employee } from '@/types/types';
import Link from 'next/link';

type FormProps = {
  employee: Employee;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  successMessage: string;
  error: string;
};

export default function Form({
  employee,
  onSubmit,
  handleChange,
  successMessage,
  error,
}: FormProps) {
  return (
    <form className='w-full min-h-screen max-w-sm container mt-20 mx-auto' onSubmit={onSubmit}>
      <div className='w-full mb-5'>
        <label
          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          htmlFor='name'
        >
          Name of employee
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
          name='name'
          value={employee.name}
          onChange={handleChange}
          type='text'
          placeholder='Enter name'
        />
      </div>
      <div className='w-full mb-5'>
        <label
          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          htmlFor='surname'
        >
          Surname
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline'
          name='surname'
          value={employee.surname}
          onChange={handleChange}
          type='text'
          placeholder='Enter surname'
        />
      </div>
      <div className='w-full mb-5'>
        <label
          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          htmlFor='department'
        >
          Department
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600'
          name='department'
          value={employee.department.name}
          onChange={handleChange}
          type='text'
          placeholder='Enter department'
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
