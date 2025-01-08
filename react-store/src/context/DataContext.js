import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataContext, setDataContext] = useState({
        cartItems: [],
        userName: typeof localStorage.getItem('name') !==  'undefined' ? localStorage.getItem('name') : '',
    });

   
    return (
        <DataContext.Provider value={{ dataContext, setDataContext }}>
            {children}
        </DataContext.Provider>
    );
};
