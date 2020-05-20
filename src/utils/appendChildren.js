export const appendChildren = (node, items, parentNode = null) => {
    const modifiedNode = {
        ...node,
        anchors: node.anchors || [],
        pages: node.pages || [],
        parentNode: null
    };

    modifiedNode.parentNode = parentNode;

    modifiedNode.anchors = modifiedNode.anchors.map(anchorName => items.anchors[anchorName]);

    modifiedNode.pages = modifiedNode.pages.map(pageName =>
        appendChildren(items.pages[pageName], items, modifiedNode)
    );

    return modifiedNode;
};
