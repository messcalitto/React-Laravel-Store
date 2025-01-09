import React from 'react';

const SearchBox = ({search, handleSearch}) => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        handleSearch(form.search.value);
    }

    return (
         <div id="searchBar">
            <form onSubmit={onSubmit} method="get">
            <input type="text" name="search" placeholder="Search" defaultValue={search} />
            <button type="submit" >Search </button>
            </form>
        </div>
    );
}

export default SearchBox;
