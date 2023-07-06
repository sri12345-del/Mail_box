import { createSlice } from "@reduxjs/toolkit";

const sentmailslice = createSlice({
    name: "sent_mail",
    initialState: { item: [] ,sentinbox:""},
    reducers: {
        addmail(state, action) {  
                state.item=[...state.item,action.payload]
        },
        addfromapi(state, action) {
            let item = state.item.find(val => val.id === action.payload.id)
            if (item) {
                state.item=[...state.item]
            } else {
                state.item=[...state.item,action.payload]
            }
        },  
        readsent(state, action) {
            state.sentinbox=action.payload
        },
        deletemail(state, action) {
            state.sentinbox=""
            state.item = state.item.filter(val => val.id != action.payload.id)
        },
        closeitem(state) {
            state.sentinbox=""
        }
        
    }
})

export const sentMailAction = sentmailslice.actions

export default sentmailslice;
