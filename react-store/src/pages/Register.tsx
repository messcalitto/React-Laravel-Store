import React, { useState, useActionState } from 'react';
import { Link } from 'react-router-dom';
import { axRegister } from '../components/AxiosFunctions.tsx';
import { PulseLoader } from 'react-spinners';


const Register = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const [success, formAction, isPending] = useActionState(async (_, formData: FormData): Promise<boolean|string> => {
        
        setErrorMsg('')
        
        return await axRegister(user)
            .then(res => {
                if (res) {
                    return "You have successfully registered!";
                }
                return false;
            })
            .catch(err => {
                setErrorMsg(err)
                return false;
            })
    }, '');

    
    return (
    <div className="my-5 flex flex-col sm:justify-center items-center sm:pt-0">
    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border overflow-hidden sm:rounded-lg">
    <label className="custom-modal text-gray-500 fs-5 fw-bold">Register</label>

    {success?  <SuccessMessage message={success} /> :

        <form action={formAction}>
        
        {errorMsg && <div className="alert alert-danger mt-1">{errorMsg}</div>}
        
        <RegisterField title="Name" name="name" value={user?.name} onChange={handleChange} />
        <RegisterField title="Email" name="email" type="email" value={user?.email} onChange={handleChange} />
        <RegisterField title="Password" name="password" type="password" value={user?.password} onChange={handleChange} />
        <RegisterField title="Confirm Password" name="password_confirmation" type="password" value={user?.password_confirmation} onChange={handleChange} />
       
        {isPending? <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
        <div className="flex items-center justify-end mt-4">
            <AlreadyRegistered />
            <RegisterBtn />
        </div>
        }
        
        </form>
    }
    </div>
</div>
    );
}

export default Register;

const SuccessMessage = ({message}) => {
    return (
        <div className="d-flex flex-column text-success fw-bold text-center mt-1">
            {message}
            <Link to="/login" className="btn btn-primary w-25 mr-2 mt-4 mx-auto">Login</Link>
        </div>
    )
}

const AlreadyRegistered = () => {
    return (
        <Link to={"/login"} className="underline text-sm text-gray-600 dark:text-gray hover:text-gray dark:hover:text-gray rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" >
            Already registered?
        </Link>
    )
}

const RegisterBtn = () => {
    return (
        <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-500 dark:bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700  active:bg-gray-500 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ml-4">
            Register
        </button>
    )
}

const RegisterField = ({title, name, value, type = 'text', onChange}) => {
    return (
        <div className="mt-4">
            
            <label className="block font-medium text-sm" htmlFor={name}>
                {title}
            </label>

            <input  
                className="border-gray-300 rounded-md block mt-1 w-full" 
                id={name}
                type={type}
                name={name} 
                value={value}
                required={true}
                autoComplete={name}
                onChange={onChange}
                />

        </div>
    );
}