import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./inbox.module.css"
import Message from "./message";
import { mailaction } from "../store/mailitemslice";
import { sentMailAction } from "../store/sentMailslice";
const Inbox = (props) => {
    const dispatch=useDispatch()
    const isshow=useSelector(state=>state.mailitem.isshow)
    const sentisshow = useSelector(state => state.sentmail.sentinbox)
    const openhandler = (val) => {
        props.open(val)
    }


     const sentclose=() => {
         dispatch(sentMailAction.closeitem())
     }
    const deletesent = async (val) => {
        dispatch(sentMailAction.deletemail(val))
        dispatch(sentMailAction.closeitem())
         const email = localStorage.getItem("email")
         try {
             await axios.delete(`https://mailbox-d5026-default-rtdb.firebaseio.com/${email}/sent/${val.id}.json`)
         } catch (err) {
             console.log(err)
         }  
     }
     const closehandler = () => {
         dispatch(mailaction.delmailitem())
    }  
     const deletehandler = async(val) => {
         dispatch(mailaction.deleteitem(val))
         dispatch(mailaction.delmailitem())
         const email = localStorage.getItem("email")
         try {
             await axios.delete(`https://mailbox-d5026-default-rtdb.firebaseio.com/${email}/inbox/${val.id}.json`)
         } catch (err) {
             console.log(err)
         }
    }   
    return (
        <Card style={{margin:"2rem"}}>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Text</th>
                    </tr>
                </thead>
                <tbody>
                    {props.item.map((val) => (
                        <tr key={val.id} id={val.id} onClick={openhandler.bind(null, val)}>
                            <td><div className={val.tic?classes.dot:""}></div>
                                <div>{val.to}</div></td>
                            <td>{val.subject}</td>
                            <td>{val.text}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            {isshow && <Message item={isshow} close={closehandler} delete={deletehandler}></Message>}   
            {sentisshow && <Message item={sentisshow} close={sentclose} delete={deletesent}></Message>}
    </Card>
  );
};

export default Inbox;
