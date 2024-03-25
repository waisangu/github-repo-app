import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavCounterState } from "../../types/types";

const initialState: FavCounterState = {
    value: 0,
}


const favCounterSlice = createSlice({
    name: "favCounter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(
    //         saveAsync.fulfilled,
    //         (state, action: PayloadAction<ListState>) => {
    //             state.query = action.payload.query;
    //             state.items = action.payload.items;
    //         }
    //     )
    // }
})

export const { increment, decrement } = favCounterSlice.actions;

// Initially tried to make the fetch request part of redux, however, ran into some complications with the getting the input shape of the
// input parameters. Opted to make it simple and have the fetch in handleClick and handleSubmit

// export const saveAsync = createAsyncThunk(
//     "searchResult/saveAsync",
//     async (query: string):Promise<ListState> => {
//         const baseUrl = 'https://api.github.com/search/repositories';
//         const params = new URLSearchParams({
//             q: query,
//             sort: 'stars', // Default is best match
//             order: 'desc', // Default is desc
//             per_page: String(10), // Default is 30 results per page
//             page: String(1) // Default is page 1
//         })

//         // try {
//             const response = await fetch(`${baseUrl}?${params}`);

//             if (!response.ok) {
//                 throw new Error(`Status Code:${response.status}. Failed to get repositories.`)
//             }

//             const data = await response.json();
//             const desiredKeys: string[] = ['id', 'name', 'owner', 'description', 'stargazers_count'];
//             const filteredItems = [];
    
//             for (const item of data.items) {
//                 filteredItems.push(Object.keys(item).filter(key => desiredKeys.includes(key)).reduce((obj: any, key) => {
//                     obj[key] = item[key];
//                     return obj
//                 }, {}))
//             }
    
//             const result: ListState = {
//                 query,
//                 items: filteredItems
//             }
    
//             return result as ListState;
            
//         // } catch (error: unknown) {
//         //     return console.log(error) as any;
//         // }

//     }
// )


export default favCounterSlice.reducer;