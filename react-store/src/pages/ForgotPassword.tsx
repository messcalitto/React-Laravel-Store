import React, { useState, useActionState } from 'react';
import { axPasswordReset } from '../components/AxiosFunctions.tsx';
import { PulseLoader } from 'react-spinners';

const ForgotPassword = () => {
    const [successMsg, setSuccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [defaultEmail, setDefaultEmail] = useState<string>('');

    const [, formAction, isPending] = useActionState(async (_, formData: FormData): Promise<boolean> => {
        
        const email = formData.get('email') as string;

        await axPasswordReset({email})
            .then(res => {
                if (res) {
                    setSuccessMsg(res);
                }
                return true;
            })
            .catch(err => {
                setErrorMsg(err);
                return false;
            });

        setDefaultEmail(email);

        return true;

    }, null);

    return (
    
    <div className="w-full my-5 mx-auto sm:max-w-md mt-6 px-6 py-4 bg-white border overflow-hidden sm:rounded-lg">
    
    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot your password? No problem. Just let us know your email 
        address and we will email you a password reset link that will 
        allow you to choose a new one.
    </div>
        
        {errorMsg && <div className="alert alert-danger mb-3">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success mb-3">{successMsg}</div>}

    <form action={formAction}>
    
        <div>
            <label className="block font-medium text-sm" htmlFor="email">
                Email
            </label>

            <input 
                className="border-gray-300 rounded-md block mt-1 w-full" 
                id="email" 
                type="email" 
                name="email" 
                defaultValue={defaultEmail}
                required 
                autoFocus 
            />
        </div>

        <div className="flex items-center justify-end mt-4">
            
            {isPending ? 
            
            <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> 
            :
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-500 dark:bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700  active:bg-gray-500 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                Email Password Reset Link
            </button>
            }

        </div>
    </form>
    </div>
    );
}

export default ForgotPassword;
