import {Component} from "../../core/component.js";

const AuthLayout = class extends Component {
    constructor() {
        super('auth-layout');
    }

    slots($template) {
        return {
            content: $template.querySelector('#content-container')
        }
    }

    template() {
        return `
            <div class="vh-100 d-flex align-items-center">
                <div class="row w-100">
                    <div class="col-3 mx-auto">
                        <div class="card">
                            <div class="card-body p-5">
                                <h1 class="az-logo mb-5">Smart control</h1>
                                <div id="content-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

export default AuthLayout;
