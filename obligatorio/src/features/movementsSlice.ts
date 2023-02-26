import { createSlice } from "@reduxjs/toolkit";
import Movement from "../models/entities/Movement";

const movementsSlice =  createSlice({
    name: "movements",
    initialState:{
        movements:[],
        income:[],
        expenses:[]
    },
    reducers:{
        addMovements:(state, action)=>{
            state.movements = action.payload;
        },
        emptyMovements:(state)=>{
            state.movements = [];
        },
        addIncome:(state, action)=>{
            state.income = action.payload;
        },
        emptyIncome:(state)=>{
            state.income = [];
        },
        addExpenses:(state, action)=>{
            state.expenses = action.payload;
        },
        emptyExpenses:(state, action)=>{
            state.expenses = [];
        }
    }
});

export const {addMovements, emptyMovements, addIncome, emptyIncome, addExpenses, emptyExpenses} = movementsSlice.actions;
export default movementsSlice.reducer;