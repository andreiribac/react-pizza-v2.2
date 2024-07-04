import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

function Pizza() {
	const [pizza, setPizza] = useState([])
	const { id } = useParams();
	
	useEffect(() => {
		async function fetchPIzza() {
			try {
				const { data } = await axios.get('https://62cd50e9066bd2b6992348cd.mockapi.io/items/' + id)
				setPizza(data);
			} catch (error) {
				alert('Error pizza page')
			}
		}
		fetchPIzza();
	}, [])

	if (!pizza) {
		return (
			<div className="container">
				Загрузка
			</div>
		)
	}
	
	return (
		<div className="container">
			{/* <div>{id}</div> */}
			<h2>{pizza.title}</h2>
			{/* <h4>{pizza.category}</h4> */}
			<img src={pizza.imageUrl} />
			{/* <div>{pizza.types}</div> */}
			{/* <div>{pizza.sizes}</div> */}
			<div>{pizza.price} p</div>
		</div>
	)
}

export default Pizza