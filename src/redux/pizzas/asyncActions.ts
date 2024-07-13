import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "./types";

// Функция для получения пицц с учетом параметров
export const fetchPizzas = createAsyncThunk<
	Pizza[],
	{
		category?: string;
		sortBy?: string;
		order?: string;
		search?: string;
		currentPage: number;
	}
>("pizzas/fetchPizzasStatus", async (params) => {
	const { category, sortBy, order, search, currentPage } = params;

	// Формируем часть URL с корректными параметрами
	let url = `https://62cd50e9066bd2b6992348cd.mockapi.io/items?page=${currentPage}&limit=4`;

	// Добавляем параметры, если они определены
	if (search) {
		url += `&search=${search}`;
	}
	if (category) {
		url += `&category=${category}`;
	}
	if (sortBy) {
		url += `&sortBy=${sortBy}`;
	}
	if (order) {
		url += `&order=${order}`;
	}

	const response = await axios.get<Pizza[]>(url);
	return response.data;
});
