import Input from "../../Join/atoms/Input";
import SendMessage from "./../atoms/SendMessage";

type MessageComposeProperties = {
  className: string;
  onChange?: any;
  value: string;
  onClick: any
};

const MessageCompose = ({ className, onChange, value, onClick }: MessageComposeProperties) => {
  return (
    <div className={className}>
      <Input
        value={value}
        onChange={onChange}
        type="text"
        className="input"
        placeholder="Enter your message"
      />
      <SendMessage onclick={onClick} />
    </div>
  );
};

export default MessageCompose;
