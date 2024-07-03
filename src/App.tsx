import "@/App.css";
import LayoutCp from "@/views/Layout";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import Article from "./views/Article";
import Home from "./views/Home";
import AddArticle from "./views/Article/AddArticle";
import Draft from "./views/Draft";
import Post from "./views/Post";
import Link from "./views/Link";
import Comment from "./views/Comment";
import Work from "./views/Work";
import Log from "./views/Log";
import About from "./views/About";
import EditAbout from "./views/About/EditAbout";

import "./global.custom.scss";
import { useEffect } from "react";
import EventBus from "./utils/event";
import { message } from "antd";

function App() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    //订阅未登录事件并接受参数
    EventBus.on("global_not_login", () => {
      //跳转到login页面
      navigate("/login");
    });

    EventBus.on("global_bad_request", (message) => {
      messageApi.warning(message);
    });
  }, []);
  return (
    <div className="App">
      {contextHolder}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navigate to={"/home"} />}></Route>
        <Route element={<LayoutCp />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/article" element={<Article />}></Route>
          <Route path="/article/add" element={<AddArticle />}></Route>
          <Route path="/draft" element={<Draft />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/link" element={<Link />}></Route>
          <Route path="/comment" element={<Comment />}></Route>
          <Route path="/work" element={<Work />}></Route>
          <Route path="/log" element={<Log />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/about/add" element={<EditAbout />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
