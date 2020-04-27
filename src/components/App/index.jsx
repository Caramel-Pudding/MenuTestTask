import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchMenuData } from '../../gateways/menu';
import { growFilteredTree } from '../../utils/growFilteredTree';
import { growInitialTree } from '../../utils/growInitialTree';
import FilterInput from '../FilterInput';
import Menu from '../Menu';
import styles from './index.module.css';

const App = () => {
    const [data, setData] = useState({ items: {}, topLevelIds: [] });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchMenuData().then(result => setData({ items: result[0], topLevelIds: result[1] }));
    }, []);

    const pages = useMemo(
        () =>
            filter
                ? growFilteredTree(data.items, filter)
                : growInitialTree(data.items, data.topLevelIds, window.location.pathname.substr(1)),
        [data, filter]
    );

    const handleFilterChange = useCallback(text => {
        setFilter(text);
    }, []);

    return (
        <div className={styles.container}>
            <Menu pages={pages} />
            <FilterInput onChange={handleFilterChange} />
        </div>
    );
};

export default App;
