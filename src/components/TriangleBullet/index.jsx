import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const TriangleBullet = ({ onClick, isExpanded }) => {
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            onClick();
        }
    };

    return (
        <div
            aria-label="Toggle menu group visibility"
            className={`${styles.bullet} ${isExpanded && styles.active}`}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        />
    );
};

TriangleBullet.propTypes = {
    onClick: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired
};

export default TriangleBullet;
