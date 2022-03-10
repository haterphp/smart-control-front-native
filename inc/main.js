// import './router.js';
import {register} from "./core/component.js";
import {Layout} from "./app/layout.js";
import {Greeting} from "./app/components/greeting.js";

register(Layout, document.querySelector('#root'), {}, 'replace', ($dom) => {
    register(Greeting, $dom, { name: "Voice" }, 'append')
    register(Greeting, $dom, { name: "Vlad" }, 'append')
})
