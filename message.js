import { Button, Card } from "react-bootstrap";

const Message = (props) => {
  
  const deletehandler = (val) => {
    props.delete(val)
  }
  return (
    <div>
      <Card style={{padding:"2rem 2rem" ,backgroundColor:"lightblue"}}>
        <Card.Title style={{textAlign:"center"}}><div>Text Message</div></Card.Title>
        <Card.Body>
          <div>From : {props.item.to}</div>
          <div>Subject : {props.item.subject}</div>
          <div>Message : {props.item.text}</div>
        </Card.Body>
        <Card.Footer style={{display:"flex" ,justifyContent:"space-between"}}>
        <Button onClick={props.close} size="medium">Close</Button>
          <Button onClick={deletehandler.bind(null, props.item)}>Delete</Button>
          </Card.Footer>
      </Card>
    </div>
  );
};

export default Message;
