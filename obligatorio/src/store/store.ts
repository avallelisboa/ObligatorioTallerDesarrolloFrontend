import { configureStore } from "@reduxjs/toolkit";
import departmentsReducer from "../features/departmentsSlice";
import movementsReducer from "../features/movementsSlice";

const store = configureStore({
    reducer:{
        departments:departmentsReducer,
        movements:movementsReducer
    }
});
export default store;