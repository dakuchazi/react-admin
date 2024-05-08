import { useAppDispatch } from "@/store";
import { getCardDataAsync } from "@/store/slices/homeSlice";
import React, { useEffect } from "react";

export default function CountCard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCardDataAsync());
  });

  return <div>CountCard</div>;
}

// import { useMount, useRequest } from "ahooks";
// import classNames from "classnames";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { baseType, stateType } from "@/redux/selectors";
// import { getTotalAPI } from "@/utils/apis/getTotal";
// import { dataMap } from "@/utils/dataMap";
// import { DB } from "@/utils/dbConfig";

// import style from "./index.module.scss";
// import { LoadingOutlined } from "@ant-design/icons";

// interface Props {
//   DBName: DB;
//   className?: string;
//   where?: object;
//   selector: (state: stateType) => baseType;
//   reducer: any;
// }

// congetCardDataAsync: anyst CountCard: React.FC<Props> = ({
//   DBName,
//   className,
//   where = {},
//   selector,
//   reducer,
// }) => {
//   const dispatch = useDispatch();
//   const reduxData = useSelector(selector);

//   const { loading, run } = useRequest(
//     () => getTotalAPI({ dbName: DBName, where }),
//     {
//       retryCount: 3,
//       manual: true,
//       onSuccess: (res) => {
//         dispatch(reducer(res.total));
//       },
//     }
//   );

//   useMount(() => {
//     if (!reduxData.count.isDone) {
//       run();
//     }
//   });

//   return (
//     <div className={classNames(style.countCardBox, className)}>
//       <div className={style.key}>
//         {dataMap[DBName as keyof typeof dataMap]}数
//       </div>
//       <div className={classNames(style.value, { [style.loading]: loading })}>
//         {loading ? <LoadingOutlined /> : reduxData?.count?.value}
//       </div>
//     </div>
//   );
// };

// export default CountCard;
