import {Component, register} from "../../core/component.js";
import AuthLayout from "../layouts/auth.layout.js";

class RegisterFormComponent extends Component {
    constructor() {
        super('login-form', {
            name: "",
            login: "",
            password: "",
            passwordPrompt: ""
        });
    }

    async afterCreate($template) {

        const $form = $template.querySelector('#register-form');

        $form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(this.state)
        });

        ['name', 'login', 'password', 'passwordPrompt'].forEach(field => {
            $form.querySelector(`input[name=${field}]`).addEventListener('input', e => {
                this.setState(field, e.target.value);
            })
        })
    }

    template() {
        return `
            <div>
                <div class="mb-5">
                    <h4 class="mb-4">Please sign up to continue</h4>

                    <form id="register-form">
                        <div class="d-flex justify-content-between">
                            <div class="form-group w-100 pr-2">
                                <input type="text" class="form-control "
                                       placeholder="Enter your full name" name="name" data-finp-name>
                                <span class="invalid-feedback" data-em-name>Error message</span>
                            </div>
                            <div class="form-group w-100 pl-2">
                                <input type="text" class="form-control " name="login" placeholder="Enter your login" data-finp-login>
                                <span class="invalid-feedback" data-em-login>Error message</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="form-group w-100 pr-2">
                                <input type="password" class="form-control" name="password" placeholder="Enter your password" data-finp-password>
                                <span class="invalid-feedback" data-em-password>Error message</span>
                            </div>
                            <div class="form-group w-100 pl-2">
                                <input type="password" class="form-control" name="passwordPrompt" placeholder="Confirm your password" data-finp-password2>
                                <span class="invalid-feedback" data-em-password2>Error message</span>
                            </div>
                        </div>

                        <button class="mt-4 btn btn-az-primary btn-block" data-signup-btn>Sign Up</button>
                    </form>
                </div>

                <div class="az-signin-footer">
                    <p>Already have an account? <a href="#login" data-signup-link-signin>Sign In</a></p>
                </div>
            </div>
        `;
    }
}

export const RegisterPage = async ($root) => {
    await register(AuthLayout, $root, {}, 'replace', async (slots) => {
        await register(RegisterFormComponent, slots.content, {});
    })
}
