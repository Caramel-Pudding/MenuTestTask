import React, { useState, useEffect } from 'react';
import { fetchMenuData } from './gateways/menu';
import MenuItem from './components/MenuItem';
import { growATree } from './utils/treeGrower';

const App = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchMenuData().then(result => setPages(growATree(...result)));
    }, []);

    return (
        <section>
            <ul>
                {pages.map(page => (
                    <MenuItem key={page.id} item={page} />
                ))}
            </ul>
        </section>
    );
};

export default App;
