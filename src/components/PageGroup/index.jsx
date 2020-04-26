import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TriangleBullet from '../TriangleBullet';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const PageGroup = React.memo(({ page, activePageHook, isDisabled }) => {
    const [isOpen, setIsOpen] = useState(page.isInitiallyOpened);
    const [activePage, setActivePage] = activePageHook;

    useEffect(() => {
        if (page.isInitiallyActive) {
            setActivePage(page.id);
        }
    }, [page.id, page.isInitiallyActive, setActivePage]);

    const isActive = page.id === activePage;

    const handleBulletClick = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = () => {
        setActivePage(page.id);
        setIsOpen(true);
    };

    const liStyle = hasBullet => ({ paddingLeft: (hasBullet ? 32 : 44) + 16 * page.level });

    const renderAnchors = () =>
        page.childAnchors.map(anchor => (
            <li
                key={anchor.id}
                className={`
                        ${styles.listItem} 
                        ${styles.activeOutline}
                        `}
                style={liStyle(false)}
            >
                <MenuButton title={anchor.title} url={anchor.url + anchor.anchor} />
            </li>
        ));

    const renderChildPages = () =>
        page.childPages.map(childPage => (
            <PageGroup
                key={childPage.id}
                activePageHook={activePageHook}
                isDisabled={false}
                page={childPage}
            />
        ));

    return (
        <>
            <li
                className={`
                ${styles.listItem} 
                ${isActive ? `${styles.activePageButton} ${styles.activeOutline}` : ''} 
                ${isDisabled ? styles.disabled : ''}
                `}
                style={liStyle(!!page.childPages.length)}
            >
                {!!page.childPages.length && (
                    <TriangleBullet
                        isDisabled={isDisabled}
                        isOpen={isOpen}
                        onClick={handleBulletClick}
                    />
                )}
                <MenuButton
                    isDisabled={isDisabled}
                    title={page.title}
                    url={page.url}
                    onClick={handleButtonClick}
                />
            </li>
            {isOpen && isActive && renderAnchors()}
            {isOpen && renderChildPages()}
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
    activePageHook: PropTypes.array.isRequired,
    // Есть макет для отключенного состояния, но в задаче не указаны не указаны условия для отключения.
    // Сейчас можно отключить через прямое передание состояние в пропсы
    isDisabled: PropTypes.bool.isRequired
};

export default PageGroup;
