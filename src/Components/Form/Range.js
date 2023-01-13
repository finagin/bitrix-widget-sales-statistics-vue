export const Range = {
    name: 'Range',
    props: {
        modelValue: Object,
        boundaryValues: Array,
    },
    emits: ['update:modelValue'],
    data() {
        return {
            minValue: this.boundaryValues[0],
            maxValue: this.boundaryValues[1],
            min: this.boundaryValues[0],
            max: this.boundaryValues[1],
        };
    },
    template: `
            <div class="flex">
                <input v-model.lazy="minValue" :min="minMin" :max="minMax" class="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number">
                <input v-model.lazy="maxValue" :min="maxMin" :max="maxMax" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number">
            </div>
        `,
    computed: {
        minMin() {
            return this.min;
        },
        minMax() {
            return Math.min(this.max, this.maxValue);
        },
        maxMin() {
            return Math.max(this.min, this.minValue);
        },
        maxMax() {
            return this.max;
        },
    },
    methods: {
        emit() {
            this.$emit('update:modelValue', {from: this.minValue, to: this.maxValue});
        },
    },
    watch: {
        minValue() {
            this.emit()
        },
        maxValue() {
            this.emit()
        },
        boundaryValues() {
            [this.minValue, this.maxValue] = this.boundaryValues;
            [this.min, this.max] = this.boundaryValues;
        },
    },
    created() {
        this.emit()
    },
};
