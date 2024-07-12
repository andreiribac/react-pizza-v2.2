import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { RootState } from '../store'; 

type SortProperty = 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';

type Sort = {
	name: string,
	sortProperty: SortProperty
}

interface FilterSliceState {
	searchValue: string,
	categoryId: number,
	currentPage: number,
	sort: Sort
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (DESC)',
		sortProperty: 'rating'
	}
}

export const filterSlice: Slice<FilterSliceState> = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) { // Исправлено название и добавлена типизация
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setFilters(state, action: PayloadAction<{
			currentPage: number,
			sort: Sort,
			categoryId: number
		}>) {
			state.currentPage = action.payload.currentPage;
			state.sort = action.payload.sort;
			state.categoryId = action.payload.categoryId;
		}
	},
})

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterCategoryById = (state: RootState) => state.filter.categoryId;
export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilterSearchValue = (state: RootState) => state.filter.searchValue;

export const { setCategoryId, setCurrentPage, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
