import axios from "./axios";

// 与后台约定的业务数据规范
type AxiosData<T = any> = {
  message: string;
  code: string;
  data: T;
};

//登录接口 /api/auth/login
export const loginRequest = (params: {
  username: string;
  password: string;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<any> = await axios.post("/api/auth/login", params);
    resovle(res.data);
  }) as Promise<any>;
};

//获取用户详细信息 /api/user/findUser
export const findUserRequest = (params: { username: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<any> = await axios.post("/api/user/findUser", params);
    resovle(res?.data || {});
  }) as Promise<any>;
};

//登出接口 /api/logout
export const logoutRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<any> = await axios.get("/api/logout");
    resovle(res.data);
  }) as Promise<any>;
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
    resovle(res?.data || []);
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
    resovle(res?.data || []);
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
    resovle(res?.data || {});
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
    resovle(res?.data || []);
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
        avatar: string;
        name: string;
        description: string;
        link: string;
        createDate: string;
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

//获取留言列表 /api/comment/getCommentList
export type CommentData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
        email: string;
        website: string;
        name: string;
        children: [];
      }[]
    | [];
  total: number;
};
export const getCommentListRequest = (params: {
  pagesize: number;
  current: number;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<CommentData> = await axios.post(
      "/api/comment/getCommentList",
      params
    );
    resovle(res.data);
  }) as Promise<CommentData>;
};

//删除留言 /api/comment/deleteCommnet
export const deleteCommentRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post(
      "/api/comment/deleteCommnet",
      parmas
    );
    resovle(res);
  }) as Promise<AxiosData>;
};

//添加留言 /api/comment/addCommnet
// type AddCommentParams = {
//   createDate?: string;
//   name: string;
//   link: string;
//   avatar: string;
//   description: string;
// };
// export const addCommentRequest = (parmas: AddLinkParams) => {
//   return new Promise(async (resovle, reject) => {
//     const res: AxiosData = await axios.post("/api/comment/addCommnet", parmas);
//     resovle(res);
//   }) as Promise<AxiosData>;
// };

//更新留言 /api/comment/updateComment
// type UpdateCommentParams = {
//   createDate?: string;
//   name: string;
//   link: string;
//   avatar: string;
//   description: string;
//   _id: string;
// };
// export const updateCommentRequest = (parmas: UpdateLinkParams) => {
//   return new Promise(async (resovle, reject) => {
//     const res: AxiosData = await axios.post("/api/comment/updateComment", parmas);
//     resovle(res);
//   }) as Promise<AxiosData>;
// };

//添加作品 /api/work/addWork
type AddWorkParams = {
  createDate?: string;
  name: string;
  link: string;
  cover: string;
  description: string;
};
export const addWorkRequest = (parmas: AddWorkParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/work/addWork", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//删除作品  /api/work/deleteWork
export const deleteWorkRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/work/deleteWork", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//更新作品  /api/work/updateWork
type UpdateWorkParams = {
  createDate?: string;
  name: string;
  link: string;
  cover: string;
  description: string;
  _id: string;
};
export const updateWorkRequest = (parmas: UpdateWorkParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/work/updateWork", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取作品列表 /api/work/getWorkList
export type WorkData = {
  list:
    | {
        _id: string;
        createDate: string;
        name: string;
        link: string;
        cover: string;
        description: string;
      }[]
    | [];
  total: number;
};
export const getWorkListRequest = (params: {
  pagesize: number;
  current: number;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<WorkData> = await axios.post(
      "/api/work/getWorkList",
      params
    );
    resovle(res.data);
  }) as Promise<WorkData>;
};

//添加日志 /api/log/addLog
type AddLogParams = {
  createDate: string;
  content: string;
};
export const addLogRequest = (parmas: AddLogParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/log/addLog", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//删除日志 /api/log/deleteLog
export const deleteLogRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/log/deleteLog", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//更新日志 /api/log/updateLog
type UpdateLogParams = {
  createDate?: string;
  content: string;
  _id: string;
};
export const updateLogRequest = (parmas: UpdateLogParams) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/log/updateLog", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};

//获取日志列表 /api/log/getLogList
export type LogData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
      }[]
    | [];
  total: number;
};
export const getLogListRequest = (params: {
  pagesize: number;
  current: number;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<LogData> = await axios.post(
      "/api/log/getLogList",
      params
    );
    resovle(res.data);
  }) as Promise<LogData>;
};

//获取关于列表 /api/about/getAboutList
export const getAboutListRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.get("/api/about/getAboutList");
    resovle(res.data);
  }) as Promise<AxiosData>;
};

//更新关于 /api/about/updateAbout
export const updateAboutRequest = (parmas: {
  myself: string;
  website: string;
  _id: string;
}) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/about/updateAbout", parmas);
    resovle(res);
  }) as Promise<AxiosData>;
};
