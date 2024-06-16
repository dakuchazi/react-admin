import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import avatarUrl from "@/assets/images/avatar1.png";
import { loginRequest } from "@/utils/api";

import s from "./index.module.scss";

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (account: string, password: string) => {
    if (!account || !password) {
      messageApi.warning("登录失败！请输入账号、密码！");
      return;
    }
    const res = await loginRequest({ account, password });
    res && navigate("admin");
    res
      ? messageApi.success("登录成功！欢迎进入个人博客后台管理系统！")
      : messageApi.warning("登录失败！用户名或密码不正确，请重新登录！");
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
              value={account}
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
                onClick={() => handleLogin(password, password)}
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
