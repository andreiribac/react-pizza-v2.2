import React, { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux'
import styles from './Search.module.scss';
import { IconSvgSelector } from '../../assets/icons/IconsSvgSelector';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str))
		}, 300),
		[],
	);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
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
					onClick={onClickClear}
					className={styles.inputArea__iconClose}
				/>
			}
		</label>
	)
}

export default Search