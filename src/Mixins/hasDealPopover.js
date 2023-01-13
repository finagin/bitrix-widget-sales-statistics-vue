import { Popover } from '../Components/Popover.js';
import { useState } from '../State.js';

export const hasDealPopover = {
    components: {Popover},

    methods: {
        dealUrl(id) {
            const state = useState();

            return 'https://' + state.domain + '/crm/deal/details/' + id + '/';
        },
    },
}
