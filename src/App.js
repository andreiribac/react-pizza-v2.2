import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Header } from './components';
import { Home, Cart, NotFound } from './pages';

import './scss/app.scss';


// import pizzas from './assets/pizzas.json';

export const SearchContext = createContext('');

function App() {

	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<Routes>
						<Route index path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
