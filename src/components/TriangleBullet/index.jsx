import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const TriangleBullet = React.memo(({ onClick, isOpen, isDisabled }) => {
    const handleStateChange = () => {
        if (!isDisabled) {
            onClick();
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleStateChange();
        }
    };

    return (
        <div
            aria-label="Toggle menu group visibility"
            className={`${styles.bullet} ${isOpen ? styles.active : ''}`}
            role="button"
            tabIndex={0}
            onClick={handleStateChange}
            onKeyDown={handleKeyDown}
        />
    );
});

TriangleBullet.propTypes = {
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default TriangleBullet;
