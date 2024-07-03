import { useRequest, useResetState, useSetState } from "ahooks";
import React, { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import MyTable from "@/components/MyTable";
import PageHeader from "@/components/PageHeader";
import { Button, Input, Popconfirm, TableColumnsType, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getLinkListAsync,
  selectLinkData,
  selectLinkLoading,
} from "@/store/slices/linkSlice";
import {
  addLinkRequest,
  deleteLinkRequest,
  updateLinkRequest,
} from "@/utils/api";

import s from "./index.module.scss";

const Link: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdit, setIsEdit] = useState(false);
  const linkData = useAppSelector(selectLinkData);
  const linkLoading = useAppSelector(selectLinkLoading);
  const [linkDetail, setLinkDetail] = useSetState<{
    createDate: string;
    avatar: string;
    description: string;
    link: string;
    name: string;
    _id: string;
  }>({
    createDate: "",
    avatar: "",
    description: "",
    link: "",
    name: "",
    _id: "",
  });

  const [pageParams, setPageParams] = useSetState<{
    pagesize: number;
    current: number;
  }>({
    pagesize: 10,
    current: 1,
  });

  const { loading: updateLinkLoading, run: updateLinkRun } = useRequest(
    updateLinkRequest,
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
              await dispatch(getLinkListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        }
      },
    }
  );

  const { loading: addLinkLoading, run: addLinkRun } = useRequest(
    addLinkRequest,
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
              await dispatch(getLinkListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        }
      },
    }
  );

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    deleteLinkRequest,
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
    dispatch(getLinkListAsync(pageParams));
  }, [pageParams]);

  useEffect(() => {
    if (!isModalOpen) {
      setLinkDetail({
        createDate: "",
        avatar: "",
        description: "",
        link: "",
        name: "",
        _id: "",
      });
    }
  }, [isModalOpen]);

  const modalCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleEdit = (record: typeof linkDetail) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setLinkDetail(record);
  };

  const handleModalOk = () => {
    if (linkDetail._id) {
      updateLinkRun(linkDetail);
    } else {
      addLinkRun({
        name: linkDetail.name,
        createDate: linkDetail.createDate,
        avatar: linkDetail.avatar,
        link: linkDetail.link,
        description: linkDetail.description,
      });
    }
  };

  const handleDelete = (_id: string) => {
    deleteRun({ _id });
  };

  const columns: TableColumnsType = [
    {
      title: "名称",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "链接",
      align: "center",
      dataIndex: "link",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "头像",
      align: "center",
      dataIndex: "avatar",
      render: (avatar: string) => (
        <img src={avatar} alt="img" style={{ width: "50px" }} />
      ),
    },
    {
      title: "描述",
      align: "center",
      dataIndex: "description",
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
            更新
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

  const dataFilter = [
    {
      text: "名称",
      data: linkDetail.name,
      setData: (value: any) => setLinkDetail({ name: value }),
      require: true,
    },
    {
      text: "链接",
      data: linkDetail.link,
      setData: (value: any) => setLinkDetail({ link: value }),
      require: true,
    },
    {
      text: "头像",
      data: linkDetail.avatar,
      setData: (value: any) => setLinkDetail({ avatar: value }),
      require: true,
    },
    {
      text: "描述",
      data: linkDetail.description,
      setData: (value: any) => setLinkDetail({ description: value }),
      require: true,
    },
  ];

  const render = () =>
    dataFilter.map(({ text, data, setData }, index) => (
      <Input
        size="large"
        key={index}
        addonBefore={text}
        value={data as string}
        onChange={(e) => setData(e.target.value)}
        className={s.modalInput}
      />
    ));

  return (
    <>
      {contextHolder}
      <PageHeader text="添加友链" onClick={() => setIsModalOpen(true)} />
      <MyTable
        loading={linkLoading}
        columns={columns}
        data={linkData.list}
        total={linkData.total}
        pagesize={pageParams.pagesize}
        current={pageParams.current}
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
        confirmLoading={updateLinkLoading}
        addText="发表"
        updateText="修改"
        render={render}
        title="友链"
      />
    </>
  );
};

export default Link;
