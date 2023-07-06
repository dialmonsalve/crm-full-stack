import { ReactNode } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from './Header';
import { Navbar } from './Navbar';

interface Props {
  children: ReactNode;
  title?: string
}

export const Layout = ({ children, title }: Props) => {

  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>CRM Administración de clientes</title>
      </Head>
      {
        pathname === '/login' || pathname === '/create-account'

          ? (<div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
            <div>
              {children}
            </div>
          </div>)

          : (
            <div className='bg-gray-200 min-h-screen' >
              <div className='sm:flex min-h-screen'>
                <Navbar />
                <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                  <h1 className='text-2xl text-gray-800 font-light' >{title}</h1>
                  <Header></Header>
                  {children}
                </main>
              </div>
            </div>
          )
      }
    </>
  )
}
