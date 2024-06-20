import { Header, Categories, Sort, PizzaBlock } from './components';

import './scss/app.scss';

import pizzas from './assets/pizzas.json';

function App() {
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
							pizzas.map((item) => {
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
