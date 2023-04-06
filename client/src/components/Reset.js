import React from 'react'
import {useFormik} from "formik";
import {resetPasswordValidation} from "../helper/validate";
import {Toaster} from "react-hot-toast";
import styles from "../styles/Username.module.css";

const Reset = () => {


    const formik = useFormik({
        initialValues: {
            password: 'admin@123',
            confirm_pwd: 'admin@123',
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values)
        }
    });


    return (
        <div className='container mx-auto'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>

                <div className={styles.glass} style={{width:'50%'}}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Reset</h4>
                        <span className='py-4 text-xl w-2/3 text-gray-500 text-center'>
                            Enter new Password
                        </span>
                    </div>

                    <form className='py-20' onSubmit={formik.handleSubmit}>

                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('password')} type='password' className={styles.textbox}
                                   placeholder='Password'/>
                            <input {...formik.getFieldProps('confirm_pwd')} type='password' className={styles.textbox}
                                   placeholder='Confirm Password'/>
                            <button className={styles.btn}>Reset</button>

                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}
export default Reset
