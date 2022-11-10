import { ref } from "../deps/vue.mjs";
import Configure from "../pages/Configure.mjs";
import Search from "../pages/Calculator.mjs";
import { attendees } from "./data.mjs";

export const routes = {
    '/': Search,
    '/configure': Configure,
};

export const routeMap = new WeakMap();
for (const route in routes) {
    routeMap.set(routes[route], route);
}

export const getRoute = (component) => '#' + (routeMap.get(component) || '/');

export const activeHash = ref(window.location.hash.slice(1) || '/');
export const activeRoute = ref(routes[activeHash.value]);

window.addEventListener('hashchange', () => {
    activeHash.value = window.location.hash.slice(1) || '/';
    activeRoute.value = routes[activeHash.value];
});

if (attendees.value.length === 0) window.location.hash = '/configure';