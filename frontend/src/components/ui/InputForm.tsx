
import { FormikErrors, FormikTouched } from 'formik';
import { IProduct } from '@/type';

type TypeField = | 'text' | 'number' | 'tel' | 'email' | 'password'

interface Props {
  value: string | number | undefined
  fieldName: string
  typeField: TypeField
  touched: undefined | boolean
  id: string
  errors: undefined | string
  typeForm:string
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  }
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent) => void;
  }
}
export const InputForm = ({ fieldName, value, id,  errors, typeField, touched, typeForm, handleBlur, handleChange }: Props) => {

  return (

    <>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor={id}
        >{fieldName}
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-green-700'
          type={typeField}
          id={id}
          placeholder={`${typeForm} ${fieldName}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {
        touched &&  errors 
          ? (<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4' >
            <p className='font-bold' >Error</p>
            <p>{errors}</p>
          </div>)
          : (null)
      }
    </>
  )
}
