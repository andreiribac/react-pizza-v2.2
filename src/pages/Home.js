import React, { useState, useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Categories, Sort, PizzaBlock, Skeleton, Pagination, NotFoundBlock } from '../components';
import { SearchContext } from '../App';
import { setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import { sortList } from '../components/Sort';


function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { items, status } = useSelector(selectPizzas);
	const { searchValue } = useContext(SearchContext);
	const { categoryId, sort, currentPage } = useSelector(selectFilter);
	

	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
	const pizzas = items.filter(obj => {
		return obj.title.toLowerCase().includes(searchValue.toLowerCase())
	}).map((item) => <PizzaBlock key={item.id} {...item} />);

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? categoryId : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? searchValue : '';

		dispatch(fetchPizzas({
			category,
			sortBy,
			order,
			search,
			currentPage
		}));
	}

	//  Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort
				})
			);
			isSearch.current = true;
		}
	}, [])
	// Если был первый рендер то запрашиваем пиццы
	useEffect(() => {
		getPizzas();
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, currentPage, searchValue,])
 

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	if (status === 'error') {
		return (
			<NotFoundBlock />
		)
	}


	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					status === 'loading' ? skeletons : pizzas
				}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home