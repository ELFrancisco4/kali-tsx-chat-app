import Input from "../components/Join/atoms/Input";
import styles from "../Styles/Join.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className={styles.container}>
      <h1>JOIN A <span>CHAT ROOM</span>  OF YOUR CHOICE</h1>
      <div>
        <label>Name:</label>
        <Input
          onChange={(e: any) => setName(e.target.value)}
          type={"text"}
          className={styles.name}
          placeholder={"Enter your name"}
        />
      </div>

      <div>
        <label>Room:</label>
        <Input
          onChange={(event: any) => setRoom(event.target.value)}
          type={"text"}
          className={styles.room}
          placeholder={"Enter room of choice"}
        />
      </div>

      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        to={`/chat?name=${name}&room=${room}`}
      >
        <button type="submit">Join Chat!</button>
      </Link>
    </div>
  );
};

export default Join;
