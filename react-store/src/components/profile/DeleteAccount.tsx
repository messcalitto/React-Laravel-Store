import React, {useContext} from 'react';
import ProfileHeader from './ProfileHeader.tsx';
import Swal from 'sweetalert2';
import { axProfileDestroy } from '../AxiosFunctions.tsx';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

const DeleteAccount = () => {
    const navigate = useNavigate();
    const {dataContext} = useContext(DataContext);

    const showDeleteConfirmation = async () => {
        await Swal.fire({
            title: 'Are you sure you want to delete your account?',
            customClass: {
                title: 'custom-modal fs-5'  // Bootstrap font-family and size
            },
            html: `
                <p>This will permanently delete your account and all associated data.</p>
            `,
            input: 'password',
            inputLabel: 'Confirm Password',
            inputPlaceholder: 'Enter your password',
            showCancelButton: true,
            confirmButtonText: 'Delete Account',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
                // Show loading spinner while deleting
                Swal.showLoading();
                try {
                    // Your delete account API call here
                    await axProfileDestroy({password});
                    
                    localStorage.removeItem('name');
                    localStorage.removeItem('token');
                    dataContext.userName = '';
                    navigate('/');

                    return true;
                } catch (error) {
                    Swal.showValidationMessage(error);
                    return false;
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }
    
    
    return (
    <div className="p-4 sm:p-8 bg-white border sm:rounded-lg">
        <div className="max-w-xl">
        <section className="space-y-6">
        
        <ProfileHeader 
            title="Delete Account" 
            description="Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." />
        
        <button onClick={showDeleteConfirmation} className="inline-flex items-center px-4 py-1 bg-red-600 rounded-md">
            Delete Account
        </button>

        
        </section>

        </div>
    </div>
    );
}

export default DeleteAccount;
