import React, { useState, useEffect } from 'react'
import { Categories, Sort, PizzaBlock, Skeleton } from '../components';

function Home() {

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://62cd50e9066bd2b6992348cd.mockapi.io/items')
			.then(res => res.json())
			.then(json => {
				setItems(json);
				setIsLoading(false);
			});
	}, [])


	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
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