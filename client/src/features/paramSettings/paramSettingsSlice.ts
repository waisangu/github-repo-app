import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamSettingsState, AllowedSort, AllowedOrder } from "../../types/types";

const initialState: ParamSettingsState = {
    q: '',
    sort: undefined,
    order: 'desc',
    per_page: 10,
    page: 1
}


const paramSettingsSlice = createSlice({
    name: "paramSettings",
    initialState,
    reducers: {
        changeQ: (state, action: PayloadAction<string>) => ({
            ...state,
            q: action.payload
        }),
        changeSort: (state, action: PayloadAction<AllowedSort>) => ({
            ...state,
            sort: action.payload
        }),
        changeOrder: (state, action: PayloadAction<AllowedOrder>) => ({
            ...state,
            order: action.payload
        }),
        changePerPage: (state, action: PayloadAction<number>) => ({
            ...state,
            per_page: action.payload
        }),
        changePage: (state, action: PayloadAction<number>) => ({
            ...state,
            page: action.payload
        }),
    },
    

})

export const { changeQ, changeSort, changeOrder, changePerPage, changePage } = paramSettingsSlice.actions;

export default paramSettingsSlice.reducer;