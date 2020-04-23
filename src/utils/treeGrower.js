export const growATree = ({ pages, anchors }) => {
    const tree = Object.values(pages).filter(page => page.level === 0);
    const appendChildren = node => {
        if (node.anchors) {
            node.childAnchors = [];
            node.anchors.forEach(childAnchor => {
                node.childAnchors.push(anchors[childAnchor]);
            });
        }
        if (node.pages) {
            node.childPages = [];
            node.pages.forEach(childPage => {
                node.childPages.push(pages[childPage]);
                appendChildren(pages[childPage]);
            });
        }
    };
    tree.forEach(page => appendChildren(page));
    return tree;
};
