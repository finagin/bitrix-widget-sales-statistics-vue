import { Column as TableColumn } from './Column';
import { Row as TableRow } from './Row';

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

export { Table, TableColumn, TableRow };
