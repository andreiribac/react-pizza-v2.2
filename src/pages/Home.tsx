import React, { useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Categories, Sort, PizzaBlock, Skeleton, Pagination, NotFoundBlock, } from "../components";
import { setCurrentPage, setFilters, selectFilter, } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import { sortList } from "../components/Sort";
import { AppDispatch } from "../redux/store"; // Убедитесь, что этот импорт правильный

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { items, status } = useSelector(selectPizzas);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];
	const skeletons = [...new Array(4)].map((_, index) => (<Skeleton key={index} />));
	const pizzas = items
		.filter((obj: any) => {
			return obj.title.toLowerCase().includes(searchValue.toLowerCase());
		})
		.map((item: any) => <PizzaBlock key={item.id} {...item} />);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? String(categoryId) : "";
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const search = searchValue ? searchValue : "";

		try {
			await dispatch(
				fetchPizzas({
					category,
					sortBy,
					order,
					search,
					currentPage,
				})
			);
		} catch (error) {
			console.error("Failed to fetch pizzas:", error);
		}
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		getPizzas();
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, currentPage, searchValue]);

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

	if (status === "error") {
		return <NotFoundBlock />;
	}

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">{categories[categoryId]} пиццы</h2>
			<div className="content__items">
				{status === "loading" ? skeletons : pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
