import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import styles from './index.module.css';

const AnchorItem = ({ anchor, wrapperClass }) => {
    return (
        <li className={`${styles.container} ${wrapperClass}`}>
            <Link title={anchor.title} url={anchor.url + anchor.anchor} />
        </li>
    );
};

AnchorItem.propTypes = {
    anchor: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        anchor: PropTypes.string.isRequired
    }).isRequired,
    wrapperClass: PropTypes.string.isRequired
};

export default AnchorItem;
