import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TriangleBullet from '../TriangleBullet';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const PageGroup = React.memo(({ page, activePageHook }) => {
    const [isOpen, setIsOpen] = useState(page.isInitiallyOpened);
    const [activePage, setActivePage] = activePageHook;
    useEffect(() => {
        if (page.isInitiallyActive) {
            setActivePage(page.id);
        }
    }, []);

    const isActive = page.id === activePage;

    const handleBulletClick = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = () => {
        setActivePage(page.id);
        setIsOpen(true);
    };

    const liStyle = hasBullet => ({ paddingLeft: (hasBullet ? 32 : 44) + 16 * page.level });

    return (
        <>
            <li
                className={`${styles.listItem} ${
                    isActive ? `${styles.activePageButton} ${styles.activeOutline}` : ''
                }`}
                style={liStyle(!!page.childPages.length)}
            >
                {!!page.childPages.length && (
                    <TriangleBullet isExpanded={isOpen} onClick={handleBulletClick} />
                )}
                <MenuButton title={page.title} url={page.url} onClick={handleButtonClick} />
            </li>
            {isOpen &&
                isActive &&
                page.childAnchors.map(anchor => (
                    <li
                        key={anchor.id}
                        className={`${styles.listItem} ${styles.activeOutline}`}
                        style={liStyle(false)}
                    >
                        <MenuButton title={anchor.title} url={anchor.url + anchor.anchor} />
                    </li>
                ))}
            {isOpen &&
                page.childPages.map(childPage => (
                    <PageGroup
                        key={childPage.id}
                        activePageHook={activePageHook}
                        page={childPage}
                    />
                ))}
        </>
    );
});

PageGroup.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        url: PropTypes.string,
        childPages: PropTypes.array.isRequired,
        childAnchors: PropTypes.array.isRequired,
        isInitiallyOpened: PropTypes.bool.isRequired,
        isInitiallyActive: PropTypes.bool.isRequired
    }).isRequired,
    activePageHook: PropTypes.array.isRequired
};

export default PageGroup;
