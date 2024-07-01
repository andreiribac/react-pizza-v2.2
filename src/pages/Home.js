import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
// import pizzas from '../assets/pizzas.json';
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'





function Home() {
	const { searchValue } = useContext(SearchContext);
	const { categoryId, sort } = useSelector((state) => state.filter);

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);


	const [currentPage, setCurrentPage] = useState(1);
	const onChangePage = (number) => {
		setCurrentPage(number);
	};

	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
	const pizzas = items.filter(obj => {
		return obj.title.toLowerCase().includes(searchValue.toLowerCase())
	}).map((item) => <PizzaBlock key={item.id} {...item} />);

	useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `search=${searchValue}` : '';

		// fetch(`https://62cd50e9066bd2b6992348cd.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&sortBy=${sortBy}&order=${order}`)
		// 	.then(res => res.json())
		// 	.then(json => {
		// 		setItems(json);
		// 		setIsLoading(false);
		// 	});

		let urlPath = `https://62cd50e9066bd2b6992348cd.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&sortBy=${sortBy}&order=${order}`;

		axios
			.get(urlPath)
			.then(res => {
				setItems(res.data);
				setIsLoading(false);
			});

		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, currentPage, searchValue])



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