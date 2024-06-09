import axios from "./axios";

// 与后台约定的业务数据规范
type AxiosData<T = any> = {
  message: string;
  code: string;
  data: T;
};

//响应拦截器返回来的res的type
type AxiosRes<T = AxiosData> = {
  config: Object;
  data: T;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

//获取首页4个卡片的数据 /api/home/getCardData
export type CountData = {
  title: string;
  total: number | null;
};
export const getCountDataRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<CountData[]> = await axios.get(
      "/api/home/getCountData"
    );
    resovle(res.data);
  }) as Promise<CountData[]>;
};

//获取所有的分类列表 /api/type/getTypeList
export type TypeData = {
  _id: string;
  name: string;
  createDate: string;
  count: number;
};
export const getTypeListRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<TypeData[]> = await axios.get("/api/type/getTypeList");
    resovle(res.data);
  }) as Promise<TypeData[]>;
};

//删除分类 /api/type/deleteType
export const deleteTypeRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/type/deleteType", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//添加分类 /api/type/addType
export const addTypeRequest = (parmas: { name: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/type/addType", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//更新分类 /api/type/updateType
export const updateTypeRequest = (parmas: { name: string; _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/type/updateType", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取公告列表 /api/notice/getNoticeList
export const getNoticeListRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.get("/api/notice/getNoticeList");
    resovle(res.data);
  }) as Promise<AxiosData>;
};

//更新公告 /api/notice/updateNotice
export const updateNoticeRequest = (parmas: {
  content: string;
  _id: string;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/notice/updateNotice", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取所有的标签列表 /api/tag/getTagList
export type TagData = {
  _id: string;
  name: string;
  createDate: string;
};
export const getTagListRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<TypeData[]> = await axios.get("/api/tag/getTagList");
    resovle(res.data);
  }) as Promise<TagData[]>;
};

//删除分类 /api/tag/deleteTag
export const deleteTagRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/tag/deleteTag", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//添加分类 /api/tag/addTag
export const addTagRequest = (parmas: { name: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/tag/addTag", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//更新分类 /api/tag/updateTag
export const updateTagRequest = (parmas: { name: string; _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/tag/updateTag", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取文章列表 /api/article/getArticleList
export type ArticleData = {
  list:
    | {
        _id: string;
        createDate: string;
        title: string;
        type: string;
        tags: string;
      }[]
    | [];
  total: number;
};
export const getArticleListRequest = (params: {
  title?: string;
  tags?: string[];
  type?: string;
  pagesize: number;
  current: number;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<ArticleData> = await axios.post(
      "/api/article/getArticleList",
      params
    );
    resovle(res.data);
  }) as Promise<ArticleData>;
};

//删除文章 /api/article/deleteArticle
export const deleteArticleRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post(
      "/api/article/deleteArticle",
      parmas
    );
    resovle(res);
  }) as Promise<AxiosData>;
};

//添加文章 /api/article/addArticle
type AddArticleParams = {
  title: string;
  title2?: string;
  createDate?: string;
  content: string;
  typeId?: string;
  tags?: string[];
  isDraft: boolean;
};
export const addArticleRequest = (parmas: AddArticleParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/article/addArticle", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//查询文章详情 /api/article/getArticleDetail
type ArticleDetailParams = {
  _id: string;
};
export type ArticleDetailData = {
  title: string;
  title2?: string;
  createDate: string;
  content: string;
  typeId: string;
  tags?: string[];
  isDraft: boolean;
  _id: string;
};
export const getArticleDetailRequest = (parmas: ArticleDetailParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<ArticleDetailData> = await axios.post(
      "/api/article/getArticleDetail",
      parmas
    );
    resovle(res.data);
  }) as Promise<ArticleDetailData>;
};

//更新文章 /api/article/updateArticle
type UpdateArticleParams = {
  title: string;
  title2?: string;
  createDate?: string;
  content: string;
  typeId?: string;
  tags?: string[];
  _id: string;
  isDraft: boolean;
};
export const updateArticleRequest = (parmas: UpdateArticleParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post(
      "/api/article/updateArticle",
      parmas
    );
    resovle(res);
  }) as Promise<AxiosData>;
};

//添加说说 /api/post/addPost
type AddPostParams = {
  createDate: string;
  content: string;
  imgs: string[];
};
export const addPostRequest = (parmas: AddPostParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/post/addPost", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//删除说说 /api/post/deletePost
export const deletePostRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/post/deletePost", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//更新说说 /api/post/updatePost
type UpdatePostParams = {
  createDate?: string;
  content: string;
  imgs?: string[];
  _id: string;
};
export const updatePostRequest = (parmas: UpdatePostParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/post/updatePost", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取说说列表 /api/post/getPostList
export type PostData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
        imgs: string[];
      }[]
    | [];
  total: number;
};
export const getPostListRequest = (params: {
  pagesize: number;
  current: number;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<PostData> = await axios.post(
      "/api/post/getPostList",
      params
    );
    resovle(res.data);
  }) as Promise<PostData>;
};

//添加友链 /api/link/addLink
type AddLinkParams = {
  createDate?: string;
  name: string;
  link: string;
  avatar: string;
  description: string;
};
export const addLinkRequest = (parmas: AddLinkParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/link/addLink", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//删除友链 /api/link/deleteLink
export const deleteLinkRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/link/deleteLink", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//更新友链 /api/link/updateLink
type UpdateLinkParams = {
  createDate?: string;
  name: string;
  link: string;
  avatar: string;
  description: string;
  _id: string;
};
export const updateLinkRequest = (parmas: UpdateLinkParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/link/updateLink", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取友链列表 /api/link/getLinkList
export type LinkData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
        imgs: string[];
      }[]
    | [];
  total: number;
};
export const getLinkListRequest = (params: {
  pagesize: number;
  current: number;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<LinkData> = await axios.post(
      "/api/link/getLinkList",
      params
    );
    resovle(res.data);
  }) as Promise<LinkData>;
};
