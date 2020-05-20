import { MENU_JSON_LOCALHOST } from '../consts/hosts';

export const fetchMenuData = () =>
    Promise.all([
        fetch(`${MENU_JSON_LOCALHOST}/entities`).then(response => response.json()),
        fetch(`${MENU_JSON_LOCALHOST}/topLevelIds`).then(response => response.json())
    ]);
