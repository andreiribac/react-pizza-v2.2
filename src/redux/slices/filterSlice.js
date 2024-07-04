import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (DESC)',
		sortProperty: 'rating'
	}
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCatagoryId(state, action)  {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		}
	},
})

export const selectFilter = (state) => state.filter;
export const selectFilterCategoryById = (state) => state.filter.categoryId;
export const selectFilterSort = (state) => state.filter.sort;
export const selectFilterSearchValue = (state) => state.filter.searchValue;


export const { setCatagoryId, setCurrentPage, setSort, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer