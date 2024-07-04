import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import avatarUrl from "@/assets/images/avatar1.png";
import axios from "@/utils/axios";

import s from "./index.module.scss";
import { useAppDispatch } from "@/store";
import { getUserInfoAsync } from "@/store/slices/userSlice";

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const [username, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      messageApi.warning("登录失败！请输入账号、密码！");
      return;
    }
    const res: any = await axios.post("/api/auth/login", {
      username,
      password,
    });

    if (res.code === "200") {
      localStorage.setItem("token", res.data.access_token);
      dispatch(getUserInfoAsync({ username }));
      navigate("/");
    }
  };

  return (
    <>
      {contextHolder}
      <div className={s.LoginBox}>
        <div className={s.leftBox}>个人博客后台管理系统</div>
        <div className={s.rightBox}>
          <div className={s.avatarBox}>
            <img src={avatarUrl} alt="avatar" />
          </div>
          <div className={s.loginBox}>
            <Input
              style={{ marginBottom: 20 }}
              size="large"
              prefix={<UserOutlined />}
              value={username}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            />
            <Input.Password
              style={{ marginBottom: 20 }}
              size="large"
              prefix={<LockOutlined />}
              defaultValue="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className={s.btnBox}>
              <Button
                type="primary"
                size="large"
                onClick={() => handleLogin("visitor", "visitor")}
              >
                游客
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => handleLogin(username, password)}
              >
                登录
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
