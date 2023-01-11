import { Icon } from '../index.js';

export const Flag = {
    components: {Icon},
    props: ['active'],
    template: `
        <icon :class="flagClass" />
    `,
    computed: {
        flagClass() {
            return this.active ? 'fa-flag' : 'fa-flag-o';
        },
    },
};
