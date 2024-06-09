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
  Popover,
  TableColumnsType,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getPostListAsync,
  selectPostData,
  selectPostLoading,
} from "@/store/slices/postSlice";
import { FileImageOutlined } from "@ant-design/icons";
import { addPostRequest, deletePostRequest, updatePostRequest } from "@/utils/api";

import s from "./index.module.scss";

const Say: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const [isViewShow, setIsViewShow] = useState(false);
  const postData = useAppSelector(selectPostData);
  const postLoading = useAppSelector(selectPostLoading);
  const [postDetail, setPostDetail] = useSetState<{
    createDate: string;
    content: string;
    imgs: string[];
    _id: string;
  }>({
    createDate: "",
    content: "",
    imgs: [],
    _id: "",
  });
  const [pageParams, setPageParams] = useSetState<{
    pagesize: number;
    current: number;
  }>({
    pagesize: 10,
    current: 1,
  });

  const { loading: updatePostLoading, run: updatePostRun } = useRequest(
    updatePostRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi
            .success({
              content: "操作成功",
              duration: 1,
            })
            .then(async () => {
              await dispatch(getPostListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        } else {
          messageApi.error("操作出错了");
        }
      },
    }
  );

  const { loading: addPostLoading, run: addPostRun } = useRequest(
    addPostRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi
            .success({
              content: "操作成功",
              duration: 1,
            })
            .then(async () => {
              await dispatch(getPostListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        } else {
          messageApi.error("操作出错了");
        }
      },
    }
  );

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    deletePostRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi.success("太好了，删除成功");
          setPageParams({
            pagesize: 10,
            current: 1,
          });
        } else {
          messageApi.error("出错了，删除失败");
        }
      },
    }
  );

  useEffect(() => {
    dispatch(getPostListAsync(pageParams));
  }, [pageParams]);

  useEffect(() => {
    if (!isModalOpen) {
      setPostDetail({
        createDate: "",
        content: "",
        imgs: [],
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
    imgs: string[];
  }) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setPostDetail(record);
  };

  const handleModalOk = () => {
    if (postDetail._id) {
      updatePostRun(postDetail);
    } else {
      addPostRun({
        content: postDetail.content,
        createDate: postDetail.createDate,
        imgs: postDetail.imgs,
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
        value={postDetail.createDate ? dayjs(postDetail.createDate) : ""}
        onChange={(value, dateString) => {
          setPostDetail({ createDate: dateString as string });
        }}
      />
      <TextArea
        placeholder="说说内容"
        style={{ resize: "none", marginBottom: 10, height: 100 }}
        value={postDetail.content}
        onChange={(e) => setPostDetail({ content: e.target.value })}
      />

      <TextArea
        style={{ resize: "none", marginBottom: 10, height: 98 }}
        placeholder="（可选）插入图片url，回车分隔，最多4张"
        value={postDetail.imgs.join(`\n`)}
        onChange={(e) => {
          setPostDetail({ content: e.target.value });
        }}
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
      title: "图片",
      align: "center",
      dataIndex: "imgs",
      render: (imgs: string[]) =>
        imgs?.length ? (
          <Popover
            placement="right"
            className={s.imgsPopover}
            content={
              <div className={s.imgsBox}>
                {imgs?.map((url, index) => (
                  <div
                    key={index}
                    className={s.imgDiv}
                    onClick={() => onClickImg(url)}
                  >
                    <img src={url} alt="img" className={s.img} />
                  </div>
                ))}
              </div>
            }
            trigger="hover"
          >
            <div className={s.imgHover}>
              <FileImageOutlined />
            </div>
          </Popover>
        ) : null,
    },
    {
      title: "说说内容",
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
            title="确定要删除该说说吗？"
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
      <PageHeader text="发表说说" onClick={() => setIsModalOpen(true)} />
      <MyTable
        loading={postLoading}
        columns={columns}
        data={postData.list}
        total={postData.total}
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
        confirmLoading={updatePostLoading}
        render={render}
        addText="发表"
        updateText="修改"
        title="说说"
      />
      <ImgView
        isViewShow={isViewShow}
        viewUrl={imgUrl}
        onClick={() => setIsViewShow(false)}
      />
    </>
  );
};

export default Say;
