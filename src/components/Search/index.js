import React, { useContext, useRef, useCallback, useState } from 'react';

import styles from './Search.module.scss';
import { IconSvgSelector } from '../../assets/icons/IconsSvgSelector';

function Search() { 

	return (
		<label className={styles.inputArea}>
			<IconSvgSelector id='search' className={styles.inputArea__icon} />
			<input
				// ref={inputRef}
				// value={value}
				// onChange={(e) => { onChangeInput(e) }}
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
		</label>
	)
}

export default Search