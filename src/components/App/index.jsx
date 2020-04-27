import React, { useState, useEffect, useCallback } from 'react';
import { fetchMenuData } from '../../gateways/menu';
import PageGroup from '../PageGroup';
import { growFilteredTree } from '../../utils/growFilteredTree';
import { growInitialTree } from '../../utils/growInitialTree';
import Placeholder from '../Placeholder';
import FilterInput from '../FilterInput';
import styles from './index.module.css';

const App = () => {
    const [data, setData] = useState({ items: {}, topLevelIds: [] });
    const [filter, setFilter] = useState('');
    const activePageHook = useState('');

    useEffect(() => {
        fetchMenuData().then(result => setData({ items: result[0], topLevelIds: result[1] }));
    }, []);

    const handleFilterChange = useCallback(text => {
        setFilter(text);
    }, []);

    const pages = filter
        ? growFilteredTree(data.items, filter)
        : growInitialTree(data.items, data.topLevelIds, window.location.pathname.substr(1));

    return (
        <div className={styles.container}>
            {pages.length ? (
                <ul className={styles.menu}>
                    {pages.map(page => (
                        <PageGroup
                            key={page.id}
                            activePageHook={activePageHook}
                            isDisabled={false}
                            page={page}
                        />
                    ))}
                </ul>
            ) : (
                <Placeholder wrapperClass={styles.menu} />
            )}
            <FilterInput onChange={handleFilterChange} />
        </div>
    );
};

App.whyDidYouRender = true;

export default App;
