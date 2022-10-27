import React from 'react'
import './Search.css'

const Search = ({ searchTerm, searchKeyword }) => {



    const getSearchTerm = (event) => {
        //console.log(event.target.value);
        searchKeyword(event.target.value);
    }

    return (
        <div className='search'>
            <span>
                <input className="searchInput"
                    placeholder="Search case with title..."
                    value={searchTerm}
                    onChange={getSearchTerm}
                />
            </span>


        </div>
    )
}

export default Search