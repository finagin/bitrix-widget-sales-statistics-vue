"use strict";

export const hasAsyncData = {

    data() {
        return {
            loaded: false,
            __source: {
                domain: '',
                events: [],
                managers: [],
            },
        };
    },

    methods: {
        async fetchData() {
            await this.loading(async () => {
                this.debug('Fetching data from: ' + this.apiUrl);

                const response = await this.fetch(this.apiUrl);

                if (response.ok) {
                    this.__source = await response.json();
                }
            })
        },
    },

    computed: {
        apiUrl() {
            const url = this.getHash('apiUrl');

            return url !== null
                ? url
                : this.isDevelopment
                    ? './static/test.json'
                    : './events.php';
        },
        events() {
            return this.__source.events
                .map((event) => {
                    event.managers = event.managers
                        .map((managerData) => {
                            const managerDescription = this.__source.managers.find((item) => item.id === managerData.id);

                            const managerPercent = {
                                percent: this.percent(managerData.sum, managerData.plan, 2),
                            };

                            return {
                                ...managerData,
                                ...managerPercent,
                                ...managerDescription,
                            };
                        });

                    return event;
                })
                .map((event) => {
                    const or0 = (value, defaultValue = 0) => value || defaultValue;

                    const eventCounters = event.managers.reduce((result, manager) => ({
                        count: or0(result.count) + or0(manager.count),
                        sum: or0(result.sum) + or0(manager.sum),
                        plan: or0(result.plan) + or0(manager.plan),
                        percent: this.percent(
                            or0(result.sum) + or0(manager.sum),
                            or0(result.plan) + or0(manager.plan),
                            2,
                        ),
                    }), {});

                    return {...event, ...eventCounters};
                });
        },
    },

    async mounted() {
        await this.fetchData();
    },

}
