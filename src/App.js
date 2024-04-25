import { Routes, Route } from "react-router-dom";
import { Chats, Signin } from "./screens";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Signin/>}>
        </Route>
        <Route path="chats" element={<Chats/>}></Route>
    </Routes>
  );
}

export default App;
