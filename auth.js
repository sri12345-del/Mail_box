import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authaction } from "../store/authslice";
import axios from "axios";

const Login = () => {
  const [issigin, setissigin] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [conformpassword, setconformpasswword] = useState("");
  const [isvalid, setisvalid] = useState(false);
  const [islooding, setislooding] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const changehandler = () => {
    setissigin(!issigin);
  };
  const emailhandler = (e) => {
    let emailval = e.target.value;
    setemail(emailval);
    setisvalid(
      emailval.includes("@") &&
        password.length >= 8 &&
        password === conformpassword
    );
  };
  const passwordhandler = (e) => {
    setpassword(e.target.value);
    setisvalid(
      e.target.value.length === conformpassword &&
        email.includes("@") &&
        conformpassword.length >= 8
    );
  };
  const conformhandler = (e) => {
    setconformpasswword(e.target.value);
    setisvalid(
      e.target.value === password && email.includes("@") && password.length >= 8
    );
  };

  const formhandler = (e) => {
    e.preventDefault();
    if (issigin) {
      if (!email.includes("@") || password.length <= 7) {
        alert("somthing is wrong");
        return;
      }
    }
    if (!issigin) {
      if (
        !email.includes("@") ||
        password.length <= 7 ||
        password !== conformpassword
      ) {
        alert("check email and password");
        return;
      }
    }
    setislooding(true);
    let url;
    if (!issigin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-Co9PuKJXYfd6hOsb0YIlTv-_NKV9F2k";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-Co9PuKJXYfd6hOsb0YIlTv-_NKV9F2k";
    }
    axios
      .post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .then((res) => { 
        if (issigin) {
          const newval = res.data.email.replace(/[^a-zA-Z0-9]/gi, "");
          localStorage.setItem("email", newval);
          dispatch(authaction.addtoken());
          history.replace("/home");
        } else {
          changehandler();
        }
      })
      .catch((err) => console.log(err.message));
      setislooding(false)
    setemail("");
    setpassword("");
    setconformpasswword("");
  };

  return (
    <div>
      <Card style={{ margin: "5rem 33rem", padding: "1rem 1rem" }}>
        <Card.Title style={{ textAlign: "center", fontSize: "250%" }}>
          {issigin ? "Log in" : "Sign up"}
        </Card.Title>
        <Form style={{ margin: "2rem" }}>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              text="email"
              placeholder="name@example.com"
              onChange={emailhandler}
              value={email}
            ></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              text="password"
              placeholder="password"
              onChange={passwordhandler}
              minLength="8"
              value={password}
            ></Form.Control>
          </FloatingLabel>
          {!issigin && (
            <FloatingLabel label="Conform password" className="mb-3">
              <Form.Control
                text="password"
                placeholder="password"
                onChange={conformhandler}
                minLength="8"
                value={conformpassword}
              ></Form.Control>
            </FloatingLabel>
          )}
          <div className="d-grid gap-2">
            <Button
              variant={isvalid ? "success" : "primary"}
              onClick={formhandler}
            >
              {issigin ? "Log in" : "Sign up"}
            </Button>
          </div>
          <div className="d-grid gap-2">
            {issigin && <Button variant="link">Forget Password</Button>}
          </div>
          {islooding && <p>looding...</p>}
        </Form>
      </Card>
      <Card style={{ margin: ".5rem 33rem", marginTop: "-4rem" }}>
        <Button onClick={changehandler}>Have an account? login</Button>
      </Card>
    </div>
  );
};
export default Login;
