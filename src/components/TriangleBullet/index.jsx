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
        <svg
            className={`
            ${styles.bullet} 
            ${isOpen ? styles.active : ''} 
            ${isDisabled ? styles.disabled : ''}
            `}
            height="10"
            tabIndex={0}
            width="10"
            onClick={handleStateChange}
            onKeyDown={handleKeyDown}
        >
            <polygon points="0,0 0,10 7.5,5" style={{ fill: isDisabled ? '#B0B0B2' : 'black' }} />
        </svg>
    );
});

TriangleBullet.propTypes = {
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default TriangleBullet;
