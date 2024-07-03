import React, { useState, useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import { SearchContext } from '../App';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzasSlice';
import { sortList } from '../components/Sort';


function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const items = useSelector((state) => state.pizzas.items);
	const { searchValue } = useContext(SearchContext);
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
	const [isLoading, setIsLoading] = useState(true);
	

	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
	const pizzas = items.filter(obj => {
		return obj.title.toLowerCase().includes(searchValue.toLowerCase())
	}).map((item) => <PizzaBlock key={item.id} {...item} />);

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	};

	const fetchPizzas = async () => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		
		try {
			const {data} = await axios.get(
				`https://62cd50e9066bd2b6992348cd.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&sortBy=${sortBy}&order=${order}`
			);
			dispatch(setItems(data));
		} catch (error) {
			console.log(error, 'Axios Error');
			alert('Ошибка получения пицц')
		} finally {
			setIsLoading(false);
		}

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
		// if (!isSearch.current) {
		// 	fetchPizzas();
		// }
		fetchPizzas();
		isSearch.current = false;
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, currentPage, searchValue])

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


	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading ? skeletons : pizzas
				}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home