import React, { useState, useEffect, useCallback } from 'react';
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

    const handleBulletClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleButtonClick = useCallback(() => {
        setActivePage(page.id);
        setIsOpen(true);
    }, [setActivePage, page.id]);

    const liStyle = hasBullet => ({ paddingLeft: (hasBullet ? 32 : 44) + 16 * page.level });

    const renderAnchors = () =>
        page.anchors.map(anchor => (
            <li
                key={anchor.id}
                className={`
                        ${styles.listItem} 
                        ${styles.activeOutline}
                        `}
                style={liStyle(false)}
            >
                <MenuButton
                    isDisabled={isDisabled}
                    title={anchor.title}
                    url={anchor.url + anchor.anchor}
                />
            </li>
        ));

    const renderChildPages = () =>
        page.pages.map(childPage => (
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
                `}
                style={liStyle(!!page.pages.length)}
            >
                {!!page.pages.length && (
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
        pages: PropTypes.array.isRequired,
        anchors: PropTypes.array.isRequired,
        isInitiallyOpened: PropTypes.bool.isRequired,
        isInitiallyActive: PropTypes.bool.isRequired
    }).isRequired,
    activePageHook: PropTypes.array.isRequired,
    // Есть макет для отключенного состояния, но в задаче не указаны не указаны условия для отключения.
    // Сейчас можно отключить через прямое передание состояние в пропсы
    isDisabled: PropTypes.bool.isRequired
};

export default PageGroup;
