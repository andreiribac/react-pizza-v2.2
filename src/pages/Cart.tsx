import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { CartEmpty, CartItem } from '../components';
import { clearItems } from '../redux/slices/cartSlice'
import { IconSvgSelector } from '../assets/icons/IconsSvgSelector'
import { selectCart } from '../redux/slices/cartSlice'

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const { totalPrice, items } = useSelector(selectCart);
	const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

	const onClickClear = () => {
		if (window.confirm('вы хотите удалить все пиццы?')) {
			dispatch(clearItems());
		}
	};

	return (
		<div className="container container--cart">
			{
				totalPrice !== 0 ? (
					<div className="cart">
						<div className="cart__top">
							<h2 className="content__title">
								<IconSvgSelector id="cart-black" />
								Корзина</h2>
							<div onClick={onClickClear} className="cart__clear">
								<IconSvgSelector id="trash" />
								<span >Очистить корзину</span>
							</div>
						</div>
						<div className="cart__items">
							{
								items.map((item: any) => {
									return (
										<CartItem key={item.id}
											{...item}
										/>
									)
								})
							}
						</div>
						<div className="cart__bottom">
							<div className="cart__bottom-details">
								<span> Всего пицц: <b>{totalCount} шт.</b> </span>
								<span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
							</div>
							<div className="cart__bottom-buttons">
								<Link to="/" className="button button--outline button--add go-back-btn">
									<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
									</svg>

									<span>Вернуться назад</span>
								</Link>
								<div className="button pay-btn">
									<span>Оплатить сейчас</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<CartEmpty />
				)
			}
		</div>
	)
}

export default Cart