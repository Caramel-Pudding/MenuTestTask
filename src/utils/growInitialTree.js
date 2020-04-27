import { findParents } from './findParents';
import { appendChildren } from './appendChildren';

export const growInitialTree = (items, topLevelIds, url) => {
    const initialNodes = topLevelIds.map(id => items.pages[id]);

    const initallyOpenedPages = findParents(items.pages, url);

    return initialNodes.map(page => appendChildren(page, items, initallyOpenedPages));
};
