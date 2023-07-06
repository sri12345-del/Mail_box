import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authaction } from "../store/authslice";
import EmailCompose from "../Compose";
import { useState } from "react";
import { mailaction } from "../store/mailitemslice";
import { sentMailAction } from "../store/sentMailslice";
import Inbox from "../components/inbox";
import axios from "axios";

const Home = () => {
  const dispatch=useDispatch()
 const [inbox, setinbox] = useState(false);
  const [compose, setcompose] = useState(false);
const [sent, setsent] = useState(false)
  
  const item = useSelector(state=>state.mailitem.data)
  const sentitem = useSelector(state => state.sentmail.item)
  const unread=useSelector(state=>state.mailitem.unreadmsg)
  const inboxhandler = () => {
    setcompose(false);
    setsent(false)
    setinbox(true);
  };
  const composehandler = () => {
    setinbox(false);
    setsent(false)
    setcompose(true);
  };
  const sentinboxhandler = () => {
    setinbox(false)
    setcompose(false)
    setsent(true)
  }
  
  const openinbox = (val) => {
    dispatch(mailaction.mailitem(val))
    dispatch(mailaction.readdata(val))
   const email=localStorage.getItem("email")
    axios.patch(`https://react-http-735b2-default-rtdb.firebaseio.com/${email}/inbox/${val.id}.json`,
    JSON.stringify({tic:false})).then(res=>console.log(res)).catch(err=>console.log(err))
  }

  const opensent = (val) => {
    dispatch(sentMailAction.readsent(val))
  }

  return (
    <div>
      <Container>
        <Row>
          <Col sm={2}>
            <Button onClick={composehandler} style={{ marginTop: "1rem" }}>
              Compose
            </Button>
            <Button
              onClick={inboxhandler}
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Inbox--- </div>
              <div>{unread }</div>
            </Button>
            <Button style={{ marginTop: "1rem" }} onClick={sentinboxhandler}>
              Sent--
            </Button>
          </Col>
          <Col sm={10}>
            {inbox && <Inbox item={item}  open={openinbox}></Inbox>}
            {sent && <Inbox item={sentitem} open={opensent}></Inbox>}
            {compose && <EmailCompose></EmailCompose>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
