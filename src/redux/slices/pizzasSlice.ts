import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Функция для получения пицц с учетом параметров
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: { category?: string, sortBy?: string, order?: string, search?: string, currentPage: number }) => {
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
  }
);

type Pizza = {
  id: string,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: string,
  rating: number,
};

interface PizzaSliceState {
  items: Pizza[],
  status: 'idle' | 'loading' | 'succeeded' | 'error',
  error: string | null
}

const initialState: PizzaSliceState = {
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
        state.error = action.error.message || 'Неизвестная ошибка';
        state.items = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
