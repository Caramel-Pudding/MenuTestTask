import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageGroup from '../PageGroup';
import Placeholder from '../Placeholder';
import styles from './index.module.css';

const Menu = React.memo(({ pages }) => {
    const activePageHook = useState('');

    return pages.length ? (
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
    );
});

Menu.propTypes = {
    pages: PropTypes.array.isRequired
};

export default Menu;
