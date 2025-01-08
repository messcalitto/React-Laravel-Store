import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataContext, setDataContext] = useState({
        username: localStorage.getItem('username')
    });

    const IsItemexists = (resource, id) => {
      return dataContext[resource].data.find(item => +item.id === +id);
    }

    const dataContextDeleteItem = (resource, id) => {
      dataContext[resource].data = dataContext[resource].data.filter(item => +item.id !== +id);
      dataContext[resource].total = dataContext[resource].total - 1;
    }

    const dataContextAddItem = (resource, item) => {
      dataContext[resource].data.push(item);
      dataContext[resource].total = dataContext[resource].total + 1;
    }

    const dataContextUpdateItem = (resource, item) => {
      const index = dataContext[resource].data.findIndex(i => i.id === item.id);
      dataContext[resource].data[index] = item;
    }

    const dataContextUpdateItemList = (resource, itemList, total) => {
      dataContext[resource].data = itemList;
      dataContext[resource].total = total;
    }

    const dataContextGetItem = (resource, id) => {
      return dataContext[resource].data.find(item => +item.id === +id);
    }

    return (
        <DataContext.Provider value={{ dataContext, setDataContext }}>
            {children}
        </DataContext.Provider>
    );
};
