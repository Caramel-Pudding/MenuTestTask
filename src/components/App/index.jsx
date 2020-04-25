import React, { useState, useEffect } from 'react';
import { fetchMenuData } from '../../gateways/menu';
import PageGroup from '../PageGroup';
import { growATree } from '../../utils/treeGrower';
import Placeholder from '../Placeholder';
import styles from './index.module.css';

const App = () => {
    const [pages, setPages] = useState([]);
    const activePageHook = useState('');

    useEffect(() => {
        fetchMenuData().then(result =>
            setPages(growATree(...result, window.location.pathname.substr(1)))
        );
    }, []);

    return (
        <ul className={styles.container}>
            {pages.length ? (
                pages.map(page => (
                    <PageGroup key={page.id} activePageHook={activePageHook} page={page} />
                ))
            ) : (
                <Placeholder />
            )}
        </ul>
    );
};

export default App;
