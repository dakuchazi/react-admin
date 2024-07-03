import { Input, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRequest, useResetState } from "ahooks";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

import CustomModal from "../CustomModal";
import Emoji from "../Emoji";
import { updateNoticeRequest } from "@/utils/api";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getNoticeListAsync,
  selectNoticeData,
  selectNoticeLoading,
} from "@/store/slices/noticeSlice";

import s from "./index.module.scss";

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
          modalCancel();
          dispatch(getNoticeListAsync());
        }
      },
    }
  );

  useEffect(() => {
    dispatch(getNoticeListAsync());
  }, []);

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
      <div className={s.cardBox}>
        <div className={s.title}>公告</div>
        <div
          className={classNames(s.noticeText, {
            [s.loading]: noticeLoading,
          })}
          onClick={openModal}
        >
          {noticeLoading ? <LoadingOutlined /> : noticeDate?.content}
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

export default React.memo(NoticeCard);
