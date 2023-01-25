const deep = (handler) => ({handler, deep: true});

export const Dropdown = {
    props: {
        modelValue: Array,
        options: {type: Array, required: true},
    },
    emits: ['update:modelValue'],
    data() {
        return {
            flowbite: null,
            localOptions: [],
        }
    },
    template: `
        <button
            :id="buttonId"
            :data-dropdown-toggle="menuId"
            type="button"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis"
        >
            {{ selected }}
        </button>
        <!-- Dropdown menu -->
        <div :id="menuId" class="hidden z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="buttonId">
                <li v-for="(option, index) in localOptions">
                    <div class="flex p-2 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                :id="optionInputId(index)"
                                type="checkbox"
                                v-model="option.active"
                                v-on:change="update(option)"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                :aria-describedby="optionHelperId(index)"
                            >
                        </div>
                        <div class="ml-2 w-full text-sm">
                            <label :for="optionInputId(index)" class="font-medium text-gray-900 dark:text-gray-300">
                                <div>{{ option.key }}</div>
                                <p :id="optionHelperId(index)" class="text-xs font-normal text-gray-500 dark:text-gray-300">
                                    {{ option.description }}
                                </p>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
    methods: {
        update(byOption) {
            switch (true) {
                case byOption.value === null:
                case byOption.conflict && byOption.active:
                    this.localOptions = this.localOptions
                        .map((option) => ({...option, active: option.key === byOption.key}));

                    console.log(this.localOptions)
                    break;
                case byOption.active:
                    this.localOptions = this.localOptions
                        .map((option) => ({...option, active: (option.conflict ? false : option.active)}));
                    break;
                case !byOption.active && this.localOptions.filter((option) => option.active).length === 0:
                    this.localOptions = this.localOptions
                        .map(option => ({...option, active: option.value === null}))

                    break;
            }

            this.$emit('update:modelValue', this.localOptions.filter(option => option.active).map(option => option.value));
        },
        optionInputId(index) {
            return 'dropdown-' + this.id + '-checkbox-' + index;
        },
        optionHelperId(index) {
            return 'dropdown-' + this.id + '-checkbox-helper-' + index;
        },
        updateOptions() {
            this.localOptions = this.options.map(option => {
                const active = this.modelValue?.includes(option.value) ?? false;
                return {...option, active};
            });
        },
    },
    computed: {
        selected() {
            return this.localOptions
                .filter(option => option.active)
                .map(option => option.key)
                .join(', ');
        },
        buttonId() {
            return 'dropdownButton' + this.id
        },
        menuId() {
            return 'dropdownMenu' + this.id
        },
    },
    watch: {
        options: deep(function() {
            this.updateOptions();
        }),
    },
    created() {
        this.id = +(new Date) + (Math.floor(Math.random() * 1e3));
        this.updateOptions();
    },
    mounted() {
        this.flowbite = new window.Dropdown(
            document.getElementById(this.menuId),
            document.getElementById(this.buttonId),
            {
                onShow: function ({_triggerEl: trigger, _targetEl: target}) {
                    target.style = 'min-width: ' + trigger.offsetWidth + 'px';
                },
            },
        );
    },
}
