import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

// Not actually a button
const MenuButton = ({ title, url, onClick }) => {
    return (
        <a className={styles.link} href={url} onClick={() => onclick && onClick()}>
            {title}
        </a>
    );
};

MenuButton.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    onClick: PropTypes.func
};

export default MenuButton;
