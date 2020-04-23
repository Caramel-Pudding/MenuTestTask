import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { menuLocalHost } from './consts/hosts';
import MenuItem from './components/MenuItem';
import { growATree } from './utils/treeGrower';

const App = () => {
    const [pages, setPages] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`${menuLocalHost}/entities`);
        setPages(growATree(result.data));
    };

    useEffect(() => {
        fetchData();
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
