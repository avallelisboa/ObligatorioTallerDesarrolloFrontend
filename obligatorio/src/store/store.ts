import { configureStore } from "@reduxjs/toolkit";
import departmentsReducer from "../features/departmentsSlice";

const store = configureStore({
    reducer:{
        departments:departmentsReducer
    }
});
export default store;