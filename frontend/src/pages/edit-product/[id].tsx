import { useState } from 'react';

import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import { Layout } from '@/components/ui/Layout';
import { IProduct, Data } from '@/type';
import { GET_PRODUCT_BY_ID, UPDATE_PRODUCT } from '@/queries/product';
import { ShowMessage } from '@/components/helpers/ShowMessage';
import { FormCustomerProduct } from '@/components/ui/FormCustomerProduct';
import { InputForm } from '@/components/ui/InputForm';

const EditProductPage = () => {

  const { query: { id } } = useRouter();
  const [message, setMessage] = useState<string | null>('');
  const router = useRouter();

  const { data, loading, error } = useQuery<Data>(GET_PRODUCT_BY_ID, { variables: { id } });

  const [updateProduct] = useMutation<Data>(UPDATE_PRODUCT)

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Field name is required'),
    price: Yup.number()
      .positive('Invalid field price')
      .required('Field price is required'),
    stock: Yup.number()
      .positive('Invalid field stock')
      .required('Field stock is required')
      .integer('Only entire numbers'),
  });

  if (loading) return 'Loading...';
  if (!data) return 'Something wrong';


  const onSubmit = async (values: IProduct) => {

    const { name, price, stock } = values

    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            stock: Number(stock),
            price: Number(price),
          }
        }
      });

      Swal.fire(
        'Update!',
        'Product has been modified',
        'success'
      );
      // Redirecting user to the customers page 
      router.push('/products')

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
    <Layout title='Edit Product' >
      {message && (<ShowMessage message={message} />)}

      <div className='flex justify-center mt-5' >
        <div className='w-full max-w-lg'>

          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={data.getProduct}
            onSubmit={onSubmit}
          >
            {
              props => {

                return (

                  <FormCustomerProduct
                    typeForm='Product'
                    handleSubmit={props.handleSubmit}
                  >

                    <InputForm
                      fieldName='Name'
                      id='name'
                      typeField='text'
                      typeForm='Product'
                      value={props.values.name}
                      handleBlur={props.handleBlur}
                      handleChange={props.handleChange}
                      touched={props.touched.name}
                      errors={props.errors.name}
                    />

                    <InputForm
                      fieldName='Price'
                      id='price'
                      typeField='number'
                      typeForm='Product'
                      value={props.values.price}
                      handleBlur={props.handleBlur}
                      handleChange={props.handleChange}
                      touched={props.touched.price}
                      errors={props.errors.price}
                    />

                    <InputForm
                      fieldName='Stock'
                      id='stock'
                      typeField='number'
                      typeForm='Product'
                      value={props.values.stock}
                      handleBlur={props.handleBlur}
                      handleChange={props.handleChange}
                      touched={props.touched.stock}
                      errors={props.errors.stock}
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
                  //       htmlFor='price'
                  //     >Price
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='number'
                  //       id='price'
                  //       placeholder='Price'
                  //       value={props.values.price}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>
                  //   {
                  //     props.touched.price && props.errors.price
                  //       ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  //         <p className='font-bold' >Error</p>
                  //         <p>{props.errors.price as string}</p>
                  //       </div>)
                  //       : (null)
                  //   }
                  //   <div className='mb-4'>
                  //     <label
                  //       className='block text-gray-700 text-sm font-bold mb-2'
                  //       htmlFor='stock'
                  //     >Stock
                  //     </label>
                  //     <input
                  //       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                  //       type='number'
                  //       id='stock'
                  //       placeholder='User stock'
                  //       value={props.values.stock}
                  //       onChange={props.handleChange}
                  //       onBlur={props.handleBlur}
                  //     />
                  //   </div>

                  //   {
                  //     props.touched.stock && props.errors.stock
                  //       ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  //         <p className='font-bold' >Error</p>
                  //         <p>{props.errors.stock as string}</p>
                  //       </div>)
                  //       : (null)
                  //   }
                  //   <input
                  //     type='submit'
                  //     className='bg-gray-600 w-full mt-5 p-2 text-white hover:bg-gray-800 hover:cursor-pointer uppercase'
                  //     value='edit Product'
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

export default EditProductPage