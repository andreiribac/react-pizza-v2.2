export type CartItem = {
	id: string;
	title: string;
	type?: string;
	price: number;
	size?: number | string;
	count: number;
	imageUrl: string;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}
