import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return isOpen ? (
        <li>
            <ul>
                <li onClick={() => setIsOpen(false)}>
                    <a href={item.url}>{item.title}</a>
                </li>
                {item.childAnchors &&
                    item.childAnchors.map(anchor => (
                        <li key={anchor.id}>
                            <a href={anchor.url}>Anchor {anchor.title}</a>{' '}
                        </li>
                    ))}
            </ul>
            <ul>
                {item.childPages.map(page => (
                    <MenuItem key={page.id} item={page} />
                ))}
            </ul>
        </li>
    ) : (
        <li onClick={() => item.childPages && setIsOpen(true)}>
            <a href={item.url}>{item.title}</a>
        </li>
    );
};

MenuItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default MenuItem;
