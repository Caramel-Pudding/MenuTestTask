import { appendChildren } from './appendChildren';

export const growFilteredTree = (items, stringToFind) => {
    const initialNodes = Object.values(items.pages)
        .filter(page => page.title.toLowerCase().includes(stringToFind.toLowerCase()))
        .map(page => ({ ...page, level: 0, pages: null }));

    return initialNodes.map(page => appendChildren(page, items));
};
