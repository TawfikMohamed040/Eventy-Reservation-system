import { configureStore } from "@reduxjs/toolkit";

import EventReducer from './slices/event-slice';
import AccountReducer from './slices/account-slice';
import credentialReducer from './slices/credentials-slice'
import roleReducer from './slices/role-slice'
import reservationReducer from './slices/reservation-slice'
export const appStore = configureStore({
    reducer: {
        events: EventReducer,
        account: AccountReducer,
        credentials: credentialReducer,
        role: roleReducer,
        reservation: reservationReducer,
    }
});
