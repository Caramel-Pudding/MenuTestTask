import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return isOpen ? (
        <li>
            <span onClick={() => setIsOpen(false)}>{item.title}</span>
            <ul>
                {item.childPages.map(page => (
                    <MenuItem key={page.id} item={page} />
                ))}
            </ul>
        </li>
    ) : (
        <li onClick={() => item.childPages && setIsOpen(true)}>{item.title}</li>
    );
};

MenuItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default MenuItem;
