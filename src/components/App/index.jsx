import React, { useState, useEffect } from 'react';
import { fetchMenuData } from '../../gateways/menu';
import PageGroup from '../PageGroup';
import { growFilteredTree } from '../../utils/growFilteredTree';
import { growInitialTree } from '../../utils/growInitialTree';
import Placeholder from '../Placeholder';
import SearchInput from '../SearchInput';
import styles from './index.module.css';

const App = () => {
    const [data, setData] = useState({ items: {}, topLevelIds: [] });
    const [filter, setFilter] = useState('');
    const activePageHook = useState('');

    useEffect(() => {
        fetchMenuData().then(result => setData({ items: result[0], topLevelIds: result[1] }));
    }, []);

    const pages = filter
        ? growFilteredTree(data.items, filter)
        : growInitialTree(data.items, data.topLevelIds, window.location.pathname.substr(1));

    return (
        <div className={styles.container}>
            {!pages.length ? (
                <Placeholder wrapperClass={styles.menu} />
            ) : (
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
            )}
            <SearchInput onChange={setFilter} />
        </div>
    );
};

export default App;
