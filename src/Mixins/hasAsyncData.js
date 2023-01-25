'use strict';

import { useState } from '../State.js';

export const hasAsyncData = {

    data() {
        return {
            state: null,
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
                    this.state.domain = this.__source.domain;
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
                    ? './static/v1.api.mock.json'
                    : './events.php';
        },
        events() {
            return this.clone(
                this.__source.events
                    .reduce((carry, event) => {
                        const newEvent = {...event};

                        newEvent.managers = Object.entries({...event.managers})
                            .map(([id, managerData]) => {
                                const managerDescription = this.__source.managers.find((item) => item.id === parseInt(id));
                                const managerComputed = {
                                    count: managerData?.deals.length || 0,
                                    percent: this.percent(managerData.sum, managerData.plan, 2),
                                };

                                return {
                                    ...managerData,
                                    ...managerComputed,
                                    ...managerDescription,
                                };
                            });

                        return [...carry, newEvent];
                    }, [])
                    .map((event) => {
                        const or0 = (value, defaultValue = 0) => +value || defaultValue;

                        event.id = +event.id;
                        event.percent = this.cast(event.percent).toFixed(2);

                        const eventCounters = event.managers.reduce((result, manager) => ({
                            count: or0(result.count) + or0(manager.count),
                            sum: or0(result.sum) + or0(manager.sum),
                            deals: [...(result?.deals || []), ...(manager?.deals || [])]
                                .map(deal => ({...deal})),
                        }), {});

                        return {...event, ...eventCounters};
                    }),
            );
        },
        eventsFiltered() {
            const range = (key) => (event) => {
                if (!this.query[key]) {
                    return true;
                }

                let {from, to} = this.query[key];

                if (!from && !to) {
                    return true;
                }

                return from <= event[key] && event[key] <= to;
            };

            return this.clone(this.events)
                .filter((event) =>
                    this.query.event.length &&
                    this.query.event[0] === null ||
                    this.query.event.includes(event.id)
                )
                .map((event) => {
                    if (this.query.manager[0] === null) {
                        return event;
                    }

                    event.managers = event.managers
                        .reduce((result, manager) => {
                            if (this.query.manager.includes(manager.id)) {
                                result.push(manager)
                            }

                            return result;
                        }, [])

                    return event;
                })
                .filter((event) => {
                    if (!this.query.date) {
                        return true;
                    }

                    const {from, to} = this.query.date,
                        date = new Date(event.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3/$2/$1'));

                    if (from && new Date(from) > date) {
                        return false;
                    }

                    if (to && new Date(to) < date) {
                        return false;
                    }

                    return true;

                })
                .filter((event) => this.query.manager === null || event.managers.length)
                .filter(range('count'))
                .filter(range('sum'))
                .filter(range('plan'))
                .filter(range('percent'));
        },
        eventsTotal() {
            const defaults = (event) => ({name: 'Итого:', ...event});

            return defaults(this.eventsFiltered.reduce((result, event) => ({
                count: result.count + +event.count,
                sum: result.sum + +event.sum,
                plan: result.plan + +event.plan,
                percent: this.percent(result.sum + +event.sum, result.plan + +event.plan, 2),
                deals: [...result.deals, ...(event?.deals || [])],
            }), {
                count: 0,
                sum: 0,
                plan: 0,
                deals: [],
            }));
        },
        managersTotal() {
            return this.eventsFiltered.reduce((carry, event) => {
                event.managers.forEach(manager => {
                    carry[manager.id] = {
                        name: manager.name,
                        count: (carry[manager.id] ? carry[manager.id].count : 0) + +manager.count,
                        sum: (carry[manager.id] ? carry[manager.id].sum : 0) + +manager.sum,
                        plan: (carry[manager.id] ? carry[manager.id].plan : 0) + +manager.plan,
                        percent: this.percent(
                            (carry[manager.id] ? carry[manager.id].sum : 0) + +manager.sum,
                            (carry[manager.id] ? carry[manager.id].plan : 0) + +manager.plan,
                            2,
                        ),
                        deals: [...(carry[manager.id]?.deals || []), ...(manager?.deals || [])],
                    };
                });

                return carry;
            }, {});
        },
        eventOptions(state) {
            let stateEvents = state.__source.events ?? [];
            const defaults = (obj) => ({...{description: '', active: false, conflict: false}, ...obj});

            return [
                defaults({key: 'Все', value: null, active: true, conflict: true}),
                ...stateEvents.map(event => defaults({
                        key: event.name,
                        value: parseInt(event.id),
                })),
            ];
        },
        managerOptions(state) {
            let stateManagers = state.__source.managers ?? [];
            const defaults = (obj) => ({...{description: '', active: false, conflict: false}, ...obj});

            return [
                defaults({key: 'Все', value: null, active: true, conflict: true}),
                ...stateManagers.map(event => defaults({
                    key: event.name,
                    value: parseInt(event.id),
                })),
            ];
        },
        countBoundaryValues(state) {
            return this.boundaryValuesOf(state.events ?? [], 'count');
        },
        sumBoundaryValues(state) {
            return this.boundaryValuesOf(state.events ?? [], 'sum');
        },
        planBoundaryValues(state) {
            return this.boundaryValuesOf(state.events ?? [], 'plan');
        },
        percentBoundaryValues(state) {
            return this.boundaryValuesOf(state.events ?? [], 'percent');
        },
    },

    async mounted() {
        this.state = useState();
        await this.fetchData();
    },

}
