import React from 'react'
import './Pagination.css'

const Pagination = ({ casesPerPage, totalCases, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCases / casesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination'>
            <ul className='paginate'>
                {pageNumbers.map(number => (
                    <span key={number} className="pages">
                        <a href='!#' className='page-link' onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default Pagination