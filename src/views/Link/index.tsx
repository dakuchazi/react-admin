import { useRequest, useResetState, useSetState } from "ahooks";
import React, { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import MyTable from "@/components/MyTable";
import PageHeader from "@/components/PageHeader";
import { Button, Popconfirm, TableColumnsType, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getLinkListAsync,
  selectLinkData,
  selectLinkLoading,
} from "@/store/slices/linkSlice";
import { addLinkRequest, updateLinkRequest } from "@/utils/api";

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
        } else {
          messageApi.error("操作出错了");
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
        } else {
          messageApi.error("操作出错了");
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

  const openModal = () => {
    setIsModalOpen(true);
  };

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
    console.log(_id);
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
    },
    {
      title: "描述",
      align: "center",
      dataIndex: "descr",
    },
    {
      title: "操作",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(record)}
          >
            更新.
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

  return (
    <>
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
      />
    </>
  );
};

export default Link;
