import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MarkDown from "@/components/MarkDown";
import s from "./index.module.scss";
import { Button, DatePicker, Input, Select, message } from "antd";
import { useScrollSync } from "@/hooks/useScrollSync";
import { useAppSelector } from "@/store";
import { selectTypeData } from "@/store/slices/typeSlice";
import { selectTagData } from "@/store/slices/tagSlice";
import { useMount, useRequest, useSetState } from "ahooks";
import {
  addArticleRequest,
  getArticleDetailRequest,
  updateArticleRequest,
} from "@/utils/api";
import dayjs from "dayjs";

const AddArticle: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { leftRef, rightRef, handleScrollRun } = useScrollSync();
  const [articleDetail, setArticleDetail] = useSetState<{
    title: string;
    title2?: string;
    tags?: string[];
    createDate?: string;
    content: string;
    typeId?: string;
  }>({
    title: "",
    title2: "",
    tags: [],
    createDate: "",
    content: "",
  });
  const typeData = useAppSelector(selectTypeData);
  const tagData = useAppSelector(selectTagData);
  const navigate = useNavigate();
  // 文章/草稿 更新逻辑
  const id = searchParams.get("_id");
  const from = searchParams.get("from");

  const { loading: addLoading, run: addRun } = useRequest(addArticleRequest, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === "200") {
        messageApi.success("太好了，新增成功");
        messageApi.success("等下跳转到列表页");
      } else {
        messageApi.error(res.message);
      }
    },
  });

  const { loading: getDetailLoading, run: getDetailRun } = useRequest(
    getArticleDetailRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          setArticleDetail(res.data);
        } else {
          messageApi.error("出错了，查询详情失败");
        }
      },
    }
  );

  const { loading: updateLoading, run: updatelRun } = useRequest(
    updateArticleRequest,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          messageApi.success("太好了，修改成功");
          getDetailRun({ _id: id as string });
        } else {
          messageApi.error("出错了，修改失败");
        }
      },
    }
  );

  useMount(() => {
    if (id) {
      getDetailRun({ _id: id });
    }
  });
  // 新建页面：
  //   发布：
  //     选择了分类：classCount++
  //     未选择分类：
  //   存草稿：

  // 编辑页面：
  //   文章页进来：
  //     发布：
  //       修改了分类：
  //         新的不为空：old--，new++
  //         新的为空：old--
  //       未修改分类：
  //     存草稿：非空old--
  //   草稿页进来：
  //     发布：
  //       选择了分类：classCount++
  //       未选择分类：
  //     存草稿：

  const publish = () => {
    if (id) {
      updatelRun({ _id: id, ...articleDetail });
    } else {
      addRun(articleDetail);
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
            onChange={(e) => setArticleDetail({ title: e.target.value })}
          />
          <Input
            style={{ width: 400, marginRight: 10 }}
            placeholder="请输入英文标题"
            allowClear
            value={articleDetail.title2}
            onChange={(e) => setArticleDetail({ title2: e.target.value })}
          />
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => {
              console.log("===点击存为草稿===");
            }}
          >
            存为草稿
          </Button>
          <Button
            type="primary"
            disabled={addLoading}
            onClick={() => publish()}
          >
            {id ? "更新" : "发布"}文章
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
            onChange={(value) => setArticleDetail({ typeId: value })}
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
            onChange={(value) => setArticleDetail({ tags: value })}
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
              setArticleDetail({ createDate: dateString as string });
            }}
          />
        </div>
      </div>
      <div className={s.contentEdit}>
        <textarea
          ref={leftRef}
          className={classNames(s.markedEdit, s.input)}
          value={articleDetail.content}
          onChange={(e) => setArticleDetail({ content: e.target.value })}
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
