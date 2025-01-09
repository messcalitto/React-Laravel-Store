import React from 'react';
import ProfileInformation from '../components/profile/ProfileInformation.tsx';
import UpdatePassword from '../components/profile/UpdatePassword.tsx';
import DeleteAccount from '../components/profile/DeleteAccount.tsx';

const Profile = () => {
    
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            
            <ProfileInformation  />

            <UpdatePassword  />

            <DeleteAccount />

        </div>
    </div>
    );
}

export default Profile;
