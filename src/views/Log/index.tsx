import { useRequest, useResetState, useSetState } from "ahooks";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import Emoji from "@/components/Emoji";
import ImgView from "@/components/ImgView";
import MyTable from "@/components/MyTable";
import PageHeader from "@/components/PageHeader";
import {
  Button,
  DatePicker,
  Popconfirm,
  TableColumnsType,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getLogListAsync,
  selectLogData,
  selectLogLoading,
} from "@/store/slices/logSlice";
import { addLogRequest, deleteLogRequest, updateLogRequest } from "@/utils/api";

import s from "./index.module.scss";

const Log: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isViewShow, setIsViewShow] = useState(false);
  const logData = useAppSelector(selectLogData);
  const logLoading = useAppSelector(selectLogLoading);
  const [logDetail, setLogDetail] = useSetState<{
    createDate: string;
    content: string;
    _id: string;
  }>({
    createDate: "",
    content: "",
    _id: "",
  });
  const [pageParams, setPageParams] = useSetState<{
    pagesize: number;
    current: number;
  }>({
    pagesize: 10,
    current: 1,
  });
  const dispatch = useAppDispatch();

  const { loading: updateLogLoading, run: updateLogRun } = useRequest(
    updateLogRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi
            .success({
              content: "操作成功",
              duration: 0.5,
            })
            .then(async () => {
              await dispatch(getLogListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        }
      },
    }
  );
  const { loading: addLogLoading, run: addLogRun } = useRequest(addLogRequest, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === "200") {
        messageApi
          .success({
            content: "操作成功",
            duration: 1,
          })
          .then(async () => {
            await dispatch(getLogListAsync({ current: 1, pagesize: 10 }));
            setIsModalOpen(false);
          });
      }
    },
  });
  const { loading: deleteLoading, run: deleteRun } = useRequest(
    deleteLogRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi.success("太好了，删除成功");
          setPageParams({
            pagesize: 10,
            current: 1,
          });
        }
      },
    }
  );

  useEffect(() => {
    dispatch(getLogListAsync(pageParams));
  }, [pageParams]);

  useEffect(() => {
    if (!isModalOpen) {
      setLogDetail({
        createDate: "",
        content: "",
        _id: "",
      });
    }
  }, [isModalOpen]);

  const modalCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleEdit = (record: {
    createDate: string;
    _id: string;
    content: string;
  }) => {
    setIsModalOpen(true);
    setIsEdit(true);
    console.log("===record====", record);

    setLogDetail(record);
  };

  const handleModalOk = () => {
    if (logDetail._id) {
      updateLogRun(logDetail);
    } else {
      addLogRun({
        content: logDetail.content,
        createDate: logDetail.createDate,
      });
    }
  };

  const onClickImg = (url: string) => {
    setImgUrl(url);
  };

  const handleDelete = (_id: string) => {
    deleteRun({ _id });
  };

  const render = () => (
    <>
      <DatePicker
        style={{ marginBottom: "10px" }}
        placeholder="请选择时间"
        showTime
        value={logDetail.createDate ? dayjs(logDetail.createDate) : ""}
        onChange={(value, dateString) => {
          setLogDetail({ createDate: dateString as string });
        }}
      />
      <TextArea
        placeholder="日志内容"
        style={{ resize: "none", marginBottom: 10, height: 100 }}
        value={logDetail.content}
        onChange={(e) => setLogDetail({ content: e.target.value })}
      />
      <Emoji />
    </>
  );

  const columns: TableColumnsType = [
    {
      title: "发布日期",
      align: "center",
      dataIndex: "createDate",
    },

    {
      title: "日志内容",
      dataIndex: "content",
      align: "center",
      render: (content: string) => (
        <div style={{ width: "100%", height: "100%" }}>
          <div
            style={{
              margin: "auto",
              width: 500,
            }}
          >
            {content}
          </div>
        </div>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(record)}
          >
            修改
          </Button>
          <Popconfirm
            placement="bottomRight"
            title="确定要删除该日志吗？"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <PageHeader text="发表日志" onClick={() => setIsModalOpen(true)} />
      <MyTable
        loading={logLoading}
        columns={columns}
        data={logData.list}
        total={logData.total}
        current={pageParams.current}
        pagesize={pageParams.pagesize}
        pageChange={(current, pagesize) => {
          setPageParams({
            current,
            pagesize,
          });
        }}
      />

      <CustomModal
        isEdit={isEdit}
        isModalOpen={isModalOpen}
        modalOk={handleModalOk}
        modalCancel={modalCancel}
        confirmLoading={updateLogLoading}
        render={render}
        addText="发表"
        updateText="修改"
        title="日志"
      />
      <ImgView
        isViewShow={isViewShow}
        viewUrl={imgUrl}
        onClick={() => setIsViewShow(false)}
      />
    </>
  );
};

export default Log;
