export const findParents = (nodes, url) => {
    const initialNode = url ? Object.values(nodes).find(node => node.url === url) : null;
    const parentsHappilyReunitedWithChildrenIds = [];

    const addWithParent = node => {
        parentsHappilyReunitedWithChildrenIds.push(node.id);

        if (node.parentId) {
            addWithParent(nodes[node.parentId]);
        }
    };

    if (initialNode) {
        addWithParent(initialNode);
    }

    return parentsHappilyReunitedWithChildrenIds;
};
