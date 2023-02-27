import { createSlice } from "@reduxjs/toolkit";
import Movement from "../models/entities/Movement";

const movementsSlice =  createSlice({
    name: "movements",
    initialState:{
        movements:[],
        income:[],
        expenses:[],
        totalIncome:0,
        totalExpense:0,
        difference:0
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
        },
        sumIncome:(state, action)=>{
            state.totalIncome += action.payload;
        },
        sumExpense:(state, action)=>{
            state.totalExpense += action.payload;
        },
        resetTotalIncome:(state)=>{
            state.totalIncome = 0;
        },
        resetTotalExpense:(state)=>{
            state.totalExpense = 0;
        },
        resetDifference:(state)=>{
            state.difference = 0;
        },
        calculateDifference:(state)=>{
            state.difference = state.totalIncome - state.totalExpense;
        }
    }
});

export const {
    addMovements, emptyMovements, addIncome, emptyIncome,
    addExpenses, emptyExpenses, sumIncome, sumExpense,
    resetTotalIncome, resetTotalExpense, resetDifference,
    calculateDifference
} = movementsSlice.actions;
export default movementsSlice.reducer;