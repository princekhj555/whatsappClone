import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React,{useState,useEffect} from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
function Chat() {
  //  const [seed,setSeed]= useState("");
    const [input,setInput]=useState("");
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState('');
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    }, [roomId]);
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random()*500));

    // }, []);
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    }
    return (
        <div className="chat">
           <div className="chat_header">
               <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*500)}.svg`}/>
              <div className="chat_headerInfo">
                 <h3>{roomName}</h3>
               <p>last Seen{" "}
               {
                   new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
               }
               </p>
               </div>
               <div className="chat_headerRight">
               <IconButton><SearchOutlinedIcon/></IconButton>
               <IconButton><AttachFileIcon/></IconButton>
               <IconButton><MoreVertIcon/></IconButton>
               </div>
               
               </div> 
           <div className="chat_body">
               {
                   messages.map(message=>(
                    <p className={`chat_message ${message.name===user.displayName && 'chat_reciever'}`}>
                    <span className="chat_name">
                        {message.name}
                    </span>{message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span></p>
                   ))
               }
           </div>
          <div className="chat_footer">
              <IconButton><InsertEmoticonIcon/></IconButton>
              <form>
              <input value={input} onChange={e=> setInput(e.target.value)} type="text" placeholder="Type a message "/>
              <button onClick={sendMessage} type="submit">Send message</button> 
              </form>
              
               <IconButton><MicIcon/></IconButton> 
              </div>  
        </div>
    )
}

export default Chat
