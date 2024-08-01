import DepartmentList from '@/components/DepartmentList';
import EmployeeList from '@/components/EmployeeList';
import Section from '@/components/Section';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='container mx-auto'>
        <h3 className='text-center mt-10 leading-8 text-black font-bold tracking-wide uppercase text-lg'>
          CRUD App with Next.js, Express and MongoDB
        </h3>
        <Section name={'Department'} />
        <DepartmentList />
        <Section name={'Employee'} />
        <EmployeeList />
      </div>
    </main>
  );
}
