import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageGroup from '../PageGroup';
import Placeholder from '../Placeholder';
import { findNodeParentsByUrl } from '../../utils/treeSearch';
import styles from './index.module.css';

const Menu = React.memo(({ pages }) => {
    const location = useLocation();
    const activePageUrl = location.pathname.substr(1);
    const initallyOpenedPages = findNodeParentsByUrl(pages, activePageUrl);

    return pages.length ? (
        <ul className={styles.menu}>
            {pages.map(page => (
                <PageGroup
                    key={page.id}
                    activePageUrl={activePageUrl}
                    initallyOpenedPages={initallyOpenedPages}
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
