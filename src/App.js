import React, { useState, useEffect } from 'react'
import { Header, Categories, Sort, PizzaBlock, Skeleton } from './components';

import './scss/app.scss';


// import pizzas from './assets/pizzas.json';

function App() {

	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch('https://62cd50e9066bd2b6992348cd.mockapi.io/items')
			.then(res => res.json())
			.then(json => setItems(json));
	}, [])
	

	// #7 14.20

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{
							items.map((item) => {
								return (
									<PizzaBlock
										key={item.id}
										{...item}
									/>
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
