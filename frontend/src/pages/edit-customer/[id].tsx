import { useState } from 'react';

import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { Layout } from '@/components/ui/Layout';
import { ICustomer, Data } from '@/type';
import { GET_CUSTOMER_BY_ID, UPDATE_CUSTOMER } from '@/queries';
import { ShowMessage } from '@/components/helpers/ShowMessage';
import { FormCustomerProduct } from '@/components/ui/FormCustomerProduct';
import { InputForm } from '@/components/ui/InputForm';

const EditCustomerPage = () => {

  const { query: { id } } = useRouter();
  const [message, setMessage] = useState<string | null>('');  
  const router = useRouter();

  const { data, loading, error } = useQuery<Data>(GET_CUSTOMER_BY_ID, { variables: { id } });

  const [updateCustomer] = useMutation<Data>(UPDATE_CUSTOMER, {
  
    update(cache, { data }) {

      if (data === null || data === undefined) return;

      // Update customer
      const { getCustomerBySalesperson } = cache.readQuery<Data>({
        query: GET_CUSTOMER_BY_ID
      }) ?? {}

      if (getCustomerBySalesperson === undefined) return;

      const customersUpdated = getCustomerBySalesperson.map((customer) =>
        customer.id === id ? data.updateCustomer : customer
      );

      cache.writeQuery({
        query: GET_CUSTOMER_BY_ID,
        data: {
          getCustomereBySeller: customersUpdated
        }
      });

      // Update current Customer
      cache.writeQuery({
        query: GET_CUSTOMER_BY_ID,
        variables: { id },
        data: {
          getUser: updateCustomer
        }
      });
    }
  });


  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Field name is required'),
    lastName: Yup.string()
      .required('Field last name is required'),
    email: Yup.string()
      .email('Field email is not a valid email')
      .required('Field email is required'),
    company: Yup.string()
      .required('Field company name is required')
  })

  if (loading) return 'Loading...';

  if (data === null || data === undefined) return;

  const onSubmit = async (values: ICustomer) => {

    const { name, email, lastName, phone, company } = values

    try {
      const { data } = await updateCustomer({
        variables: {
          id,
          input: {
            name,
            email,
            lastName,
            phone,
            company
          }
        }
      });

      Swal.fire(
        'Update!',
        'Customer has been modified',
        'success'
      );
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

  return (
    <Layout title='Edit Customer' >
      {message && (<ShowMessage message={message} />) }

      <div className='flex justify-center mt-5' >
        <div className='w-full max-w-lg'>

          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={data.getCustomer}
            onSubmit={onSubmit}
          >

            {
              props => {

                return (

                  <FormCustomerProduct
                  typeForm='Customer'
                  handleSubmit={props.handleSubmit}
                  create={false}
                >

                  <InputForm
                    fieldName='Name'
                    id='name'
                    typeField='text'
                    typeForm='Customer'
                    value={props.values.name}
                    handleBlur={props.handleBlur}
                    handleChange={props.handleChange}
                    touched={props.touched.name}
                    errors={props.errors.name}
                  />

                  <InputForm
                    fieldName='User Last Name'
                    id='lastName'
                    typeField='text'
                    typeForm='Customer'
                    value={props.values.lastName}
                    handleBlur={props.handleBlur}
                    handleChange={props.handleChange}
                    touched={props.touched.lastName}
                    errors={props.errors.lastName}
                  />

                  <InputForm
                    fieldName='Company'
                    id='company'
                    typeField='text'
                    typeForm='Customer'
                    value={props.values.company}
                    handleBlur={props.handleBlur}
                    handleChange={props.handleChange}
                    touched={props.touched.company}
                    errors={props.errors.company}
                  />
                  <InputForm
                    fieldName='User Email'
                    id='email'
                    typeField='email'
                    typeForm='Customer'
                    value={props.values.email}
                    handleBlur={props.handleBlur}
                    handleChange={props.handleChange}
                    touched={props.touched.email}
                    errors={props.errors.email}
                  />

                  <InputForm
                    fieldName='Phone'
                    id='phone'
                    typeField='tel'
                    typeForm='Customer'
                    value={props.values.phone}
                    handleBlur={props.handleBlur}
                    handleChange={props.handleChange}
                    touched={props.touched.phone}
                    errors={props.errors.phone}
                  />

                </FormCustomerProduct>

                  // <form onSubmit={props.handleSubmit} >
                  //   <div className='mb-4'>
                  //     <label
                  //       className='block text-gray-700 text-sm font-bold mb-2'
                  //       htmlFor='name'
                  //     >Name
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='text'
                  //       id='name'
                  //       placeholder='User Name'
                  //       value={props.values.name}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>
                  //   {
                  //     props.touched.name && props.errors.name
                  //       ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  //         <p className='font-bold' >Error</p>
                  //         <p>{props.errors.name as string}</p>
                  //       </div>)
                  //       : (null)
                  //   }


                  //   <div className='mb-4'>
                  //     <label
                  //       className='block text-gray-700 text-sm font-bold mb-2'
                  //       htmlFor='lastName'
                  //     >Last Name
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='text'
                  //       id='lastName'
                  //       placeholder='User LastName'
                  //       value={props.values.lastName}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>
                  //   {
                  //     props.touched.lastName && props.errors.lastName
                  //       ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  //         <p className='font-bold' >Error</p>
                  //         <p>{props.errors.lastName as string}</p>
                  //       </div>)
                  //       : (null)
                  //   }
                  //   <div className='mb-4'>
                  //     <label
                  //       className='block text-gray-700 text-sm font-bold mb-2'
                  //       htmlFor='company'
                  //     >Company
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='text'
                  //       id='company'
                  //       placeholder='User Company'
                  //       value={props.values.company}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>

                  //   {
                  //     props.touched.company && props.errors.company
                  //       ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  //         <p className='font-bold' >Error</p>
                  //         <p>{props.errors.company as string}</p>
                  //       </div>)
                  //       : (null)
                  //   }

                  //   <div className='mb-4'>
                  //     <label
                  //       className='block text-gray-700 text-sm font-bold mb-2'
                  //       htmlFor='email'
                  //     >Email Customer
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='email'
                  //       id='email'
                  //       placeholder='User email'
                  //       value={props.values.email}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>

                  //   {
                  //     props.touched.email && props.errors.email
                  //       ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  //         <p className='font-bold' >Error</p>
                  //         <p>{props.errors.email as string}</p>
                  //       </div>)
                  //       : (null)
                  //   }

                  //   <div className='mb-4'>
                  //     <label
                  //       className='block text-gray-700 text-sm font-bold mb-2'
                  //       htmlFor='phone'
                  //     >Phone
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='tel'
                  //       id='phone'
                  //       placeholder='User Phone'
                  //       value={props.values.phone}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>

                  //   <input
                  //     type='submit'
                  //     className='bg-gray-600 w-full mt-5 p-2 text-white hover:bg-gray-800 hover:cursor-pointer uppercase'
                  //     value='edit customer'
                  //   />
                  // </form>
                )

              }
            }



          </Formik>
        </div>
      </div>

    </Layout>
  )
}

export default EditCustomerPage
