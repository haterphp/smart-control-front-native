import {Router} from "./core/router.js";
import {LoginPage} from "./app/pages/login.page.js";
import {RegisterPage} from "./app/pages/register.page.js";


const $root = document.querySelector('#root')

const openCallback = async (target) => {
    if(target.component) target.component($root);
}
const notFoundCallback = async () => {
    $root.innerHTML = 'page not found';
}

const router = [
    {url: '/', component: null},
    {url: 'login', component: LoginPage},
    {url: 'register', component: RegisterPage},
];

Router(
    router,
    openCallback,
    notFoundCallback,
)
