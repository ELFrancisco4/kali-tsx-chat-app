import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Join from "./Pages/Join";
import Chat from "./Pages/Chat";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Join />} />
      </Routes>
    </div>
  );
};
export default App;
