import { useRequest, useSetState } from "ahooks";
import React, { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import ImgView from "@/components/ImgView";
import MyTable from "@/components/MyTable";
import PageHeader from "@/components/PageHeader";
import {
  Button,
  Input,
  Popconfirm,
  TableColumnsType,
  message,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { getWorkListAsync, selectWorkData, selectWorkLoading } from "@/store/slices/workSlice";
import { addWorkRequest, deletePostRequest, deleteWorkRequest, updateWorkRequest } from "@/utils/api";

import s from "./index.module.scss";

const Work: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const [isViewShow, setIsViewShow] = useState(false);
  const workData = useAppSelector(selectWorkData);
  const workLoading = useAppSelector(selectWorkLoading);
  const [workDetail, setWorkDetail] = useSetState<{
    createDate: string;
    name: string;
    cover: string;
    description: string
    link: string
    _id: string;
  }>({
    createDate: '',
    name: '',
    cover: '',
    description: '',
    link: '',
    _id: ''
  });
  const [pageParams, setPageParams] = useSetState<{
    pagesize: number;
    current: number;
  }>({
    pagesize: 10,
    current: 1,
  });

  const { loading: updateWorkLoading, run: updateWorkRun } = useRequest(
    updateWorkRequest,
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
              await dispatch(getWorkListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        } else {
          messageApi.error("操作出错了");
        }
      },
    }
  );

  const { loading: addWorkLoading, run: addWorkRun } = useRequest(
    addWorkRequest,
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
              await dispatch(getWorkListAsync({ current: 1, pagesize: 10 }));
              setIsModalOpen(false);
            });
        } else {
          messageApi.error("操作出错了");
        }
      },
    }
  );

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    deleteWorkRequest,
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
    dispatch(getWorkListAsync(pageParams));
  }, [pageParams]);

  useEffect(() => {
    if (!isModalOpen) {
      setWorkDetail({
        createDate: '',
        name: '',
        cover: '',
        description: '',
        link: '',
        _id: ''
      });
    }
  }, [isModalOpen]);

  const modalCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleEdit = (record: {
    _id: string;
    name: string;
    cover: string;
    description: string
    link: '',
  }) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setWorkDetail(record);
  };

  const handleModalOk = () => {
    if (workDetail._id) {
      updateWorkRun(workDetail);
    } else {
      addWorkRun({
        name: workDetail.name,
        cover: workDetail.cover,
        description: workDetail.description,
        link: workDetail.link,
      });
    }
  };

  const onClickImg = (url: string) => {
    setIsViewShow(true);
    setImgUrl(url);
  };

  const handleDelete = (_id: string) => {
    deleteRun({ _id });
  };

  const dataFilter = [
    {
      text: '名称',
      data: workDetail.name,
      setData: (value: any) => setWorkDetail({ name: value }),
      require: true
    },
    {
      text: '链接',
      data: workDetail.link,
      setData: (value: any) => setWorkDetail({ link: value }),
      require: true
    },
    {
      text: '封面',
      data: workDetail.cover,
      setData: (value: any) => setWorkDetail({ cover: value }),
      require: true
    },
    {
      text: '描述',
      data: workDetail.description,
      setData: (value: any) => setWorkDetail({ description: value }),
      require: true
    }
  ];

  const render = () => (
    dataFilter.map(({ text, data, setData }, index) => (
      <Input
        size='large'
        key={index}
        addonBefore={text}
        value={data as string}
        onChange={(e) => setData(e.target.value)}
        className={s.modalInput}
      />
    ))
  );

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
      title: "封面",
      align: "center",
      dataIndex: "cover",
      render: (cover: string) => (
        <div className={s.tableCoverBox}>
          <img
            src={cover}
            alt='cover'
            className={s.tableCover}
            onClick={() => onClickImg(cover)}
          />
        </div>
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
  return (
    <>
      {contextHolder}
      <PageHeader text="添加作品" onClick={() => setIsModalOpen(true)} />
      <MyTable
        loading={workLoading}
        columns={columns}
        data={workData.list}
        total={workData.total}
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
        confirmLoading={updateWorkLoading}
        render={render}
        addText="发表"
        updateText="修改"
        title="作品"
      />
      <ImgView
        isViewShow={isViewShow}
        viewUrl={imgUrl}
        onClick={() => setIsViewShow(false)}
      />
    </>
  );
};

export default Work

