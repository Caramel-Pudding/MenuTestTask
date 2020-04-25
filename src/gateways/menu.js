import axios from 'axios';
import { MENU_JSON_LOCALHOST } from '../consts/hosts';

export const fetchMenuData = () =>
    Promise.all([
        axios.get(`${MENU_JSON_LOCALHOST}/entities`).then(res => res.data),
        axios.get(`${MENU_JSON_LOCALHOST}/topLevelIds`).then(res => res.data)
    ]);
