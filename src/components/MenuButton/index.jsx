import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';

// Not actually a button
const MenuButton = React.memo(({ title, url, onClick, isDisabled, firstChildUrl }) => {
    const history = useHistory();
    const handleClick = e => {
        e.preventDefault();
        if (!isDisabled) {
            if (url || firstChildUrl) {
                history.push(`/${url || firstChildUrl}`);
            }
            if (onClick) {
                onClick();
            }
        }
    };

    return (
        <a
            className={`${styles.link} ${isDisabled ? styles.disabled : ''}`}
            href={url}
            onClick={handleClick}
        >
            {title}
        </a>
    );
});

MenuButton.propTypes = {
    title: PropTypes.string.isRequired,
    firstChildUrl: PropTypes.string,
    url: PropTypes.string,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool.isRequired
};

export default MenuButton;
