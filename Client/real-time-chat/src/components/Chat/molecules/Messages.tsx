import Message from "../atoms/Message";
import { useContext } from "react";
import { MessageContext } from "../../../context/context";
import ScrollToBottom from "react-scroll-to-bottom";

type MessagesProps = {
  message: any;
  name: string;
};

const Messages = ({ message, name }: MessagesProps) => {
  const messages = useContext(MessageContext);
  return (
    <ScrollToBottom>
      {messages.map((message: any, id: any) => {
        return <Message message={message} name={name} key={id} />;
      })}
    </ScrollToBottom>
  );
};

export default Messages;
