import { Input, Button, Popconfirm, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useMount, useRequest, useResetState } from "ahooks";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import CustomModal from "../CustomModal";
import Emoji from "../Emoji";
import style from "./index.module.scss";
import { updateNoticeRequest } from "@/utils/api";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getNoticeListAsync,
  selectNoticeData,
  selectNoticeLoading,
} from "@/store/slices/noticeSlice";

const { TextArea } = Input;

const NoticeCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localNotice, setLocalNotice, resetLocalNotice] = useResetState("");
  const [messageApi, contextHolder] = message.useMessage();

  const noticeDate = useAppSelector(selectNoticeData);
  const noticeLoading = useAppSelector(selectNoticeLoading);
  const dispatch = useAppDispatch();

  const { loading: updateNoticeLoading, run: updateNoticeRun } = useRequest(
    updateNoticeRequest,
    {
      retryCount: 3,
      manual: true,
      onSuccess(res) {
        if (res.code === "200") {
          messageApi.success("太好了，修改成功");
          dispatch(getNoticeListAsync());
        } else {
          messageApi.error("出错了，修改失败");
          dispatch(getNoticeListAsync());
        }
      },
    }
  );

  useEffect(() => {
    dispatch(getNoticeListAsync());
  }, []);

  // useMount(() => {
  //   if (!reduxNotice.isDone) {
  //     run();
  //   }
  // });

  const openModal = () => {
    setIsModalOpen(true);
    setLocalNotice(noticeDate.content);
  };

  const modalCancel = () => {
    setIsModalOpen(false);
    resetLocalNotice();
  };

  const modalOk = () => {
    if (!localNotice) {
      messageApi.warning("请输入公告内容~");
      return;
    }
    updateNoticeRun({ ...noticeDate, content: localNotice });
    // if (!isAdmin()) {
    //   messageApi.warning(visitorText);
    //   return;
    // }
  };

  const render = () => (
    <>
      <TextArea
        placeholder="请输入公告内容"
        maxLength={21 * 4}
        allowClear
        showCount
        value={localNotice}
        onChange={(e) => setLocalNotice(e.target.value)}
        autoSize={false}
        style={{
          height: 100,
          resize: "none",
        }}
      />
      <Emoji style={{ marginTop: 10 }} />
    </>
  );

  return (
    <>
      {contextHolder}
      <div className={style.cardBox}>
        <div className={style.title}>公告</div>
        <div
          className={classNames(style.noticeText, {
            [style.loading]: noticeLoading,
          })}
          onClick={openModal}
        >
          {noticeLoading ? <LoadingOutlined /> : noticeDate.content}
        </div>
      </div>
      <CustomModal
        isEdit={true}
        title={"公告"}
        isModalOpen={isModalOpen}
        modalOk={modalOk}
        modalCancel={modalCancel}
        render={render}
        confirmLoading={updateNoticeLoading}
      />
    </>
  );
};

export default NoticeCard;
