export const appendChildren = (node, items, initallyOpenedPages = []) => {
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
        modifiedNode.childAnchors = modifiedNode.anchors.map(
            anchorName => items.anchors[anchorName]
        );
    }

    if (modifiedNode.pages) {
        modifiedNode.childPages = modifiedNode.pages.map(pageName =>
            appendChildren(items.pages[pageName], items, initallyOpenedPages)
        );
    }

    return modifiedNode;
};
