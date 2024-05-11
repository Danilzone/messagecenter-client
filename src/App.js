import { Routes, Route } from "react-router-dom";
import { Chats, Signin, Signup, TestAxios, NewAccAvito } from "./screens";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Signin/>}></Route>
        <Route path="chats" element={<Chats/>}></Route>
        <Route path="signup" element={<Signup/>}></Route>
        <Route path="newaccavito" element={<NewAccAvito/>}></Route>
        <Route path="test" element={<TestAxios/>}></Route>
    </Routes>
  );
}

export default App;
