import useCurrentPathName from "@/hooks/useCurrentPathName";
import { useAppSelector } from "@/store";
import { selectUserRoutes } from "@/store/slices/userSlice";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getPath = (menuList: any, pathname: string) => {
  let temppath: any = [];
  try {
    const getNodePath = (node: any) => {
      temppath.push({
        title: node.label,
        path: node.path,
      });
      //找到符合条件的节点，通过throw终止掉递归
      if (node.path === pathname) {
        throw new Error("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        temppath.pop();
      } else {
        //找到叶子节点时，删除路径当中的该叶子节点
        temppath.pop();
      }
    };

    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    return temppath;
  }
};

export default function BreadCrumbCp() {
  const userRoutes = useAppSelector(selectUserRoutes);
  const currentPathName = useCurrentPathName();
  const [routeItems, setRouteItems] = useState([]);

  function itemRender(currentRoute: any, params: any, items: any, paths: any) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={currentRoute.path}>{currentRoute.title}</Link>
    );
  }

  useEffect(() => {
    let path = getPath(userRoutes, currentPathName);
    const first = path && path[0];
    if (first && first.title.trim() !== "首页") {
      path = [{ title: "首页", path: "/home" }].concat(path);
    }
    setRouteItems(path);
  }, [currentPathName]);

  return (
    <Breadcrumb separator=">" items={routeItems} itemRender={itemRender} />
  );
}
