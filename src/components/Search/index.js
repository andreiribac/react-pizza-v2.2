import React, { useContext, useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux'
import styles from './Search.module.scss';
import { IconSvgSelector } from '../../assets/icons/IconsSvgSelector';
import { setSearchValue, selectFilterSearchValue } from '../../redux/slices/filterSlice';

function Search() {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const searchValue = useSelector(selectFilterSearchValue);
	const inputRef = useRef();

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
		}, 300),
		[],
	);

	const onChangeInput = (e) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
		// dispatch(setSearchValue(e.target.value))
	}



	return (
		<label className={styles.inputArea}>
			<IconSvgSelector id='search' className={styles.inputArea__icon} />
			<input
				ref={inputRef}
				value={value}
				onChange={(e) => { onChangeInput(e) }}
				className={styles.inputArea__input}
				type="text"
				placeholder='Поиск пиццы ...'
			/>
			{value &&
				<IconSvgSelector
					id='close'
					onClick={() => onClickClear()}
					className={styles.inputArea__iconClose}
				/>
			}
		</label>
	)
}

export default Search