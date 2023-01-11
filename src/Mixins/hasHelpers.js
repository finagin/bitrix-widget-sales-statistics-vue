'use strict';

export const hasHelpers = {
    data() {
        return {
            started: new Date,
        }
    },
    methods: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },

        percent(x, y, e = 0) {
            return (x / y * 100).toFixed(e)
        },

        async fetch(url) {
            if (this.isDevelopment) {
                await new Promise((resolve) => setTimeout(() => resolve(), this.networkDelay));
            }

            return fetch(url);
        },

        async loading(fn) {
            this.debug('Loading...');
            this.loaded = false;
            await fn();
            this.debug('Loaded...');
            this.loaded = true;
        },

        debug() {
            if (this.isDevelopment) {
                const time = '[' + ((new Date) - this.started + '').padStart(10, ' ') + 'ms]';
                console.debug(time, ...arguments);
            }
        },
        cast(value) {
            if (value == +value) {
                // Take a look at ECMA 262, section 12.11, the second algorithm, 4.c.
                return +value;
            }

            switch (value) {
                case 'true':
                    return true;
                case 'false':
                    return false;
                case 'null':
                    return null;
                case undefined:
                    return true;
                default:
                    return decodeURI(value);
            }
        },
        getUrlParams(from, key, defaultValue) {
            const params = window.location[from]
                .slice(1)
                .split('&')
                .reduce((object, item) => {
                    const [key, value] = item.split('=');

                    return {...object, ...{[key]: this.cast(value)}};
                }, {});

            return key === null
                ? params
                : key in params
                    ? params[key]
                    : defaultValue;
        },
        getQuery(key = null, defaultValue = null) {
            return this.getUrlParams('search', key, defaultValue);
        },
        getHash(key = null, defaultValue = null) {
            return this.getUrlParams('hash', key, defaultValue);
        },
    },
    computed: {
        isDevelopment() {
            return location.origin.match('localhost')
                || this.getHash('development', false);
        },
        networkDelay() {
            const delay = this.random(2e2, 3e3);

            this.debug('Network delay: ' + delay + 'ms');

            return delay;
        },
    },
}
