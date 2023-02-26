import { createSlice } from "@reduxjs/toolkit"

const departmentsSlice = createSlice({
    name: "departments",
    initialState: {
        departments: [],
        cities:[]
    },
    reducers:{
        addDepartment: (state,action)=>{
            state.departments = action.payload;
        },        
        emptyDepartments: (state)=>{
            state.departments = [];
        },
        addCity: (state, action)=>{
            state.cities = action.payload;
        },
        emptyCities: (state)=>{
            state.cities = [];
        }
    }
});

export const {addDepartment, emptyDepartments, addCity, emptyCities} = departmentsSlice.actions;
export default departmentsSlice.reducer;