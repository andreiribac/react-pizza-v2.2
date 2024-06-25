import React, { useState, useEffect } from 'react'
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
// import pizzas from '../assets/pizzas.json';




function Home({ searchValue  }) {

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [categoryId, setCategoryId] = useState(0);
	const onClickCategory = (index) => {
		setCategoryId(index);
	}

	const [sort, setSort] = useState({ name: 'популярности', sortProperty: 'rating' });

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

		fetch(`https://62cd50e9066bd2b6992348cd.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&sortBy=${sortBy}&order=${order}`)
			.then(res => res.json())
			.then(json => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sort, currentPage])

// TODO #11

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onClickCategory} />
				<Sort value={sort} onChangeSort={setSort} />
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