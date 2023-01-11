import { TableRow, TableColumn } from '../../Table';

export const Skeleton = {
    name: 'Skeleton',
    components: {TRow: TableRow, TCol: TableColumn},
    props: {
        config: {
            type: Object,
            required: true,
        },
    },
    template: `
        <TRow class="event animate-pulse">
            <TCol v-for="item in config.items" :type="item.type || config.default.type">
                <div :class="classList(item.color, item.width)"></div>
            </TCol>
        </TRow>
    `,
    methods: {
        classList(color, width) {
            return [
                'rounded-full',
                'bg-gray-' + (color || this.config.default.color),
                'dark:bg-gray-' + ((800 - color) || (800 - this.config.default.color)),
                'dark:bg-gray-800',
                'dark:hover:bg-gray-600',
                'mb-2.5',
                'h-2.5',
                'w-' + (width || this.config.default.width),
            ];
        },
    },
}
