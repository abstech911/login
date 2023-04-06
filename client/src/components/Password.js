import React from 'react'
import {useFormik} from "formik";
import {passwordValidate} from "../helper/validate";
import {Toaster} from "react-hot-toast";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import {Link} from "react-router-dom";

const Password = () => {


    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: passwordValidate,
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

                <div className={styles.glass}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Hello Again</h4>
                        <span className='py-4 text-xl w-2/3 text-gray-500 text-center'>
                            Explore more by connecting with us
                        </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img className={styles.profile_img} alt='avatar' src={avatar}/>
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('password')} type='password' className={styles.textbox}
                                   placeholder='Password'/>
                            <button className={styles.btn}>Sign in</button>

                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'>
                                Forgot password?
                                <Link className='text-red-500' to='/reset'> Recover Now</Link>
                            </span>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}
export default Password
