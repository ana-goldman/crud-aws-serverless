import Link from 'next/link';

export default async function Section({ name }: { name: string }) {
  return (
    <>
      <div className='flex flex-col items-start mt-10 mb-5 gap-5 md:flex-row md:items-center md:mt-20 md:mb-10'>
        <div className='flex-grow text-left md:px-4 md:py-2 md:m-2'>
          <h5 className='text-gray-900 font-bold text-xl'>{name} List</h5>
        </div>
        <div className='flex-grow text-right md:px-4 md:py-2 md:m-2'>
          <Link href={`/add${name}`}>
            <button className='bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-plus-circle'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <line x1='12' y1='8' x2='12' y2='16'></line>
                <line x1='8' y1='12' x2='16' y2='12'></line>
              </svg>
              <span className='pl-2'>Add {name}</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
