export const Column = {
    props: {
        type: {
            type: String,
            default: 'td',
        },
    },
    template: `
        <component :is="type" class="py-4 px-6" scope="col">
            <slot/>
        </component>
    `,
}
