import React, { useContext, useRef, useCallback, useState } from 'react';

import styles from './Search.module.scss';
import { IconSvgSelector } from '../../assets/icons/IconsSvgSelector';
import { SearchContext } from '../../App';

function Search() {
	const { searchValue, setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	const onClickClear = () => {
		setSearchValue('');
		inputRef.current.focus();
	}
	//  TODO 14 16.45
	return (
		<label className={styles.inputArea}>
			<IconSvgSelector id='search' className={styles.inputArea__icon} />
			<input
				ref={inputRef}
				// value={value}
				// onChange={(e) => { onChangeInput(e) }}
				value={searchValue}
				onChange={(e) => { setSearchValue(e.target.value) }}
				className={styles.inputArea__input}
				type="text"
				placeholder='Поиск пиццы ...'
			/>
			{searchValue &&
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