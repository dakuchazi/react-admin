import "@/App.css";
import LayoutCp from "@/views/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
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

import "./global.custom.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navigate to={"/home"} />}></Route>
        <Route element={<LayoutCp />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/article" element={<Article />}></Route>
          <Route path="/addArticle" element={<AddArticle />}></Route>
          <Route path="/draft" element={<Draft />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/link" element={<Link />}></Route>
          <Route path="/comment" element={<Comment />}></Route>
          <Route path="/work" element={<Work />}></Route>
          <Route path="/log" element={<Log />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
