import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config';


const Paging = ({setPage, current_page, total, addClass}) => {
    
    const totalPages = Math.ceil(total / config.pageSize);

    if (totalPages < 2) return null;

    return (
    <nav className={`d-flex justify-content-end ${addClass}`}>
    <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-end">
    <div>
        <ul className="pagination">
            
            <li className={`page-item ${current_page <= 1? 'disabled':''}`} aria-label="&laquo; Previous">
                <Link className={`page-link ${current_page <= 1? 'disabled':''}`} onClick={() => setPage(current_page-1)} rel="prev" aria-label="Prev &laquo;">&lsaquo;</Link>
            </li>
        
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <li className={`page-item ${current_page === page ? 'active' : ''}`} key={page}>
                    <Link className="page-link" onClick={() => setPage(page)}>{page}</Link>
                </li>
            ))}
        
            <li className={`page-item ${current_page >= totalPages? 'disabled':''}`}>
                <Link className={`page-link ${current_page >= totalPages? 'disabled':''}`} onClick={() => setPage(current_page+1)} rel="next" aria-label="Next &raquo;">&rsaquo;</Link>
            </li>
            </ul>
            </div>
        </div>
    </nav>
    );
}

export default Paging;
