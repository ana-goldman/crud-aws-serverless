import DepartmentList from '@/components/DepartmentList';
import EmployeeList from '@/components/EmployeeList';
import Section from '@/components/Section';

export default async function Home() {
  return (
    <>
      <h3 className='text-center mt-10 leading-8 text-black font-bold tracking-wide uppercase text-lg'>
        CRUD App made with Next.js, Node.js, Express, MongoDB and Docker.
        <br />
        Hosted with Serverless and AWS ECS
      </h3>
      <Section name={'Department'} />
      <DepartmentList />
      <Section name={'Employee'} />
      <EmployeeList />
    </>
  );
}
