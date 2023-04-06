import toast from "react-hot-toast";

/**validate login page username */
export const usernameValidate = async (values) => {
    return usernameVerify({}, values);
}

/** Validate Password */
export const passwordValidate = async (values) => {
    return passwordVerify({}, values)
}

export const resetPasswordValidation = async (values) => {
    const errors = passwordVerify({}, values);
    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error('Password do not match.....!')
    }
    return errors;
}

export const validateRegister = async (values) => {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    verifyEmail(errors, values)
    return errors;

}

/** Validate profile form */
export const profileValidation = async(values)=>{
    const errors = verifyEmail({}, values);
    passwordVerify(errors,values);
    return errors;
}

/*****************************************************************************/


/*Verify Email*/

const verifyEmail = (errors = {}, values) => {
    if (!values.email) {
        errors.email = toast.error("Email Required")
    } else if (values.email.includes(' ')) {
        errors.email = toast.error("Invalid Email")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error('Invalid Email Address')
    }
    return errors;
}

/*Verify Password*/

const passwordVerify = (errors = {}, values) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        errors.password = toast.error('Password Required')
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('Invalid Password No Whitespace')
    } else if (values.password.length < 4) {
        errors.password = toast.error('Password must be more 4 characters')
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password must have special characters')
    }
    return errors;
}

/** Validate Username*/
function usernameVerify(errors = {}, values) {
    if (!values.username) {
        errors.username = toast.error('Username Required')
    } else if (values.username.includes(' ')) {
        errors.username = toast.error('Invalid Username')
    }
    return errors;
}