import { createSlice } from "@reduxjs/toolkit";
import Movement from "../models/entities/Movement";

const movementsSlice =  createSlice({
    name: "movements",
    initialState:{
        movements:[],
        incomes:[],
        expenses:[],
        expensesByMonth:[],
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
        addIncomes:(state, action)=>{
            state.incomes = action.payload;
        },
        emptyIncome:(state)=>{
            state.incomes = [];
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
        },
        setExpensesPerMonth:(state, action)=>{
            state.expensesByMonth = action.payload;
        }
    }
});

export const {
    addMovements, emptyMovements, addIncomes, emptyIncome,
    addExpenses, emptyExpenses, sumIncome, sumExpense,
    resetTotalIncome, resetTotalExpense, resetDifference,
    calculateDifference, setExpensesPerMonth
} = movementsSlice.actions;
export default movementsSlice.reducer;