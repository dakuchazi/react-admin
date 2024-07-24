import { useRequest, useSetState } from "ahooks";
import React, { useEffect, useState } from "react";
import MyTable from "@/components/MyTable";
import { Button, Popconfirm, TableColumnsType, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteCommentRequest } from "@/utils/api";
import {
  getCommentListAsync,
  selectCommentData,
  selectCommentLoading,
} from "@/store/slices/commentSlice";

import s from "./index.module.scss";

const Comment: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const commentData = useAppSelector(selectCommentData);
  const commentLoading = useAppSelector(selectCommentLoading);
  const [pageParams, setPageParams] = useSetState<{
    pagesize: number;
    current: number;
  }>({
    pagesize: 10,
    current: 1,
  });

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    deleteCommentRequest,
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

  const handleDelete = (_id: string) => {
    deleteRun({ _id });
  };

  const columns: TableColumnsType = [
    {
      title: "昵称",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "联系邮箱",
      align: "center",
      dataIndex: "email",
    },
    {
      title: "网址",
      align: "center",
      dataIndex: "website",
    },
    {
      title: "日期",
      align: "center",
      dataIndex: "createDate",
    },
    {
      title: "内容",
      align: "center",
      dataIndex: "content",
    },
    {
      title: "来源",
      align: "center",
      render: (_, record) => {
        return (
          <div className={s.typeBox}>
            <div
              className={record.from === "art" ? s.comment : s.msg}
              style={record.pid ? { marginRight: 5 } : {}}
            >
              {record.from === "art" ? "文章评论" : "留言板"}
            </div>
            {record.pid && <div className={s.reply}>回复</div>}
          </div>
        );
      },
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <>
          <Button type="primary" style={{ marginRight: 10 }} onClick={() => { window.open('http://blog.xukucha.cn/msg') }}>
            查看
          </Button>
          <Popconfirm
            placement="bottomRight"
            title="确定要删除该友链吗？"
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

  let commentList = commentData.list.map((item) => {
    if (item.children && item.children.length === 0) {
      let { children, ...rest } = item;
      return rest;
    }
    return item;
  });

  useEffect(() => {
    dispatch(getCommentListAsync(pageParams));
  }, [pageParams]);
  return (
    <>
      {contextHolder}
      <MyTable
        loading={commentLoading}
        columns={columns}
        data={commentList}
        total={commentData.total}
        pagesize={pageParams.pagesize}
        current={pageParams.current}
        pageChange={(current, pagesize) => {
          setPageParams({
            current,
            pagesize,
          });
        }}
      />
    </>
  );
};

export default Comment;
