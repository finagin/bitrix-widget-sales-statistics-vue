import { default as mixins } from './Mixins.js';
import { default as components } from './Components';

export const App = {
    mixins,
    components,
    data() {
        return {
            apiUrl: null,
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
        }
    },
    template: `
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-6">
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
                <Events v-if="loaded" :event="event" v-for="event in events">
                    <Managers :manager="manager" v-for="manager in event.managers" />
                </Events>
                <Skeleton v-else v-for="index in 5" :config="skeletonConfig" />
            </Table>
        </div>
    `,
}
