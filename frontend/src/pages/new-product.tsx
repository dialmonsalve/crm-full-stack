import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '@/components/ui';
import { Data, IProduct } from '@/type';
import { CREATE_PRODUCT, GET_PRODUCTS } from '@/queries/product';
import { ShowMessage } from '@/components/helpers/ShowMessage';
import { FormCustomerProduct } from '@/components/ui/FormCustomerProduct';
import { InputForm } from '@/components/ui/InputForm';


const NewProductPage = () => {

  const [message, setMessage] = useState<string | null>('');
  const router = useRouter();

  const [createProduct] = useMutation<Data>(CREATE_PRODUCT, {
    update(cache, { data }) {

      const { getProducts } = cache.readQuery<Data>({
        query: GET_PRODUCTS
      }) ?? {}
      if (!getProducts) return;
      if (!data) return;

      cache.evict({ broadcast: false });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, data.createProduct]
        }
      })
    }
  });

  const formik = useFormik<IProduct>({
    initialValues: {
      name: '',
      price: 0,
      stock: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Field name is required'),
      price: Yup.number()
        .positive('Invalid field price')
        .required('Field price is required')
        .integer('Only entire numbers'),
      stock: Yup.number()
        .positive('Invalid field stock')
        .required('Field stock is required')
        .integer('Only entire numbers'),
    }),
    onSubmit: async (values) => {

      try {
        await createProduct({
          variables: {
            input: values
          }
        });

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

  });

  return (
    <Layout title='New Product'>

      {message && (<ShowMessage message={message} />)}
      <div className='flex justify-center mt-5' >
        <div className='w-full max-w-lg'>

          <FormCustomerProduct
            typeForm='Product'
            handleSubmit={formik.handleSubmit}
          >

            <InputForm
              fieldName='Name'
              typeForm='Product'
              id='name'
              typeField='text'
              value={formik.values.name}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.name}
              errors={formik.errors.name}
            />

            <InputForm
              fieldName='Price'
              id='price'
              typeField='number'
              typeForm='Product'
              value={formik.values.price}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.price}
              errors={formik.errors.price}
            />

            <InputForm
              fieldName='Stock'
              typeForm='Product'
              id='stock'
              typeField='number'
              value={formik.values.stock}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              touched={formik.touched.stock}
              errors={formik.errors.stock}
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
                placeholder='Product Name'
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
                htmlFor='price'
              >Price
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='number'
                id='price'
                placeholder='Price'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.price && formik.errors.price
                ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  <p className='font-bold' >Error</p>
                  <p>{formik.errors.price}</p>
                </div>)
                : (null)
            }
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='stock'
              >Stock
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
                type='number'
                id='stock'
                placeholder='Stock'
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {
              formik.touched.stock && formik.errors.stock
                ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
                  <p className='font-bold' >Error</p>
                  <p>{formik.errors.stock}</p>
                </div>)
                : (null)
            }
            <input
              type='submit'
              className='bg-gray-600 w-full mt-5 p-2 text-white hover:bg-gray-800 hover:cursor-pointer uppercase'
              value='create Product'
            />
          </form> */}

        </div>
      </div>
    </Layout>
  )
}

export default NewProductPage;