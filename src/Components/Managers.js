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
    },
    template: `
        <TRow class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <TCol class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <icon class="fa-user-circle-o mr-2" />
                <a class="underline text-gray-800 hover:text-grey-600" :href="url" target="_blank">
                    {{ manager.name }}
                </a>
            </TCol>
            <TCol>
                <Popover>
                    {{ manager.count }}
                    <template #popover>
                        <p>Сделки:</p>
                        <ul>
                            <li v-for="deal in manager.deals" class="flex items-center">
                                <a :href="dealUrl(deal.id)" target="_blank" class="underline text-grey-200 hover:text-grey-50">{{ deal.name }}</a>
                            </li>
                        </ul>
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

            return 'https://' + state.domain + '/company/personal/user/' + this.manager.id
        },
    },
}
