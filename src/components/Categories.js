import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCatagoryId, selectFilterCategoryById } from '../redux/slices/filterSlice';


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
								onClick={() => dispatch(setCatagoryId(index))}
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