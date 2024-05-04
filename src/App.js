import { Routes, Route } from "react-router-dom";
import { Chats, Signin, Signup } from "./screens";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Signin/>}></Route>
        <Route path="chats" element={<Chats/>}></Route>
        <Route path="signup" element={<Signup/>}></Route>
    </Routes>
  );
}

export default App;
