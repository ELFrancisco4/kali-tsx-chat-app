import styles from "../styles/messages.module.scss";
type MessageProps = {
  message: any;
  name: string;
  time?: number;
};

const Message = ({ message: { user, text }, name }: MessageProps) => {
  const trimmedName = name.trim().toLowerCase();
  let isCurrentUser = false;
  if (user === trimmedName) {
    isCurrentUser = true;
  }
  return isCurrentUser ? (
    <div className={styles.current_user_msg}>
      <div>{text}</div>
      <span>{trimmedName}</span>
    </div>
  ) : (
    <div className={styles.different_user_msg}>
      <div>{text}</div>
      <span>{user}</span>
    </div>
  );
};

export default Message;
