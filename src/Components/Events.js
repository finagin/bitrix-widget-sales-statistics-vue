import { Flag } from './Icon/Flag.js';
import { TableRow as TRow, TableColumn as TCol } from './Table.js';

export const Events = {
    name: 'Events',
    components: {Flag, TRow, TCol},
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            collapsed: true,
        }
    },
    template: `
        <template v-if="true">
            <TRow @click="collapsed = !collapsed" replaceClassList :class="classList">
                <TCol type="th" scope="row">{{ event.name }}</TCol>
                <TCol>{{ event.count }}</TCol>
                <TCol>{{ event.sum }}</TCol>
                <TCol>{{ event.plan }}</TCol>
                <TCol>{{ event.percent }}%</TCol>
                <TCol>{{ event.date }}</TCol>
                <TCol class="p-4 w-4"><flag :active="event.active" /></TCol>
            </TRow>
            <transition-group name="fade">
                <template v-if="!collapsed">
                    <slot />
                </template>
            </transition-group>
        </template>
    `,
    computed: {
        classList() {
            return [
                'cursor-pointer',
                // text block
                'font-medium',
                'text-gray-900',
                'dark:text-white',
                'whitespace-nowrap',

                'dark:border-gray-700',
                // background block
                'bg-gray-100',
                'hover:bg-gray-200',
                'dark:bg-gray-700',
                'dark:hover:bg-gray-500 '
            ];
        },
    },
};
