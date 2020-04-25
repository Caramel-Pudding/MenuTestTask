import { findParents } from './findParents';

export const growATree = ({ pages, anchors }, topLevelIds, url) => {
    const tree = Object.values(pages).filter(page => topLevelIds.includes(page.id));

    const initallyOpenedPages = findParents(pages, url);

    const appendChildren = node => {
        const modifiedNode = {
            ...node,
            childPages: [],
            childAnchors: [],
            isInitiallyOpened: false,
            isInitiallyActive: false
        };

        if (initallyOpenedPages.length) {
            modifiedNode.isInitiallyOpened = initallyOpenedPages.includes(modifiedNode.id);
            modifiedNode.isInitiallyActive = modifiedNode.id === initallyOpenedPages[0];
        }

        if (modifiedNode.anchors) {
            modifiedNode.childAnchors = modifiedNode.anchors.map(anchorName => anchors[anchorName]);
        }

        if (modifiedNode.pages) {
            modifiedNode.childPages = modifiedNode.pages.map(pageName =>
                appendChildren(pages[pageName])
            );
        }

        return modifiedNode;
    };

    return tree.map(page => appendChildren(page));
};
