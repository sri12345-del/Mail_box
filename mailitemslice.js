import { createSlice } from "@reduxjs/toolkit";

const mailslice = createSlice({
    name: "mail",
    initialState: { data: [],unreadmsg:0 ,isshow:""},
    reducers: {
        additem(state, action) { 
            const find = state.data.find(item => item.id === action.payload.id)
            if (find) {
                state.data=[...state.data]
            } else {
                state.data=[...state.data,action.payload]
            }
            state.unreadmsg=state.data.filter(val=>val.tic===true).length
        },
        readdata(state,action) {
            let newval = { ...action.payload, tic: false }
            state.data = state.data.map(val => val.id===action.payload.id?newval:val)
            state.unreadmsg=state.data.filter(val=>val.tic==true).length     
        },
        deleteitem(state, action) {
            state.data = state.data.filter(val => val.id != action.payload.id)
            state.unreadmsg=state.data.filter(val=>val.tic==true).length     
        },
        mailitem(state, action) {
            state.isshow=action.payload
        },
        delmailitem(state) {
            state.isshow=""
        }
        

       
    }
    
})

export const mailaction = mailslice.actions

export default mailslice