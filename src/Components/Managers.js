import { useState } from '../State.js';
import { hasDealPopover } from '../Mixins/hasDealPopover.js';
import { Icon } from './Icon.js';
import { TableRow, TableColumn } from './Table.js';

export const Managers = {
    mixins: [hasDealPopover],
    components: {Icon, TRow: TableRow, TCol: TableColumn},
    props: {
        manager: {
            type: Object,
            required: true,
        },
        isTotal: {
            type: Boolean,
            default: false,
        },
    },
    template: `
        <TRow :class="classList">
            <TCol>
                <icon class="fa-user-circle-o mr-2" />
                <a :class="aClassList" :href="url" target="_blank">
                    {{ manager.name }}
                </a>
            </TCol>
            <TCol>
                <Popover>
                    {{ manager.count }}
                    <template #popover>
                        <p class="font-black">Сделки:</p>
                        <ol class="ml-6 list-decimal">
                            <li v-for="deal in manager.deals">
                                <a :href="dealUrl(deal.id)" target="_blank" class="underline text-grey-200 hover:text-grey-50">{{ deal.name }}</a>
                            </li>
                        </ol>
                    </template>
                </Popover>
            </TCol>
            <TCol>{{ manager.sum }}</TCol>
            <TCol>{{ manager.plan }}</TCol>
            <TCol>{{ manager.percent }}%</TCol>
            <TCol></TCol>
            <TCol></TCol>
        </TRow>
    `,
    computed: {
        url() {
            const state = useState();

            return 'https://' + state.domain + '/company/personal/user/' + this.manager.id + '/';
        },
        classList() {
            const defaults = (extra) => ([...[
                'font-medium',
                'whitespace-nowrap',
            ], ...extra]);

            return defaults(this.isTotal
                ? [
                    'border-blue-800',

                    'text-white',
                    'dark:text-gray-900',

                    'bg-blue-500',
                    'hover:bg-blue-400',
                    'dark:bg-blue-200',
                    'dark:hover:bg-blue-300',
                ] : [
                    'dark:border-gray-700',

                    'text-gray-900',
                    'dark:text-white',
                ],
            );
        },
        aClassList() {
            return this.isTotal
                ? ['underline', 'text-white', 'hover:text-grey-100']
                : ['underline', 'text-gray-800', 'hover:text-grey-600'];
        },
    },
}
