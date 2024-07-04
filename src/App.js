import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Header } from './components';
import { Home, Cart, NotFound, Pizza } from './pages';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/pizza/:id" element={<Pizza />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
