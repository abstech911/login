import React, {useState} from 'react'
import {useFormik} from "formik";
import {Toaster} from "react-hot-toast";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import {Link} from "react-router-dom";
import {passwordValidate, validateRegister} from "../helper/validate";
import {convertToBase64} from "../helper/convert";

const Register = () => {

    const [file, setFile]  = useState('')

    const formik = useFormik({
        initialValues: {
            email: 'demo@g.com',
            username: 'demo',
            password: 'admin@1234',
        },
        validate: validateRegister,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values,{profile:file || ''})
            console.log(values)
        }

    });

    /*Formik does not support file upload */

    const onUpload = async e =>{
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64);
    }


    return (
        <div className='container mx-auto'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>

                <div className={styles.glass} style={{width:"45%", paddingTop:'3em'}}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Register</h4>
                        <span className='py-4 text-xl w-2/3 text-gray-500 text-center'>
                            Happy to join you!
                        </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <label htmlFor='profile'>
                                <img className={styles.profile_img} alt='avatar' src={file || avatar}/>
                            </label>
                            <input onChange={onUpload} type='file' id='profile' name='profile'/>
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('email')} type='email' className={styles.textbox} placeholder='Email'/>
                            <input {...formik.getFieldProps('username')} type='text' className={styles.textbox} placeholder='Username'/>
                            <input {...formik.getFieldProps('password')} type='password' className={styles.textbox} placeholder='Password'/>
                            <button className={styles.btn}>Register</button>

                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'>
                                Already Registered?{"  "}
                                <Link className='text-red-500' to='/login'> Login Now</Link>
                            </span>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}
export default Register
