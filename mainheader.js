import { Button, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./mainheader.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authaction } from "../store/authslice";


const Mainheader = () => {
  const dispatch=useDispatch()
  const isloogedin=useSelector(state=>state.auth.token)
  const history = useHistory();
  const changehandler = () => {
    localStorage.removeItem("email");
    dispatch(authaction.removetoken())
    history.replace("/auth");
  };
  return (
    <div>
      <header className={classes.header}>
        <h2>Mail box</h2>
        <ul>
          <li>
            <NavLink to="/auth">auth</NavLink>
          </li>
          <li>
            {isloogedin && <NavLink to="/home">home</NavLink>}
          </li>
          <li>
            {isloogedin && <Button onClick={changehandler}>Logout</Button>}
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Mainheader;
