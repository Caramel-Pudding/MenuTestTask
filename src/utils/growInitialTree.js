import { appendChildren } from './appendChildren';

export const growInitialTree = (items, topLevelIds) => {
    const initialNodes = topLevelIds.map(id => items.pages[id]);
    return initialNodes.map(page => appendChildren(page, items));
};
