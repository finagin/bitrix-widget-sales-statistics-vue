import { Icon } from './Icon.js';
import { TableRow, TableColumn } from './Table.js';

export const Managers = {
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
                {{ manager.name }}
            </TCol>
            <TCol>{{ manager.count }}</TCol>
            <TCol>{{ manager.sum }}</TCol>
            <TCol>{{ manager.plan }}</TCol>
            <TCol>{{ manager.percent }}%</TCol>
            <TCol></TCol>
            <TCol></TCol>
        </TRow>
    `,
}
