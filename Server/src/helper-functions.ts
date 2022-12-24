let users: { name: string; room: string; id: string }[] = [];

type UserType = {
  name: string;
  id: string;
  room: string;
};

const addUser = ({ name, room, id }: UserType) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user: UserType) => user.name === name && user.room === room
  );
  if (existingUser) return { error: "Username is taken" };
  else {
    const user: UserType = { name, room, id };
    users.push(user);
    console.log(users);
    return { user };
  }
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id: string) => users.find((user) => user.id === id);

const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
