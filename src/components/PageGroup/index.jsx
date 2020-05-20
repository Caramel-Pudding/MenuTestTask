import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TriangleBullet from '../TriangleBullet';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const PageGroup = React.memo(({ page, isDisabled, initallyOpenedPages, activePageUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isActive = page.url === activePageUrl;
    useEffect(() => {
        if (initallyOpenedPages.has(page.id)) {
            setIsOpen(true);
        }
    }, [activePageUrl, initallyOpenedPages, page.id]);

    const menuRef = useRef(null);
    useEffect(() => {
        if (menuRef.current && isActive) {
            menuRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [activePageUrl, isActive]);

    const handleBulletClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleButtonClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    const liStyle = hasBullet => ({ paddingLeft: (hasBullet ? 32 : 46) + 16 * page.level });

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
                activePageUrl={activePageUrl}
                initallyOpenedPages={initallyOpenedPages}
                isDisabled={false}
                page={childPage}
            />
        ));

    return (
        <>
            <li
                ref={menuRef}
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
                    firstChildUrl={
                        page.selectFirstChildOnClick && page.pages[0] && page.pages[0].url
                    }
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
        selectFirstChildOnClick: PropTypes.bool,
        pages: PropTypes.array.isRequired,
        anchors: PropTypes.array.isRequired
    }).isRequired,
    // Есть макет для отключенного состояния, но в задаче не указаны не указаны условия для отключения.
    // Сейчас можно отключить через прямое передание состояние в пропсы
    isDisabled: PropTypes.bool.isRequired,
    initallyOpenedPages: PropTypes.object.isRequired,
    activePageUrl: PropTypes.string
};

export default PageGroup;
