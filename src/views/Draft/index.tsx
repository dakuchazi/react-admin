import { useRequest, useSetState } from "ahooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTable from "@/components/MyTable";
import { Button, Popconfirm, TableColumnsType, Tag, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getArticleListAsync,
  selectArticleData,
  selectArticleLoading,
} from "@/store/slices/articleSlice";
import { deleteArticleRequest } from "@/utils/api";
import TableTag from "@/components/TableTag";

const Draft: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const articleData = useAppSelector(selectArticleData);
  const articleLoading = useAppSelector(selectArticleLoading);
  const [messageApi, contextHolder] = message.useMessage();

  const [pageParams, setPageParams] = useSetState<{
    pagesize: number;
    current: number;
  }>({
    pagesize: 10,
    current: 1,
  });

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    deleteArticleRequest,
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
    dispatch(getArticleListAsync({ ...pageParams, isDraft: true }));
  }, [pageParams]);

  const handleEdit = (id: string) => {
    navigate(`/addArticle?_id=${id}`);
  };

  const handleDelete = (id: string) => {
    // if (!isAdmin()) {
    //   Message.warning(visitorText);
    //   return;
    deleteRun({ _id: id });
  };

  const columns: TableColumnsType = [
    {
      title: "标题",
      align: "center",
      dataIndex: "title",
      render: (title: string) => <strong>{title}</strong>,
    },
    {
      title: "发布日期",
      align: "center",
      dataIndex: "createDate",
      render: (createDate: string) => <>{createDate}</>,
    },
    {
      title: "分类",
      align: "center",
      dataIndex: "type",
      render: (classText: string) => (
        <>{classText ? <Tag color="#2db7f5">{classText}</Tag> : null}</>
      ),
    },
    {
      title: "标签",
      align: "center",
      dataIndex: "tags",
      render: (tags: string[]) => <TableTag tags={tags} />,
    },
    {
      title: "操作",
      align: "center",
      render: (_: any, { _id, url }: { _id: string; url: string }) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => {
              console.log("===点击了查看跳转到博客===");
            }}
          >
            查看
          </Button>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(_id)}
          >
            编辑
          </Button>
          <Popconfirm
            placement="bottomRight"
            title="确定要删除该文章吗？"
            onConfirm={() => handleDelete(_id)}
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
      {
        <MyTable
          loading={articleLoading}
          columns={columns}
          data={articleData.list}
          total={articleData.total}
          current={pageParams.current}
          pagesize={pageParams.pagesize}
          pageChange={(current, pagesize) => {
            setPageParams({
              current,
              pagesize,
            });
          }}
        />
      }
    </>
  );
};

export default Draft;
