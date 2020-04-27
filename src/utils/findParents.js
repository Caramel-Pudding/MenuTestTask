export const findParents = (nodes, url) => {
    const parentsHappilyReunitedWithChildrenIds = [];

    const initialNode = nodes && Object.values(nodes).find(node => node.url === url);

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
