import React from 'react';
import styles from './index.module.css';

const Placeholder = wrapperClass => {
    const fillPlaceholder = () => {
        const placeolderItems = [];
        for (let i = 0; i < 10; i++) {
            placeolderItems.push(<li key={i} />);
        }
        return placeolderItems;
    };

    return (
        <ul className={`${wrapperClass.wrapperClass} ${styles.placeholder}`}>
            {fillPlaceholder()}
        </ul>
    );
};

export default Placeholder;
