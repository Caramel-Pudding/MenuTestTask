import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../utils/debounce';
import styles from './index.module.css';

const FilterInput = React.memo(({ onChange }) => {
    const handleInput = debounce(text => {
        onChange(text);
    }, 300);

    return (
        <input
            className={styles.input}
            type="text"
            onChange={event => handleInput(event.target.value)}
        />
    );
});

FilterInput.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default FilterInput;
