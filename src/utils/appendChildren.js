export const appendChildren = (node, items, initallyOpenedPages = []) => {
    const modifiedNode = {
        ...node,
        anchors: node.anchors || [],
        pages: node.pages || [],
        isInitiallyOpened: false,
        isInitiallyActive: false
    };

    if (initallyOpenedPages.length) {
        modifiedNode.isInitiallyOpened = initallyOpenedPages.includes(modifiedNode.id);
        modifiedNode.isInitiallyActive = modifiedNode.id === initallyOpenedPages[0];
    }

    modifiedNode.anchors = modifiedNode.anchors.map(anchorName => items.anchors[anchorName]);

    modifiedNode.pages = modifiedNode.pages.map(pageName =>
        appendChildren(items.pages[pageName], items, initallyOpenedPages)
    );

    return modifiedNode;
};
