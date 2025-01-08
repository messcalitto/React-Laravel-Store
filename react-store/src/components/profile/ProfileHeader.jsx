import React from 'react';

const ProfileHeader = ({title, description}) => {
    return (
        <header>
            <h3 className="text-lg font-medium ">
                {title}
            </h3>

            <p className="mt-1 text-sm ">
                {description}
            </p>
        </header>
    );
}

export default ProfileHeader;

