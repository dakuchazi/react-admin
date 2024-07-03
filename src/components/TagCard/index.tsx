import CustomModal from "../CustomModal";
import { useRequest, useResetState } from "ahooks";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColor } from "./config";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  getTagListAsync,
  selectTagData,
  selectTagLoading,
} from "@/store/slices/tagSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { addTagRequest, deleteTagRequest, updateTagRequest } from "@/utils/api";
import { Input, Popconfirm, message } from "antd";

import s from "./index.module.scss";

const { Search } = Input;

const TagCard: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [oldTag, setOldTag] = useState("");
  const [updateTag, setUpdateTag] = useState("");
  const [newTag, setNewTag, resetNewTag] = useResetState("");
  const tagData = useAppSelector(selectTagData);
  const tagLoading = useAppSelector(selectTagLoading);
  const dispatch = useAppDispatch();

  const { loading: deleteClassloading, run: deleteClassRun } = useRequest(
    deleteTagRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi.success("太好了，删除成功");
          dispatch(getTagListAsync());
        }
      },
    }
  );

  const { loading: updateTypeLoading, run: updateTypeRun } = useRequest(
    updateTagRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi.success("太好了，修改成功");
          modalCancel();
          dispatch(getTagListAsync());
        }
      },
    }
  );

  const { loading: addTypeLoading, run: addTypeRun } = useRequest(
    addTagRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi.success("太好了，新增成功");
          dispatch(getTagListAsync());
          resetNewTag();
        } else {
          messageApi.error(res.message);
        }
      },
    }
  );

  useEffect(() => {
    dispatch(getTagListAsync());
  }, []);

  const openModal = (id: string, name: string) => {
    setIsModalOpen(true);
    setOldTag(name);
    setUpdateTag(name);
    setId(id);
  };

  const modalCancel = () => {
    setIsModalOpen(false);
  };

  const { tagColor, colorLen } = useColor();

  const modalOk = () => {
    if (!updateTag) {
      messageApi.warning("请输入标签名称~");
      return;
    }
    // if (!isAdmin()) {
    //   Message.warning(visitorText);
    //   return;
    // }
    updateTypeRun({ _id: id, name: updateTag });
  };

  const addNewTag = () => {
    if (!newTag) {
      messageApi.warning("请输入标签名称~");
      return;
    }
    // if (!isAdmin()) {
    //   Message.warning(visitorText);
    //   return;
    // }
    addTypeRun({ name: newTag });
  };

  const deleteTag = (id: string) => {
    // if (!isAdmin()) {
    //   Message.warning(visitorText);
    //   return;
    // }
    deleteClassRun({ _id: id });
  };

  const toArticle = (tag: string) => {
    navigate(`/admin/article?searchTag=${encodeURIComponent(tag)}`);
  };

  return (
    <>
      {contextHolder}
      <div className={s.cardBox}>
        <div className={s.title}>标签</div>
        <Search
          allowClear
          placeholder="新建标签"
          enterButton="创建"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onSearch={addNewTag}
        />
        <div
          className={classNames(s.tagsBox, {
            [s.tagLoading]: tagLoading,
          })}
        >
          {tagLoading ? (
            <LoadingOutlined />
          ) : (
            tagData.map(
              ({ _id, name }: { _id: string; name: string }, index: number) => (
                <div
                  key={_id}
                  className={s.tagItem}
                  style={{ backgroundColor: tagColor[index % colorLen] }}
                  onDoubleClick={() => toArticle(_id)}
                >
                  {name}
                  <EditOutlined
                    className={s.iconBtn}
                    onClick={() => openModal(_id, name)}
                  />
                  <Popconfirm
                    placement="bottomRight"
                    title={`确定要删除「${name}」吗？`}
                    onConfirm={() => deleteTag(_id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined className={s.iconBtn} />
                  </Popconfirm>
                </div>
              )
            )
          )}
        </div>
      </div>
      <CustomModal
        title={oldTag}
        isEdit={true}
        isModalOpen={isModalOpen}
        modalOk={modalOk}
        modalCancel={modalCancel}
        confirmLoading={updateTypeLoading}
        render={() => (
          <Input
            value={updateTag}
            onChange={(e) => setUpdateTag(e.target.value)}
          />
        )}
      />
    </>
  );
};

export default React.memo(TagCard);
