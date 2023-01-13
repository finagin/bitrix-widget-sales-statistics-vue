import { Column as TableColumn } from './Table/Column.js';
import { Row as TableRow } from './Table/Row.js';
import { Skeleton as TableSkeleton } from './Table/Skeleton.js';

const Table = {
    components: {TableColumn, TableRow},
    template: `
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead :class="classList">
                <TableRow replaceClassList :class="classList">
                    <slot name="headers"/>
                </TableRow>
            </thead>
            <tbody>
                <slot/>
            </tbody>
        </table>
        <slot name="footer"/>
    `,
    computed: {
        classList() {
            return [
                // text block
                'uppercase',
                'text-xs',
                'text-gray-700',
                'dark:text-gray-400',
                // background block
                'bg-gray-300',
                'hover:bg-gray-300',
                'dark:bg-gray-800',
                'dark:hover:bg-gray-800',

            ];
        },
    },
}

export { Table, TableColumn, TableRow, TableSkeleton };
