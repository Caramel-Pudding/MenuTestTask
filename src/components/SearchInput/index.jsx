import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styles from './index.module.css';

const SearchInput = ({ onChange }) => {
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
};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default SearchInput;
