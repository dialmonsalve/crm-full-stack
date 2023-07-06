import NextLink from 'next/link';
import { useRouter } from 'next/router';


export const Navbar = () => {

  const { pathname } = useRouter();

  const itemsNavigate = [
    {
      href: '/',
      title: 'Customers',
      activeList: pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'
    },
    {
      href: '/orders',
      title: 'Orders',
      activeList: pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'
    },
    {
      href: '/products',
      title: 'Products',
      activeList: pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'
    },
  ]
  const itemsAdminNavigate = [
    {
      href: '/better-salespersons',
      title: 'Better salespersons',
      activeList: pathname === '/better-salespersons' ? 'bg-blue-800 p-2' : 'p-2'
    },
    {
      href: '/better-customers',
      title: 'Better customers',
      activeList: pathname === '/better-customers' ? 'bg-blue-800 p-2' : 'p-2'
    },
  ]

  return (

    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5" >
      <div>
        <p className="text-white text-2xl font-black" >CRM Customers</p>
      </div>

      <nav className='mt-3 list-none'>
        {
          itemsNavigate.map((item, idx) => (
            <li key={idx} className={item.activeList}>
              <NextLink href={item.href} passHref legacyBehavior>
                <a className='text-white block' >
                  {item.title}
                </a>
              </NextLink>
            </li>
          ))
        }
      </nav>

      <div className='sm:mt-10'>
        <p className="text-white text-2xl font-black" >Options</p>
      </div>

      <nav className='mt-3 list-none'>
        {
          itemsAdminNavigate.map((item, idx) => (
            <li key={idx} className={item.activeList}>
              <NextLink href={item.href} passHref legacyBehavior>
                <a className='text-white block' >
                  {item.title}
                </a>
              </NextLink>
            </li>
          ))
        }
      </nav>
    </aside>

  )
}
