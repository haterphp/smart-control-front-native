import {Component, register} from "../../core/component.js";
import {Layout} from "../layout.js";

export const Greeting = class extends Component {
    constructor() {
        super('greeting', { message: null });
    }

    async beforeCreate(){
        await new Promise((res) => {
            setTimeout(() => {
                this.setState("message", "Hello");
                res(true);
            }, 1000);
        })
    }

    async afterCreate($template){

        $template.addEventListener('click', () => {
            this.setState("message", (Math.random() + 1).toString(36).substring(2))
        })

        this.registerObserver('message', (e) => {
            const {name} = this.props;
            $template.innerHTML = `${e.detail.value} ${name}`
        })

        this.registerObserver('name', (e) => {
            const {message} = this.state;
            $template.innerHTML = `${message} ${e.detail.value}`
        })
    }

    template() {
        const {message} = this.state;
        const {name} = this.props;

        return `
            <h1>${message} ${name}</h1>
        `
    }
}
