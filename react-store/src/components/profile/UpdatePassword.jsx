import React, {useState, useActionState, useEffect} from 'react';
import ProfileHeader from './ProfileHeader';
import FieldRow from './FieldRow';
import ButtonSave from './ButtonSave';
import { axPasswordUpdate } from '../AxiosFunctions';
import { PulseLoader } from 'react-spinners';


const UpdatePassword = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [user, setUser] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [success, formAction, isPending] = useActionState(async (previousState, formData)=>{
        const current_password = formData.get('current_password')
        const password = formData.get('password')
        const password_confirmation = formData.get('password_confirmation')
        setUser({current_password, password, password_confirmation})
        setErrorMsg('')

        return await axPasswordUpdate({current_password, password, password_confirmation})
            .then(res => {
                if (res) {
                    setUser(res.data);
                    localStorage.setItem('name', res.data.name)
                    return "Updated!";
                }
            })
            .catch(err => {
                setErrorMsg(err)
            })
    }, '');

    useEffect(() => {
        if (success && !isPending) {
            setSuccessMsg(success);
            const timer = setTimeout(() => {
                setSuccessMsg('');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [success, isPending]);

    return (
    <div className="p-4 sm:p-8 bg-white border sm:rounded-lg">
        <div className="max-w-xl">
        <section>
        
        <ProfileHeader 
            title="Update Password" 
            description="Ensure your account is using a long, random password to stay secure." />

        <form action={formAction} className="mt-6 space-y-6">
            
            {errorMsg && <div className="text-danger mx-2 mt-1">{errorMsg}</div>}

            <FieldRow title="Current Password" name="current_password" type="password" value={user.current_password}/>
            <FieldRow title="New Password" name="password" type="password" value={user.password}/>
            <FieldRow title="Confirm Password" name="password_confirmation" type="password" value={user.password_confirmation}/>
            
            <div className="flex">
            {isPending? <PulseLoader color="#0d6efd" size={12} className="ml-4 mt-1" /> :
            <ButtonSave /> 
            }
            {successMsg && <div className="text-success fw-bold mx-2 mt-1">{successMsg}</div>}
            </div>
        </form>
    </section>

        </div>
    </div>
    );
}

export default UpdatePassword;
