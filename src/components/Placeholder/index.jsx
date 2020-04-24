import React from 'react';
import styles from './index.module.css';

const Placeholder = () => {
    const fillPlaceholder = () => {
        const placeolderItems = [];
        for (let i = 0; i < 10; i++) {
            placeolderItems.push(<li key={i} className={styles.placeholder} />);
        }
        return placeolderItems;
    };
    return <>{fillPlaceholder()}</>;
};

export default Placeholder;
