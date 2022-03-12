// import './router.js';
import {register} from "./core/component.js";
import {Layout} from "./app/layout.js";
import {Greeting} from "./app/components/greeting.js";

register(Layout, document.querySelector('#root'), {}, 'replace', async ({content}) => {
    await register(Greeting, content, { name: "Voice" }, 'append')
    const greeting = await register(Greeting, content, { name: "Vlad" }, 'append');
    setInterval(() => {
        greeting.updateProps('name', (Math.random() + 1).toString(36).substring(2, 10));
    }, 5000);
})
