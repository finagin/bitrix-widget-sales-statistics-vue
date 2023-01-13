import { inject, reactive } from 'https://unpkg.com/vue@3.2/dist/vue.esm-browser.js';

const BASE_STATE = 'state';

function createState(name = BASE_STATE, defaultValue = {}) {
    return {
        install(app, options) {
            let globalPropertyName = options?.storeName || '$store';

            if (!/^\$/.test(globalPropertyName)) {
                globalPropertyName = '$' + globalPropertyName;
            }

            if (!app.config.globalProperties[globalPropertyName]) {
                app.config.globalProperties[globalPropertyName] = {};
            }

            app.config.globalProperties[globalPropertyName][name] = reactive(defaultValue);

            app.provide(name, app.config.globalProperties[globalPropertyName][name]);
        },
    }
}

function useState(name = BASE_STATE) {
    return inject(name);
}

const state = createState();

export { state, createState, useState };
