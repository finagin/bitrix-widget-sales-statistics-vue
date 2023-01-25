import { default as mixins } from './Mixins.js';
import { default as components } from './Components.js';

export const App = {
    mixins,
    components,
    data() {
        return {
            skeletonConfig: {
                default: {
                    type: 'td',
                    color: 300,
                    width: 16,
                },
                items: [
                    {width: 48, type: 'th', color: 600},
                    {width: 10},
                    {width: 16},
                    {width: 16},
                    {width: 20},
                    {width: 16},
                    {width: 5},
                ],
            },
            query: {
                event: [null],
                manager: [null],
                date: {
                    from: null,
                    to: null,
                },
            },
        }
    },
    template: `
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-6">
            <div class="flex justify-between items-left p-4">
                <div class="flex-auto grid grid-cols-8 gap-x-8 gap-y-4">
                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Мероприятие</label>
                        <dropdown v-model="query.event" :options="eventOptions"></dropdown>
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Менеджер</label>
                        <dropdown v-model="query.manager" :options="managerOptions"></dropdown>
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата с:</label>
                        <input type="date" v-model="query.date.from" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pt-2.5 pb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John">
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата по:</label>
                        <input type="date" v-model="query.date.to" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pt-2.5 pb-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John">
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Сделок</label>
                        <range v-model="query.count" v-model:boundary-values="countBoundaryValues"/>
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Сумма</label>
                        <range v-model="query.sum" v-model:boundary-values="sumBoundaryValues"/>
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">План</label>
                        <range v-model="query.plan" v-model:boundary-values="planBoundaryValues"/>
                    </div>

                    <div class="col-span-8 md:col-span-2 sm:col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Процент</label>
                        <range v-model="query.percent" v-model:boundary-values="percentBoundaryValues"/>
                    </div>
                </div>
            </div>
            <Table>
                <template #headers>
                    <TableColumn type="th">Мероприятие</TableColumn>
                    <TableColumn type="th">Сделок</TableColumn>
                    <TableColumn type="th">Сумма</TableColumn>
                    <TableColumn type="th">План</TableColumn>
                    <TableColumn type="th">Процент</TableColumn>
                    <TableColumn type="th">Дата</TableColumn>
                    <TableColumn type="th" class="p-4"></TableColumn>
                </template>
                <template v-if="loaded">
                    <Events :event="event" v-for="event in eventsFiltered">
                        <Managers :manager="manager" v-for="manager in event.managers" />
                    </Events>
                    <Events :event="eventsTotal" isTotal>
                        <Managers :manager="manager" v-for="manager in managersTotal" isTotal />
                    </Events>
                </template>
                <TableSkeleton v-else v-for="index in 5" :config="skeletonConfig" />
                <template #footer>
                    <div v-show="loaded && !eventsFiltered.length" class="grid place-items-center m-10 font-black text-gray-400">
                        <h3>
                            Нет данных подходящих под заданные параметры.
                        </h3>
                    </div>
                </template>
            </Table>
        </div>
    `,
}
