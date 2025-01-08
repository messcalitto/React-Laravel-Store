import React, { useEffect, useContext } from 'react';
import { useActionState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login  as axLogin} from '../components/AxiosFunctions';
import { PulseLoader } from 'react-spinners';
import TextFieldRow from '../components/basic/TextFieldRow';
import { DataContext } from '../context/DataContext';

const Login = () => {
    const {dataContext} = useContext(DataContext);
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const handleLogin = async (previousState, formData) => {
        const email = formData.get('email')
        const password = formData.get('password')
        setEmail(email);
        setPassword(password);
        setError(null);

        return await axLogin({email, password})
            .then(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('name', res.username)
                    dataContext.cartItems = [];
                    dataContext.userName = res.username;
                    navigate('/');
                    return true;
                }
                return false;
            })
            .catch(err => {
                setError(err);
            });
    }
  
    const [postRes, formAction, isPending] = useActionState(handleLogin, '');

    const inputChange = (e) => {
        setError(null);
    }

    return (
    <div className="my-5 flex flex-col sm:justify-center items-center sm:pt-0">        
    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border overflow-hidden sm:rounded-lg">
    <label className="custom-modal text-gray-500 fs-5 fw-bold">Login</label>

   <ErrorMessage error={error} />
    
    <form action={formAction}>
        
        <TextFieldRow type="email" name="email" defaultValue={email} label="Email" placeholder="Email" onChange={inputChange} required="required" autoComplete="email"/>
        <TextFieldRow type="password" name="password" defaultValue={password} label="Password" placeholder="Password" onChange={inputChange} required="required" autoComplete="current-password"/>

        <div className="flex items-center justify-end mt-4">
            <ForgotPasswordLink />
            <SubmitButton isPending={isPending} />
        </div>

    </form>
    </div>
</div>
    );
}

export default Login;


const ErrorMessage = ({error}) => {
    return (
        <>
        {error && <div className="alert-danger p-1 px-2 rounded" role="alert">
            {error}
        </div>}
        </>
    );
}

const ForgotPasswordLink = () => {
    return (
        <Link to={"/forgot-password"} className="underline text-sm text-gray dark:text-gray hover:text-gray dark:hover:text-gray rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" >
            Forgot your password?
        </Link>
    );
}


const SubmitButton = ({isPending}) => {
    return (
        <div style={{width: '120px', height: '25px'}}>
           
           {isPending ?  
            
            <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
           
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-500 dark:bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700  active:bg-gray-500 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ml-3">
                Log in
            </button>
            }
        </div>
        
    );
}