import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

const totalPriceFunction = (state) => {
	state.totalPrice = state.items.reduce((sum, obj) => {
		return (obj.price * obj.count) + sum;
	}, 0)
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			totalPriceFunction(state);
		},
		minusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count--;
			}
			totalPriceFunction(state);
		},
		removeItem(state, action) {
			state.items = state.items.filter(obj => obj.id !== action.payload.id);
			totalPriceFunction(state);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	}
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;