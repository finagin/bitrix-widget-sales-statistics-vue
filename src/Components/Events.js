import { Flag } from './Icon/Flag.js';
import { hasDealPopover } from '../Mixins/hasDealPopover.js';
import { TableRow as TRow, TableColumn as TCol } from './Table.js';

export const Events = {
    mixins: [hasDealPopover],
    components: {Flag, TRow, TCol},
    props: {
        event: {
            type: Object,
            required: true,
        },
        isTotal: {
            type: Boolean,
            default: false,
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
                <TCol>
                    <Popover>
                        {{ event.count }}
                        <template #popover>
                            <p class="font-black">Сделки:</p>
                            <ol class="ml-6 list-decimal">
                                <li v-for="deal in event.deals">
                                    <a :href="dealUrl(deal.id)" target="_blank" class="underline text-grey-200 hover:text-grey-50">{{ deal.name }}</a>
                                </li>
                            </ol>
                        </template>
                    </Popover>
                </TCol>
                <TCol>{{ event.sum }}</TCol>
                <TCol>{{ event.plan }}</TCol>
                <TCol>{{ event.percent }}%</TCol>
                <TCol>{{ event.date }}</TCol>
                <TCol class="p-4 w-4"><flag v-if="event.active !== undefined" :active="event.active" /></TCol>
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
            const defaults = (extra) => ([...[
                'cursor-pointer',
                // text block
                'font-medium',
                'whitespace-nowrap',

                'dark:border-gray-700',
            ], ...extra]);


            return defaults(this.isTotal
                ? [
                    // text block
                    'text-white',
                    'dark:text-gray-900',
                    // background block
                    'bg-blue-700',
                    'hover:bg-blue-600',
                    'dark:bg-blue-100',
                    'dark:hover:bg-blue-200',
                ] : [
                    // text block
                    'text-gray-900',
                    'dark:text-white',
                    // background block
                    'bg-gray-100',
                    'hover:bg-gray-200',
                    'dark:bg-gray-700',
                    'dark:hover:bg-gray-500',
                ],
            );
        },
    },
};
