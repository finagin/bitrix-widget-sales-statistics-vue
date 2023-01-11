export const Row = {
    props: {
        replaceClassList: {
            type: Boolean,
            default: false,
        },
    },
    template: `
        <tr :class="classList">
            <slot/>
        </tr>
    `,
    computed: {
        emptyClassList() {
            return [];
        },
        defaultClassList() {
            return [
                // border block
                'border-b',
                'dark:border-gray-700',
                // background block
                'bg-white',
                'hover:bg-gray-50',
                'dark:bg-gray-600',
                'dark:hover:bg-gray-400',
            ];
        },
        classList() {
            return this.replaceClassList
                ? this.emptyClassList
                : this.defaultClassList;
        },
    },
}
