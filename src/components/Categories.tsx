import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWhyDidYouUpdate } from "ahooks";

import { setCategoryId } from "../redux/filter/slice";
import { selectFilterCategoryById } from "../redux/filter/selectors";

const Categories: React.FC = React.memo(() => {
	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	const categoryId = useSelector(selectFilterCategoryById);
	const dispatch = useDispatch();

	useWhyDidYouUpdate("Categories()", {
		setCategoryId,
		selectFilterCategoryById,
	});

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							key={categoryName + index}
							onClick={() => dispatch(setCategoryId(index))}
							className={+categoryId === index ? "active" : ""}
						>
							{categoryName}
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default Categories;
