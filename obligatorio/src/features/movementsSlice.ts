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
        deleteMovement:(state,action)=>{
            state.movements.forEach((element:Movement, index)=>{
                if(element.movementId == action.payload.movementId){
                    state.movements.splice(index, 1);
                    return;
                }
            })
        },
        emptyMovements:(state)=>{
            state.movements.splice(0, state.movements.length);
        },
        addIncome:(state, action)=>{
            state.income = action.payload;
        },
        emptyIncome:(state)=>{
            state.income.splice(0, state.expenses.length);
        },
        addExpenses:(state, action)=>{
            state.expenses = action.payload;
        },
        emptyExpenses:(state, action)=>{
            state.expenses.splice(0, state.expenses.length);
        }
    }
});

export const {addMovements, deleteMovement, emptyMovements, addIncome, emptyIncome, addExpenses, emptyExpenses} = movementsSlice.actions;
export default movementsSlice.reducer;