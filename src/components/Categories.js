import React, { useState } from 'react'


function Categories() {

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	const [activeIndex, setActiveIndex] = useState(0);
	const onClickCategory = (index) => {
		setActiveIndex(index);
	}

	return (
		<div className="categories">
			<ul>
				{
					categories.map((categoryName, index) => {
						return (
							<li
								key={categoryName + index}
								onClick={() => onClickCategory(index)}
								className={activeIndex === index ? 'active' : ''}
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