import {Component} from "../core/component.js";

export const Layout = class extends Component {
    constructor() {
        super('layout');
    }

    slots($dom) {
        return {
            content: $dom
        }
    }

    template() {
        return `
            <div id="child-container" class="container"></div>
        `
    }
}
