export const growATree = ({ pages, anchors }, topLevelIds) => {
    const tree = Object.values(pages).filter(page => topLevelIds.includes(page.id));

    const appendChildren = node => {
        const modifiedNode = { ...node, childPages: [], childAnchors: [] };

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
