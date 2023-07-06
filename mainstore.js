import { configureStore } from "@reduxjs/toolkit"
import authslice from "./authslice"
import mailslice from "./mailitemslice"
import sentmailslice from "./sentMailslice"

const store = configureStore({
    reducer:{auth:authslice.reducer,sentmail:sentmailslice.reducer,mailitem:mailslice.reducer}
})

export default store