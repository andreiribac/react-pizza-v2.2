import React, { useContext, useRef, useCallback, useState } from 'react';

import styles from './Search.module.scss';
import { IconSvgSelector } from '../../assets/icons/IconsSvgSelector';

function Search({ searchValue, setSearchValue}) { 

	return (
		<label className={styles.inputArea}>
			<IconSvgSelector id='search' className={styles.inputArea__icon} />
			<input
				// ref={inputRef}
				// value={value}
				// onChange={(e) => { onChangeInput(e) }}
				value={searchValue}
				onChange={(e) => { setSearchValue(e.target.value) }}
				className={styles.inputArea__input}
				type="text"
				placeholder='Поиск пиццы ...'
			/>
			{/* {value &&
				<IconSvgSelector
					id='close'
					// onClick={() => onClickClear()}
					className={styles.inputArea__iconClose}
				/>
			} */}
			{searchValue &&
				<IconSvgSelector
					id='close'
					onClick={() => setSearchValue('')}
					className={styles.inputArea__iconClose}
				/>
			}
		</label>
	)
}

export default Search