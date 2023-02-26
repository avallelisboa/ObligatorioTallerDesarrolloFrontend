import { createSlice } from "@reduxjs/toolkit";
import Heading from "../models/entities/Heading";

const headingsSlice = createSlice({
    name: "headings",
    initialState:{
        headings:[]
    },
    reducers:{
        addHeadings:(state, action)=>{
            state.headings = action.payload;
        },
        emptyHeadings:(state)=>{
            state.headings = [];
        }
    }
});

export const {addHeadings, emptyHeadings} = headingsSlice.actions;
export default headingsSlice.reducer;