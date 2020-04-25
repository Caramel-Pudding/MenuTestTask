import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';

// Not actually a button
const MenuButton = ({ title, url, onClick }) => {
    const history = useHistory();
    const handleClick = e => {
        e.preventDefault();
        history.push(`/${url}`);
        if (onClick) {
            onClick();
        }
    };

    return (
        <a className={styles.link} href={url} onClick={handleClick}>
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