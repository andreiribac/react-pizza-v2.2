import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchPizzas = createAsyncThunk(
// 	'pizzas/fetchPizzasStatus',
// 	async (params) => {
// 		const { category, sortBy, order, search, currentPage } = params;
// 		const response = await axios.get(
// 			`https://62cd50e9066bd2b6992348cd.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`
// 		);
// 		return response.data;
// 	}
// );

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async (params) => {
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

		const response = await axios.get(url);
		return response.data;
	}
);

const initialState = {
	items: [],
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'error'
	error: null
};

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
				state.items = [];
			});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
