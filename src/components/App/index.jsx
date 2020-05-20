import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchMenuData } from '../../gateways/menu';
import { growFilteredTree } from '../../utils/growFilteredTree';
import { growInitialTree } from '../../utils/growInitialTree';
import FilterInput from '../FilterInput';
import Menu from '../Menu';
import styles from './index.module.css';

const App = () => {
    const [data, setData] = useState({ items: null, topLevelIds: null });
    const [initialTree, setIntitialTree] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchMenuData().then(result => setData({ items: result[0], topLevelIds: result[1] }));
    }, []);

    useEffect(() => {
        if (data.items) {
            setIntitialTree(growInitialTree(data.items, data.topLevelIds));
        }
    }, [data]);

    const pages = useMemo(() => (filter ? growFilteredTree(data.items, filter) : initialTree), [
        data.items,
        initialTree,
        filter
    ]);

    const handleFilterChange = useCallback(text => {
        setFilter(text);
    }, []);

    return (
        <div className={styles.container}>
            <Menu pages={pages} />
            <FilterInput onChange={handleFilterChange} />
            <Link to="/navigating-through-the-source-code.html">Автоскролл</Link>
        </div>
    );
};

export default App;
