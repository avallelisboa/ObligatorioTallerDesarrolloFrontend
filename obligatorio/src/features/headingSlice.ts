import { createSlice } from "@reduxjs/toolkit";
import Heading from "../models/entities/Heading";

const headingsSlice = createSlice({
    name: "headings",
    initialState:{
        headings:[],
        headingsWithExpenses:[],
        headingsWithIncomes:[]
    },
    reducers:{
        addHeadings:(state, action)=>{
            state.headings = action.payload;
        },
        emptyHeadings:(state)=>{
            state.headings = [];
        },
        addHeadingsWithIncomes:(state, action)=>{
            state.headingsWithIncomes = action.payload;
        },
        emptyHeadingsWithIncome:(state)=>{
            state.headingsWithIncomes = [];
        },
        addHeadingsWithExpenses:(state, action)=>{
            state.headingsWithExpenses = action.payload;
        },
        emptyHeadingsWithExpenses:(state, action)=>{
            state.headingsWithExpenses = [];
        }
    }
});

export const {addHeadings, emptyHeadings, addHeadingsWithExpenses, emptyHeadingsWithExpenses, addHeadingsWithIncomes,emptyHeadingsWithIncome} = headingsSlice.actions;
export default headingsSlice.reducer;