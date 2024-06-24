import React, { useState, useEffect } from 'react'
import { Categories, Sort, PizzaBlock, Skeleton } from '../components';




function Home() {

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [categoryId, setCategoryId] = useState(0);
	const onClickCategory = (index) => {
		setCategoryId(index);
	}

	const [sort, setSort] = useState({ name: 'популярности', sortProperty: 'rating' });


	useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';

		fetch(`https://62cd50e9066bd2b6992348cd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
			.then(res => res.json())
			.then(json => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sort])

// TODO #10  6.26 

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onClickCategory} />
				<Sort value={sort} onChangeSort={setSort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
						: items.map((item) => <PizzaBlock key={item.id} {...item} />)
				}
			</div>
		</div>
	)
}

export default Home