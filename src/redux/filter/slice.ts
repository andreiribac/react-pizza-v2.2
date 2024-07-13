import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort } from "./types";

const initialState: FilterSliceState = {
	searchValue: "",
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: "популярности (DESC)",
		sortProperty: "rating",
	},
};

const filterSlice: Slice<FilterSliceState> = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
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
		setFilters(
			state,
			action: PayloadAction<{
				currentPage: number;
				sort: Sort;
				categoryId: number;
			}>
		) {
			state.currentPage = action.payload.currentPage;
			state.sort = action.payload.sort;
			state.categoryId = action.payload.categoryId;
		},
	},
});

// Экспорт действий и редьюсера
export const {
	setCategoryId,
	setCurrentPage,
	setSort,
	setFilters,
	setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
