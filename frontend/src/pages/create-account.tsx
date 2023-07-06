import { useState } from 'react';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '@/components/ui/Layout';
import { Data, IUser } from '@/type';
import { CREATE_ACCOUNT } from '@/queries/salesperson';
import { ShowMessage } from '@/components/helpers/ShowMessage';
import { FormCustomerProduct } from '@/components/ui/FormCustomerProduct';
import { InputForm } from '@/components/ui/InputForm';

const CreateAccountPage = () => {

  const [message, setMessage] = useState<string | null>('');
  const router = useRouter();

  // Create Users
  const [createUser] = useMutation<Data>(CREATE_ACCOUNT);

  const formik = useFormik<IUser>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Field name is required'),
      lastName: Yup.string()
        .required('Field last name is required'),
      email: Yup.string()
        .email('Field email is not a valid email')
        .required('Field email is required'),
      password: Yup.string()
        .required('Field password is required')
        .min(6, 'Password must be at least six characters'),
    }),
    onSubmit: async (values) => {

      //const { name, lastName, email, password } = values

      try {
        const { data } = await createUser({
          variables: {
            input: values
          }
        });

        // User create successfully
        setMessage(`User ${data?.createUser.name} has been created`);

        setTimeout(() => {
          setMessage(null)
        }, 3000);

        // Redirecting to user for init session
        router.push('/login')
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
    <>
      <Layout>
        {message && (<ShowMessage message={message} />) }
        <h1 className='text-center text-2xl text-white font-light' >Create Account</h1>

        <div className='flex justify-center mt-5' >
          <div className='w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' >


          <FormCustomerProduct
                  typeForm='Account'
                  handleSubmit={formik.handleSubmit}
                  create
                >

                  <InputForm
                    fieldName='Name'
                    id='name'
                    typeField='text'
                    typeForm='User'
                    value={formik.values.name}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched.name}
                    errors={formik.errors.name}
                  />

                  <InputForm
                    fieldName='Last name'
                    id='lastName'
                    typeField='text'
                    typeForm='User'
                    value={formik.values.lastName}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched.lastName}
                    errors={formik.errors.lastName}
                  />
                  <InputForm
                    fieldName='Email'
                    id='email'
                    typeField='email'
                    typeForm='User'
                    value={formik.values.email}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched.email}
                    errors={formik.errors.email}
                  />

                  <InputForm
                    fieldName='Password'
                    id='password'
                    typeField='password'
                    typeForm='User'
                    value={formik.values.password}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    touched={formik.touched.password}
                    errors={formik.errors.password}
                  />

                </FormCustomerProduct>


{/* 
            <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit} >

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
                  placeholder='User Last Name'
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
                  htmlFor='email'
                >Email
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
                  htmlFor='password'
                >Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  type='password'
                  id='password'
                  placeholder='User password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {
                formik.touched.password && formik.errors.password
                  ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                    <p className='font-bold' >Error</p>
                    <p>{formik.errors.password}</p>
                  </div>)
                  : (null)
              }

              <input
                type='submit'
                className='bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-500 hover:cursor-pointer'
                value='Create Account' />
            </form> */}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CreateAccountPage