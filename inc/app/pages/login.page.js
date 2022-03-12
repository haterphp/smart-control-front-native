import {Component, register} from "../../core/component.js";
import AuthLayout from "../layouts/auth.layout.js";

class LoginFormComponent extends Component {
    constructor() {
        super('login-form', {
            login: "",
            password: ""
        });
    }

    async afterCreate($template) {

        const $form = $template.querySelector('#login-form');

        $form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(this.state)
        });

        ['login', 'password'].forEach(field => {
            $form.querySelector(`input[name=${field}]`).addEventListener('input', e => {
                this.setState(field, e.target.value);
            })
        });
    }

    template() {
        return `
            <div>
                <div class="mb-5">
                    <h4 class="mb-4">Please sign in to continue</h4>

                    <form id="login-form">
                        <div class="form-group">
                            <input type="text" class="form-control" name="login" placeholder="Enter your login" data-finp-login>
                            <span class="invalid-feedback" data-em-login>Error message</span>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="password" placeholder="Enter your password" data-finp-password>
                            <span class="invalid-feedback" data-em-password>Error message</span>
                        </div>

                        <button class="mt-4 btn btn-az-primary btn-block" data-signin-btn>Sign In</button>
                    </form>
                </div>

                <div class="az-signin-footer">
                    <p>Don't have an account? <a href="#register" data-signin-link-signup>Create an Account</a></p>
                </div>
            </div>
        `;
    }
}

export const LoginPage = async ($root) => {
    await register(AuthLayout, $root, {}, 'replace', async (slots) => {
        await register(LoginFormComponent, slots.content, {});
    })
}
