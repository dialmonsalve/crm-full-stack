import { useState } from 'react';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '@/components/ui/Layout';
import { UserAuth } from '@/type';
import { USER_AUTH } from '@/queries/salesperson';
import { FormCustomerProduct } from '@/components/ui/FormCustomerProduct';
import { InputForm } from '@/components/ui/InputForm';

const LoginPage = () => {

  const [message, setMessage] = useState<string | null>('');
  const router = useRouter()

  const [authUser] = useMutation(USER_AUTH);

  const formik = useFormik<UserAuth>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Field email is not a valid email')
        .required('Field email is required'),
      password: Yup.string()
        .required('Field password is required')
    }),
    onSubmit: async (values) => {
      const { email, password, } = values

      try {
        const { data } = await authUser({
          variables: {
            input: { email, password }
          }
        });

        // Validating user
        setMessage(`Authenticating...`);

        setTimeout(() => {
          const { token } = data.authUser;
          localStorage.setItem('token', token)
        }, 1000);


        // Redirecting user to the customers page 
        setTimeout(() => {
          setMessage(null)
          router.push('/')
        }, 2000);


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

  const showMessage = () => {
    return (
      <div className='bg-red-600 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto' >
        {message}
      </div>
    )
  }

  return (
    <>
      <Layout>
        {message && showMessage()}

        <h1 className='text-center text-2xl text-white font-light' >Login</h1>

        <div className='flex justify-center mt-5' >
          <div className='w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' >

          <FormCustomerProduct
                  typeForm='User'
                  handleSubmit={formik.handleSubmit}
                  create='Login'
                >

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

            {/* <form onSubmit={formik.handleSubmit}
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' >
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
                value='SignIn'
              />


            </form> */}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default LoginPage