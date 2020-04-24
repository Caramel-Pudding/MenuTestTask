import axios from 'axios';
import { menuLocalHost } from '../consts/hosts';

export const fetchMenuData = () =>
    Promise.all([
        axios.get(`${menuLocalHost}/entities`).then(res => res.data),
        axios.get(`${menuLocalHost}/topLevelIds`).then(res => res.data)
    ]);
