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
            state.departments.splice(0,state.departments.length);
        },
        addCity: (state, action)=>{
            state.cities = action.payload;
        },
        emptyCities: (state)=>{
            state.cities.splice(0,state.cities.length);
        }
    }
});

export const {addDepartment, emptyDepartments, addCity, emptyCities} = departmentsSlice.actions;
export default departmentsSlice.reducer;