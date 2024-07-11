import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  onChangePage: any;
}

const Pagination:React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel="..."
			nextLabel=">"
			// onPageChange={handlePageClick}
			onPageChange={event => onChangePage(event.selected + 1)}
			// onPageChange={event => console.log(event.selected + 1)}
			pageRangeDisplayed={4}
			// pageCount={pageCount}
			pageCount={3}
			forcePage={currentPage - 1}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination