import React, { useState, useEffect } from 'react';
import { fetchMenuData } from './gateways/menu';
import PageItem from './components/PageItem';
import { growATree } from './utils/treeGrower';
import Placeholder from './components/Placeholder';
import styles from './App.module.css';

const App = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchMenuData().then(result => setPages(growATree(...result)));
    }, []);

    return (
        <ul className={styles.container}>
            {pages.length ? (
                pages.map(page => <PageItem key={page.id} page={page} />)
            ) : (
                <Placeholder />
            )}
        </ul>
    );
};

export default App;
