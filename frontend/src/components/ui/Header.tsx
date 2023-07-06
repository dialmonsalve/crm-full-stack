import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import client from '@/config/apollo';

import { Data } from '@/type';
import { GET_USER } from '@/queries/salesperson';

export const Header = () => {

  const router = useRouter()

  const { data, loading } = useQuery<Data>(GET_USER);

  if (loading) return null;

  if (!data) {
    router.push('/login')
    return;
  };

  if(data.getUser === undefined)return;

  const { name, lastName} = data.getUser

  const closeSession = () => {
    localStorage.removeItem('token');
    client.clearStore();
    router.push('/login')
  }

  return (
    <div className='sm:flex justify-between my-3' >
      <p className='mr-2 text-gray-800 mb-5 lg:mb-0'>Hello {name} {lastName}</p>

      <button
        className='bg-red-500 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md hover:bg-red-600'
        onClick={() => closeSession()}
      >
        Close Session
      </button>
    </div>
  )
}
