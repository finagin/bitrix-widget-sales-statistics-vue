export const Popover = {
    props: {
        options: {
            type: Object,
            default: {
                placement: 'top',
                offset: 10,
                triggerType: 'hover',
                onShow: function () {
                },
                onHide: function () {
                },
            },
        },
    },
    template: `
        <div :id="triggerId" class="inline underline decoration-dashed cursor-context-menu">
            <slot />
        </div>
        <div data-popover :id="targetId" role="tooltip" class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
            <div class="p-3 space-y-2">
                <slot name="popover"/>
            </div>
            <div data-popper-arrow></div>
        </div>
    `,
    computed: {
        targetId() {
            return 'popoverTarget' + this.id;
        },
        triggerId() {
            return 'popoverTrigger' + this.id;
        },
    },

    created() {
        this.id = +(new Date) + (Math.floor(Math.random() * 1e3));
    },

    mounted() {
        this.flowbite = new window.Popover(
            document.getElementById(this.targetId),
            document.getElementById(this.triggerId),
            this.options,
        );
    },

}
