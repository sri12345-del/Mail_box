import { Route } from "react-router-dom";
import Login from "./pages/auth";
import Layout from "./Layout/layout";
import Home from "./pages/home";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import EmailCompose from "./Compose";
import axios from "axios";
import { mailaction } from "./store/mailitemslice";
import { sentMailAction } from "./store/sentMailslice";
import useFetch from "./components/custom";
function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    function fetchdata() {
      const receivemail = localStorage.getItem("email")
      axios.get(`https://mailbox-d5026-default-rtdb.firebaseio.com/${receivemail}/inbox.json`)
        .then(data => {
          for (let key in data.data) {
            dispatch(mailaction.additem({ ...data.data[key], id: key }))
          }
        }).catch(err => console.log(err))
    }
    setInterval(() => {
      fetchdata()  
     },5000)
},[])
    const receivemail = localStorage.getItem("email")
  const { data }=useFetch(`https://mailbox-d5026-default-rtdb.firebaseio.com/${receivemail}/sent.json`)
        for (let key in data) {
          console.log(key)
          dispatch(sentMailAction.addfromapi({...data[key],id:key}))
        }
  return (
    <div>
      <Layout>
        <Route path="/auth">
          <Login></Login>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/compose">
          <EmailCompose></EmailCompose>
        </Route>
      </Layout>
    </div>
  
  );
}

export default App;
