import { useRequest, useResetState } from 'ahooks';
import classNames from 'classnames';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../CustomModal';
import style from './index.module.scss';
import { Input, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTypesListAsync, selectCardLoading, selectTypesData } from '@/store/slices/homeSlice';
import { addTypeRequest, deleteTypeRequest, updateTypeRequest } from '@/utils/api';

const { Search } = Input;

const ClassCard: React.FC = () => {
  const dispatch = useAppDispatch()
  const typeData = useAppSelector(selectTypesData);
  const typeCardLoading = useAppSelector(selectCardLoading);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [updatetypeName, setUpdateTypeName] = useState('');
  const [oldTypeName, setOldTypeName] = useResetState('');
  const [newTypeName, setNewTypeName, resetNewTypeName] = useResetState('');

  const { loading: deleteClassloading, run: deleteClassRun } = useRequest(deleteTypeRequest, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === '200') {
        messageApi.success("太好了，删除成功");
        dispatch(getTypesListAsync())
      } else {
        messageApi.error("出错了，删除失败");
        dispatch(getTypesListAsync())
      }
    }
  })

  const { loading: updateTypeLoading, run: updateTypeRun } = useRequest(updateTypeRequest, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === '200') {
        messageApi.success("太好了，修改成功");
        modalCancel();
        dispatch(getTypesListAsync())
      } else {
        messageApi.error("出错了，修改失败");
      }
    }
  })

  const openModal = (id: string, name: string) => {
    setIsModalOpen(true);
    setId(id);
    setOldTypeName(name)
    setUpdateTypeName(name)
  };

  const modalCancel = () => {
    setIsModalOpen(false);
  };

  const toArticle = (classText: string) => {
    navigate(`/admin/article?searchClass=${encodeURIComponent(classText)}`);
  };

  const addNewClass = async () => {
    if (!newTypeName) {
      messageApi.warning('请输入分类名称~');
      return;
    }
    const res = await addTypeRequest({ name: newTypeName })
    if (res.code === '200') {
      messageApi.success("太好了，新增成功");
      dispatch(getTypesListAsync())
      resetNewTypeName()
    } else {
      messageApi.error(res.message);
    }

  }

  const deleteClass = async (id: string) => {
    deleteClassRun({ _id: id })
  }

  const modalOk = () => {
    if (!updatetypeName) {
      messageApi.warning('请输入分类名称~');
      return;
    }
    updateTypeRun({ _id: id, name: updatetypeName })
  };
  return (
    <>
      {contextHolder}
      <div className={style.cardBox}>
        <div className={style.title}>分类</div>
        <Search
          allowClear
          placeholder='新建分类'
          enterButton='创建'
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          onSearch={addNewClass}
        />
        <div className={classNames(style.classesBox, { [style.classLoading]: typeCardLoading })}>
          {typeCardLoading ? (
            <LoadingOutlined />
          ) : (
            typeData.length && typeData.map(
              ({
                _id,
                name,
                count
              }: {
                _id: string;
                name: string;
                count: number;
              }) => (
                <div key={_id} className={style.classItem}>
                  <div className={style.count}>{count}</div>
                  <div className={style.classTextBox}>
                    <div className={style.classText} onClick={() => toArticle(_id)}>
                      {name}
                    </div>
                  </div>
                  <Button
                    type='primary'
                    className={style.classBtn}
                    icon={<EditOutlined />}
                    onClick={() => openModal(_id, name)}
                    disabled={_id === '6bd0f56b664140aa000c4fa00bdeb852' || deleteClassloading}
                  />
                  <Popconfirm
                    placement="topRight"
                    title={`确定要删除 [${name}] 吗？`}
                    onConfirm={() => deleteClass(_id)}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button
                      style={{ width: 30, height: 30 }}
                      type='primary'
                      danger
                      className={style.classBtn}
                      icon={<DeleteOutlined />}
                      disabled={_id === '6bd0f56b664140aa000c4fa00bdeb852' || deleteClassloading}
                    />
                  </Popconfirm>
                </div>
              )
            )
          )}
        </div>
      </div>
      {<CustomModal
        title={oldTypeName}
        isEdit={true}
        isModalOpen={isModalOpen}
        confirmLoading={updateTypeLoading}
        modalOk={modalOk}
        modalCancel={modalCancel}
        render={() => (
          <Input
            value={updatetypeName}
            onChange={(e) => setUpdateTypeName(e.target.value)}
          />
        )}
      />}
    </>
  );
}

export default ClassCard;

