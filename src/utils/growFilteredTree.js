import { appendChildren } from './appendChildren';

export const growFilteredTree = (items, stringToFind) => {
    const initialNodes = Object.values(items.pages).filter(page =>
        page.title.toLowerCase().includes(stringToFind.toLowerCase())
    );
    return initialNodes.map(page => appendChildren(page, items));
};
