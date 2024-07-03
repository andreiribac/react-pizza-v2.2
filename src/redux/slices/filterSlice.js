import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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


export const { setCatagoryId, setCurrentPage, setSort, setFilters } = filterSlice.actions

export default filterSlice.reducer