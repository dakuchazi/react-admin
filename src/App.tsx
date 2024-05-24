import "@/App.css";
import LayoutCp from "@/views/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Article from "./views/Article";
import Home from "./views/Home";
import AddArticle from "./views/Article/AddArticle";

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
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
