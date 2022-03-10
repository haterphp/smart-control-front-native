import {Component} from "../core/component.js";

export const Layout = class extends Component {
    constructor() {
        super('layout');
    }

    template() {
        return `
            <div id="child-container" class="container"></div>
        `
    }
}
