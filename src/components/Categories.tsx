import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId, selectFilterCategoryById } from '../redux/slices/filterSlice';


function Categories() {
	

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	const categoryId = useSelector(selectFilterCategoryById);
	const dispatch = useDispatch();
	

	return (
		<div className="categories">
			<ul>
				{
					categories.map((categoryName, index) => {
						return (
							<li
								key={categoryName + index}
								onClick={() => dispatch(setCategoryId(index))}
								className={categoryId === index ? 'active' : ''}
							>
								{categoryName}
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default Categories