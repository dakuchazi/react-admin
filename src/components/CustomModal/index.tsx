import React from "react";
// import { DataFilterProps } from '@/utils/hooks/useTableData';
import ModalTitle from "../ModalTitle";
import style from "./index.module.scss";
import { Input, Modal } from "antd";

interface Props {
  title: string;
  isEdit: boolean;
  isModalOpen: boolean;
  modalOk: () => void;
  modalCancel: () => void;
  dataFilter?: [];
  addText?: string;
  updateText?: string;
  confirmLoading?: boolean;
  render?: () => React.ReactNode;
}

const CustomModal: React.FC<Props> = ({
  isEdit,
  isModalOpen,
  modalOk,
  modalCancel,
  title,
  // dataFilter = [],
  confirmLoading,
  addText = "添加",
  updateText = "更新",
  render,
}) => {
  return (
    <Modal
      title={
        <ModalTitle
          isEdit={isEdit}
          title={title}
          addText={addText}
          updateText={updateText}
        />
      }
      confirmLoading={confirmLoading}
      open={isModalOpen}
      onOk={modalOk}
      onCancel={modalCancel}
    >
      {render?.()}
    </Modal>
  );
};

export default CustomModal;
