const findTreeNodeByUrl = (nodes, url) => {
    if (!url) {
        return null;
    }
    let resultNode;
    for (let i = 0; !resultNode && i < nodes.length; i++) {
        if (nodes[i].url === url) {
            return nodes[i];
        }
        resultNode = findTreeNodeByUrl(nodes[i].pages, url);
    }
    return resultNode;
};

export const findNodeParentsByUrl = (nodes, url) => {
    const parentsHappilyReunitedWithChildrenIds = new Map();

    const initialNode = findTreeNodeByUrl(nodes, url);

    const addWithParent = node => {
        parentsHappilyReunitedWithChildrenIds.set(node.id, true);

        if (node.parentNode) {
            addWithParent(node.parentNode);
        }
    };
    if (initialNode) {
        addWithParent(initialNode);
    }

    return parentsHappilyReunitedWithChildrenIds;
};
