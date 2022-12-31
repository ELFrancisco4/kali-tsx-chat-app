import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import querystring from "query-string";
import Nav from "../components/Nav/molecules/Nav";
import MessageCompose from "../components/Chat/molecules/MessageCompose";
import styles from "../Styles/Chat.module.scss";
import RoomName from "../components/Nav/atoms/RoomName";
import { MessageContext } from "./../context/context";
import Messages from "../components/Chat/molecules/Messages";

const Chat = () => {
  const [name, setName] = useState<any>("");
  const [room, setRoom] = useState<any>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [noOfUsers, setNoOfUsers] = useState();
  const location = useLocation();
  let socket: any;
  const ENDPOINT: string = "https://kali-tsk-chat-app.herokuapp.com/";
  const ref = useRef(io(ENDPOINT));

  useEffect(() => {
    const { name, room } = querystring.parse(location.search);

    setName(name);
    setRoom(room);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    socket = ref.current;

    socket.emit("join", { name, room }, (error: any) => {
      if (error) console.log(error);
      else return null
    });

    socket.on("onlineStatus", ({ users }: any) => {
      // Set the number of people online in a room
    });

    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
      console.log(message, messages);
    });
    return () => {
      socket.on("disconnect", () => {});
      socket.off();
    };
  }, [ENDPOINT, location.search, messages]);

  // Deliver message to socket io client UI
  const sendMessage = (event: any) => {
    socket = ref.current;
    event.preventDefault();
    if (message) {
      console.log(messages);
      socket.emit("chat message", message, () => setMessage(""));
      event.target.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <Nav noOfUsers={noOfUsers}>
        <RoomName room={room} />
      </Nav>
      <div className={styles.chat}>
        <MessageContext.Provider value={messages}>
          <div className={styles.message_interface}>
            <Messages message={message} name={name} />
          </div>
        </MessageContext.Provider>

        <MessageCompose
          onClick={(e: any) => {
            setMessage("");
            sendMessage(e);
          }}
          value={message}
          className={styles.compose}
          onChange={(e: any) => setMessage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Chat;
