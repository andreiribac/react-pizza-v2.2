import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import Home from "./pages/Home";
import "./scss/app.scss";

// Ленивый импорт компонентов
const Cart = React.lazy(() => import("../src/pages/Cart"));
const NotFound = React.lazy(() => import("../src/pages/NotFound"));
const Pizza = React.lazy(() => import("../src/pages/Pizza"));

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Suspense fallback={<div>Загрузка...</div>}>
					<Routes>
						<Route index path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/pizza/:id" element={<Pizza />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	);
}

export default App;
