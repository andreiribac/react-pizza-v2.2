import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
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
		setSort(state, action) {
			state.sort = action.payload;
		},
	},
})


export const { setCatagoryId, setSort } = filterSlice.actions

export default filterSlice.reducer