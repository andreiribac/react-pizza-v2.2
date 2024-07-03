import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};
// TODO 17 46.27
const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		}
	}
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
