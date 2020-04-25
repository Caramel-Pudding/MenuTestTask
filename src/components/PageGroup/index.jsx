import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TriangleBullet from '../TriangleBullet';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const PageGroup = React.memo(({ page, activePageHook }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = activePageHook;
    const isActive = page.id === activePage;

    const openGroup = () => {
        setIsOpen(true);
    };

    const closeGroup = () => {
        setIsOpen(false);
    };

    const handleButtonClick = () => {
        openGroup();
        setActivePage(page.id);
    };

    if (isOpen) {
        return (
            <li>
                <ul
                    className={`${styles.headerAndAnchors} ${isActive ? styles.activeOutline : ''}`}
                >
                    <li className={`${styles.listItem} ${isActive ? styles.activePageButton : ''}`}>
                        <TriangleBullet isExpanded={isOpen} onClick={closeGroup} />
                        <MenuButton title={page.title} url={page.url} onClick={handleButtonClick} />
                    </li>
                    {isActive &&
                        page.childAnchors.map(anchor => (
                            <li
                                key={anchor.id}
                                className={`${styles.listItem} ${styles.withoutBullet}`}
                            >
                                <MenuButton title={anchor.title} url={anchor.url + anchor.anchor} />
                            </li>
                        ))}
                </ul>
                <ul className={styles.childPages}>
                    {page.childPages.map(childPage => (
                        <PageGroup
                            key={childPage.id}
                            activePageHook={activePageHook}
                            page={childPage}
                        />
                    ))}
                </ul>
            </li>
        );
    }
    return (
        <li className={`${styles.listItem} ${!page.childPages.length ? styles.withoutBullet : ''}`}>
            {page.childPages.length ? (
                <TriangleBullet isExpanded={isOpen} onClick={openGroup} />
            ) : null}
            <MenuButton
                title={page.title}
                url={page.url}
                onClick={page.childPages.length ? handleButtonClick : undefined}
            />
        </li>
    );
});

PageGroup.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        childPages: PropTypes.array.isRequired,
        childAnchors: PropTypes.array.isRequired
    }).isRequired,
    activePageHook: PropTypes.array.isRequired
};

export default PageGroup;
