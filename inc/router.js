import {Router} from "./core/router.js";

const openCallback = async (target) => {
    document.querySelector('#root').innerHTML = target.component;
}
const notFoundCallback = async () => {
    document.querySelector('#root').innerHTML = 'page not found';
}

const router = [
    { url: '/', component: "index" },
    { url: 'login', component: "login" }
];

Router(
    router,
    openCallback,
    notFoundCallback
)
