import React, { useState } from "react";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sentMailAction } from "./store/sentMailslice";
import axios from "axios";

const EmailCompose = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");

  const editorStatehandler = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSend = async(e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const reciveremail = recipient.replace(/[^a-zA-Z0-9]/gi, "");
    const sentemail = localStorage.getItem("email");
    const obj = {
      to: recipient,
      subject: subject,
      text: content.blocks[0].text,
      from: localStorage.getItem("email"),
    };
    try {
    await axios.post(
      `https://mailbox-d5026-default-rtdb.firebaseio.com/${reciveremail}/inbox.json`, JSON.stringify({ ...obj, tic: true}))
      
      const sent=await axios.post(
        `https://mailbox-d5026-default-rtdb.firebaseio.com/${sentemail}/sent.json`, JSON.stringify(obj))
      console.log(sent.data.name)
      dispatch(sentMailAction.addmail({...obj,id:sent.data.name}))
    }
    catch (err) {
      console.log(err)
    }
    setRecipient("")
    setSubject("")

  };
  return (
    <div>
      <Container>
        <Card style={{ margin: "2rem 0", padding: "2rem 2rem" }}>
          <Form onSubmit={handleSend}>
            <Form.Label>To</Form.Label>
            <Form.Control
              type="text"
              value={recipient}
              name="recipent"
              onChange={handleRecipientChange}
            />
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              name="subject"
            />
            <Editor
              editorState={editorState}
              editorStyle={{ height: "300px", overflow: "auto" }}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={editorStatehandler}
            />
            ;<Button type="onSubmit">Send</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default EmailCompose;
