import classNames from "classnames";
import React from "react";

import { Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";

import s from "./index.module.scss";

interface Props {
  loading: boolean;
  columns: TableColumnsType<any>;
  data: any[];
  total: number;
  pagesize?: number;
  noHeader?: boolean;
  current: number;
  pageChange: (current: number, pagesize: number) => void;
}

const MyTable: React.FC<Props> = ({
  loading,
  columns,
  current,
  data,
  total,
  pageChange,
  noHeader = false,
}) => {
  return (
    <>
      <div className={classNames(s.myTableBox, { [s.noHeader]: noHeader })}>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={(columns) => columns._id}
          showSorterTooltip={false}
          className={s.myTable}
          pagination={false}
        />
      </div>
      <div className={s.paginationBox}>
        <Pagination
          current={current}
          total={total}
          showSizeChanger={true}
          onChange={(current, pageSize) => {
            pageChange(current, pageSize);
          }}
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </>
  );
};

export default MyTable;
