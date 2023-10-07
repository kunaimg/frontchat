import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/_app.scss";
import HomeScreen from "./chatdata/HomeScreen";
import Login from "./chatdata/Login";
import Signup from "./chatdata/Signup";
import Chat from "./chatdata/Chat";
import CreateId from "./chatdata/CreateId";
import Protected from "./chatdata/Protected";
import EnterVideo from "./chatdata/EnterVideo";
import LoginVideo from "./chatdata/LoginVideo";
import Video from "./chatdata/Video";
import Onechat from "./chatdata/OneChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {/* <Route path="/chat" element={<Protected Com={Chat} />}></Route>
        <Route path="/createid" element={<Protected Com={CreateId} />}></Route>

        <Route
          path="/videostart"
          element={<Protected Com={EnterVideo} />}
        ></Route>
        <Route path="/videochat" element={<Protected Com={Video} />}></Route>
        <Route
          path="/loginvideo"
          element={<Protected Com={LoginVideo} />}
        ></Route>
        <Route path="/onechat" element={<Protected Com={Onechat} />}></Route> */}
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/createid" element={<CreateId />}></Route>

        <Route path="/videostart" element={<EnterVideo />}></Route>
        <Route path="/videochat" element={<Video />}></Route>
        <Route path="/loginvideo" element={<LoginVideo />}></Route>
        <Route path="/onechat" element={<Onechat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
