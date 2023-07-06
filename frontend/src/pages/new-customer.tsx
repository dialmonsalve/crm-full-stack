import { useState } from 'react';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '@/components/ui/Layout'
import { Data, ICustomer } from '@/type';
import { CREATE_CUSTOMER, GET_COSTUMERS_BY_SALESPERSON } from '@/queries';
import { ShowMessage } from '@/components/helpers/ShowMessage';
import { FormCustomerProduct } from '@/components/ui/FormCustomerProduct';
import { InputForm } from '@/components/ui/InputForm';

const NewCustomerPage = () => {

  const [message, setMessage] = useState<string | null>('');
  const router = useRouter();

  const [createCustomer] = useMutation<Data>(CREATE_CUSTOMER, {
    update(cache, { data }) {
      // Get cache object that we need

      const { getCustomerBySalesperson } = cache.readQuery<Data>({ query: GET_COSTUMERS_BY_SALESPERSON }) ?? {}

      if (getCustomerBySalesperson === undefined) return;
      if (!data) return;

      cache.evict({ broadcast: false });
      // Rewrite cache
      cache.writeQuery({
        query: GET_COSTUMERS_BY_SALESPERSON,
        data: {
          getCustomerBySalesperson: [...getCustomerBySalesperson, data.createCustomer]
        }
      })
    }
  });

  const formik = useFormik<ICustomer>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Field name is required'),
      lastName: Yup.string()
        .required('Field last name is required'),
      email: Yup.string()
        .email('Field email is not a valid email')
        .required('Field email is required'),
      company: Yup.string()
        .required('Field company name is required')
    }),
    onSubmit: async (values) => {

      try {
        await createCustomer({
          variables: {
            input: values
          }
        });

        // Redirecting user to the customers page 
        router.push('/')

      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        }

        setTimeout(() => {
          setMessage(null)
        }, 3000);

      }
    }

  });

  return (

    <Layout title='New customer'>

      {message && (<ShowMessage message={message} />)}
      <div className='flex justify-center mt-5' >
        <div className='w-full max-w-lg'>

          <FormCustomerProduct
            typeForm='Customer'
            handleSubmit={formik.handleSubmit}
          >

            <InputForm
              fieldName='Name'
              id='name'
              typeField='text'
              typeForm='Customer'
              value={formik.values.name}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.name}
              errors={formik.errors.name}
            />

            <InputForm
              fieldName='User Last Name'
              id='lastName'
              typeField='text'
              typeForm='Customer'
              value={formik.values.lastName}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.lastName}
              errors={formik.errors.lastName}
            />

            <InputForm
              fieldName='Company'
              id='company'
              typeField='text'
              typeForm='Customer'
              value={formik.values.company}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.company}
              errors={formik.errors.company}
            />
            <InputForm
              fieldName='User Email'
              id='email'
              typeField='email'
              typeForm='Customer'
              value={formik.values.email}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />

            <InputForm
              fieldName='Phone'
              id='phone'
              typeField='tel'
              typeForm='Customer'
              value={formik.values.phone}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.phone}
              errors={formik.errors.phone}
            />

          </FormCustomerProduct>

          {/* <form onSubmit={formik.handleSubmit} >
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='text'
                id='name'
                placeholder='User Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.name && formik.errors.name
                ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  <p className='font-bold' >Error</p>
                  <p>{formik.errors.name}</p>
                </div>)
                : (null)
            }


            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='lastName'
              >Last Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='text'
                id='lastName'
                placeholder='User LastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.lastName && formik.errors.lastName
                ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  <p className='font-bold' >Error</p>
                  <p>{formik.errors.lastName}</p>
                </div>)
                : (null)
            }
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='company'
              >Company
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='text'
                id='company'
                placeholder='User Company'
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {
              formik.touched.company && formik.errors.company
                ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  <p className='font-bold' >Error</p>
                  <p>{formik.errors.company}</p>
                </div>)
                : (null)
            }

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >Email Customer
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='email'
                id='email'
                placeholder='User email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {
              formik.touched.email && formik.errors.email
                ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  <p className='font-bold' >Error</p>
                  <p>{formik.errors.email}</p>
                </div>)
                : (null)
            }

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='phone'
              >Phone
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='tel'
                id='phone'
                placeholder='User Phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <input
              type='submit'
              className='bg-gray-600 w-full mt-5 p-2 text-white hover:bg-gray-800 hover:cursor-pointer uppercase'
              value='create customer'
            />
          </form> */}

        </div>
      </div>
    </Layout>
  )
}

export default NewCustomerPage;