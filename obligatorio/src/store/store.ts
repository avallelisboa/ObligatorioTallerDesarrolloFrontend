import { configureStore } from "@reduxjs/toolkit";
import departmentsReducer from "../features/departmentsSlice";
import movementsReducer from "../features/movementsSlice";
import headingsReducer from "../features/headingSlice";

const store = configureStore({
    reducer:{
        departments:departmentsReducer,
        movements:movementsReducer,
        headings: headingsReducer
    }
});
export default store;