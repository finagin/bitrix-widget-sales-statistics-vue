export const Dropdown = {
    props: {
        modelValue: Number,
        options: {type: Array, required: true},
    },
    emits: ['update:modelValue'],
    data() {
        return {flowbite: null}
    },
    template: `
        <button :id="buttonId" :data-dropdown-toggle="menuId" type="button" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{ current }}
        </button>
        <!-- Dropdown menu -->
        <div :id="menuId" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="buttonId">
                <li v-for="option in options">
                    <a href="#"
                       @click="selectItem(option)"
                       class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {{ option.key }}
                    </a>
                </li>
            </ul>
        </div>
    `,
    methods: {
        selectItem(option) {
            this.$emit('update:modelValue', option.value);
            this.flowbite.hide();
        },
    },
    computed: {
        current() {
            const current = this.options.filter(option => {
                return option.value == this.modelValue;
            });

            if (current.length) {
                return current[0].key;
            }

            return 'Select';
        },
        buttonId() {
            return 'dropdownButton' + this.id
        },
        menuId() {
            return 'dropdownMenu' + this.id
        },
    },
    created() {
        this.id = +(new Date) + (Math.floor(Math.random() * 1e3));
    },
    mounted() {
        this.flowbite = new window.Dropdown(
            document.getElementById(this.menuId),
            document.getElementById(this.buttonId),
        );
    },
}
