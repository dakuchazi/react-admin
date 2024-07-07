import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MarkDown from "@/components/MarkDown";
import s from "./index.module.scss";
import { Button, DatePicker, Input, Select, message } from "antd";
import { useScrollSync } from "@/hooks/useScrollSync";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectTypeData } from "@/store/slices/typeSlice";
import { selectTagData } from "@/store/slices/tagSlice";
import { useMount, useRequest } from "ahooks";
import { addArticleRequest, updateArticleRequest } from "@/utils/api";
import dayjs from "dayjs";
import {
  getArticleDetailAsync,
  selectArticleDetail,
  setArticleDetail,
} from "@/store/slices/articleSlice";

const AddArticle: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { leftRef, rightRef, handleScrollRun } = useScrollSync();
  const articleDetail = useAppSelector(selectArticleDetail);
  const typeData = useAppSelector(selectTypeData);
  const tagData = useAppSelector(selectTagData);
  const navigate = useNavigate();
  const id = searchParams.get("_id");

  const { loading: addLoading, run: addRun } = useRequest(addArticleRequest, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === "200") {
        messageApi
          .success({
            content: "操作成功",
            duration: 1,
          })
          .then(() => {
            navigate("/article");
          });
      }
    },
  });

  const { loading: updateLoading, run: updateRun } = useRequest(
    updateArticleRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi
            .success({
              content: "操作成功",
              duration: 1,
            })
            .then(() => {
              navigate("/article");
            });
        }
      },
    }
  );

  useMount(() => {
    if (id) {
      dispatch(getArticleDetailAsync({ _id: id }));
    }
  });

  const publish = () => {
    const params: {
      title: string;
      title2?: string;
      tags?: string[];
      createDate?: string;
      content: string;
      typeId?: string;
      isDraft: boolean;
      _id?: string;
    } = { ...articleDetail };
    if (!params.title || !params.content) {
      messageApi.error("中文标题和正文一定要填哦");
      return;
    }
    if (id) {
      updateRun({ ...articleDetail, isDraft: false });
    } else {
      delete params._id;

      addRun({ ...params, isDraft: false });
    }
  };

  const draft = () => {
    const params: {
      title: string;
      title2?: string;
      tags?: string[];
      createDate?: string;
      content: string;
      typeId?: string;
      isDraft: boolean;
      _id?: string;
    } = { ...articleDetail };
    if (!params.title) {
      messageApi.error("中文标题一定要填哦");
      return;
    }
    params.isDraft = true;
    //不是草稿
    //    点存草稿  相当于新增一篇文章，isDraft为true
    //
    //是草稿
    //    有id——>更新草稿
    //    无id——>新增一篇草稿
    if (!articleDetail.isDraft) {
      delete params._id;
      addRun(params);
    } else {
      if (id) {
        updateRun(articleDetail);
      } else {
        delete params._id;
        addRun(params);
      }
    }
  };

  const publishBtnText = () => {
    if (articleDetail.isDraft) {
      if (id) {
        return "发布草稿";
      } else {
        return "发布文章";
      }
    } else {
      return "更新文章";
    }
  };

  return (
    <>
      {contextHolder}
      <div className={s.addArticleHeader}>
        <div className={s.top}>
          <Input
            className={s.chineseTitle}
            placeholder="请输入中文标题"
            style={{ width: 600 }}
            allowClear
            value={articleDetail.title}
            onChange={(e) =>
              dispatch(
                setArticleDetail({ ...articleDetail, title: e.target.value })
              )
            }
          />
          <Input
            style={{ width: 400, marginRight: 10 }}
            placeholder="请输入英文标题"
            allowClear
            value={articleDetail.title2}
            onChange={(e) =>
              dispatch(
                setArticleDetail({ ...articleDetail, title2: e.target.value })
              )
            }
          />
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => draft()}
          >
            存为草稿
          </Button>
          <Button
            type="primary"
            disabled={addLoading}
            onClick={() => publish()}
          >
            {publishBtnText()}
          </Button>
        </div>
        <div className={s.bottom}>
          <Select
            placeholder="请选择文章分类"
            className={s.classText}
            showSearch
            allowClear
            optionFilterProp="label"
            value={articleDetail.typeId}
            onChange={(value) =>
              dispatch(setArticleDetail({ ...articleDetail, typeId: value }))
            }
            options={typeData.map(
              ({ name, _id }: { name: string; _id: string }) => ({
                label: name,
                value: _id,
              })
            )}
          />
          <Select
            placeholder="请选择文章标签"
            className={s.tags}
            maxTagCount={6}
            mode="multiple"
            showSearch
            allowClear
            optionFilterProp="label"
            value={articleDetail.tags}
            onChange={(value) =>
              dispatch(setArticleDetail({ ...articleDetail, tags: value }))
            }
            options={tagData.map(
              ({ name, _id }: { name: string; _id: string }) => ({
                label: name,
                value: _id,
              })
            )}
          />
          <DatePicker
            placeholder="请选择时间"
            showTime
            value={
              articleDetail.createDate ? dayjs(articleDetail.createDate) : ""
            }
            onChange={(value, dateString) => {
              dispatch(
                setArticleDetail({
                  ...articleDetail,
                  createDate: dateString as string,
                })
              );
            }}
          />
        </div>
      </div>
      <div className={s.contentEdit}>
        <textarea
          ref={leftRef}
          className={classNames(s.markedEdit, s.input)}
          value={articleDetail.content}
          onChange={(e) =>
            dispatch(
              setArticleDetail({
                ...articleDetail,
                content: e.target.value,
              })
            )
          }
          onScroll={handleScrollRun}
        />
        <MarkDown
          ref={rightRef}
          className={s.markedEdit}
          content={articleDetail.content}
          onScroll={handleScrollRun}
        />
      </div>
    </>
  );
};

export default AddArticle;
