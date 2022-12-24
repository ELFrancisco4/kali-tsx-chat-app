type RoomNameProps = {
  room: string;
};

const RoomName = ({ room }: RoomNameProps) => {
  return <p>{room}</p>;
};

export default RoomName;
