import { createSlice } from "@reduxjs/toolkit"
import Department from "../models/entities/Department"

const initialState = {
    departments: []
}

const departmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers:{
        addDepartment: (state,action) =>{
            state.departments = action.payload;
        },        
        emptyDepartments: (state) =>{
            state.departments.splice(0,state.departments.length);
        }
    }
});

export const {addDepartment, emptyDepartments} = departmentsSlice.actions;
export default departmentsSlice.reducer;