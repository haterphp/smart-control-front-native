import {CustomEventManager} from "./event.js";

export class Component {
    constructor(name, state = {}) {
        this.event = new CustomEventManager(name);
        this.events = [];
        this.state = this.#createStateObserver(state);
        this.props = {};
        this.dom = null;
    }

    #makeObserverName(name) {
        return ['state', name].join('/');
    }

    #createStateObserver(state) {
        return new Proxy(state, {
            set: (target, p, value) => {
                target[p] = value;
                this.event.dispatch(this.#makeObserverName(p), {target, prop: p, value})
                return true;
            }
        })
    }

    setState(name, value) {
        this.state[name] = value;
        return this;
    }

    registerObserver(name, callback) {
        this.event.subscribe(this.#makeObserverName(name), callback)
        this.events = [...this.events, {name, callback}]
    }

    _appendProps(props) {
        this.props = props;
    }

    #create() {
        return new DOMParser().parseFromString(this.template().trim(), 'text/html').querySelector('body').firstChild
    }

    async _render($container, mode) {
        await this.beforeCreate();
        const $dom = this.#create();
        await this.afterCreate($dom);
        this.dom = $dom;
        if ($container) pushToDom($container, $dom, mode);
    };

    async beforeCreate() {
    }

    async afterCreate($template) {
    }

    slots($template) {
        return {}
    }

    async _registerChildTrigger(childFn) {
        return await childFn(this.slots(this.dom));
    }

    updateProps(name, value) {
        this.props[name] = value;
        this.event.dispatch(this.#makeObserverName(name), {prop: name, target: this.props, value})
        return this;
    }

    template() {
        return ""
    };

    unmount() {
    }

    _unmount() {
        this.events.forEach(({name, callback}) => this.event.destroy(this.#makeObserverName(name), callback));
    }
}

export const pushToDom = ($container, $component, mode) => {
    if (mode === 'replace') $container.innerHTML = "";
    $container.append($component);
}

export const register = async (
    Component,
    $container,
    props = {},
    mode = "replace",
    childFn = (slots) => {
    },
) => {
    const c = new Component();
    c._appendProps(props);
    await c._render($container, mode);
    if (childFn) await c._registerChildTrigger(childFn);
    return c;
}
