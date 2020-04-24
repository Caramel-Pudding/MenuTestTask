import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TriangleBullet from '../TriangleBullet';
import MenuButton from '../MenuButton';
import styles from './index.module.css';

const PageItem = ({ page }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    if (isOpen) {
        return (
            <li>
                <ul className={styles.headerAndAnchors}>
                    <li className={styles.listItem}>
                        <TriangleBullet isExpanded={isOpen} onClick={toggleIsOpen} />
                        <MenuButton
                            title={page.title}
                            url={page.url}
                            onClick={() => toggleIsOpen()}
                        />
                    </li>
                    {page.childAnchors.map(anchor => (
                        <li key={anchor.id} className={styles.listItem}>
                            <MenuButton title={anchor.title} url={anchor.url + anchor.anchor} />
                        </li>
                    ))}
                </ul>
                <ul className={styles.childPages}>
                    {page.childPages.map(childPage => (
                        <PageItem key={childPage.id} page={childPage} />
                    ))}
                </ul>
            </li>
        );
    }
    return (
        <li className={styles.listItem}>
            {!!page.childPages.length && (
                <TriangleBullet isExpanded={isOpen} onClick={toggleIsOpen} />
            )}
            <MenuButton
                title={page.title}
                url={page.url}
                onClick={() => page.childPages.length && toggleIsOpen()}
            />
        </li>
    );
};

PageItem.propTypes = {
    page: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        // Очень хотелось бы сказать, что childPages - arrayOf(page)
        childPages: PropTypes.array.isRequired,
        childAnchors: PropTypes.array.isRequired
    }).isRequired
};

export default PageItem;
