import React from 'react';
// import { DataFilterProps } from '@/utils/hooks/useTableData';
import ModalTitle from '../ModalTitle';
import style from './index.module.scss';
import { Input, Modal } from 'antd';

interface Props {
  isEdit: boolean;
  isModalOpen: boolean;
  modalOk: () => void;
  modalCancel: () => void;
  // dataFilter?: DataFilterProps[];
  addText?: string;
  updateText?: string;
  render?: () => React.ReactNode;
}

const CustomModal: React.FC<Props> = ({
  isEdit,
  isModalOpen,
  modalOk,
  modalCancel,
  // dataFilter = [],
  addText = '添加',
  updateText = '更新',
  render
}) => {
  // const dataFilterRes = () =>
  //   dataFilter.map(({ text, data, setData }, index) => (
  //     <Input
  //       size='large'
  //       key={index}
  //       addBefore={text}
  //       value={data as string}
  //       onChange={value => setData(value)}
  //       className={style.modalInput}
  //     />
  //   ));

  return (
    <Modal
      title={
        <ModalTitle
          isEdit={isEdit}
          title='测试title'
          addText={addText}
          updateText={updateText}
        />
      }
      visible={isModalOpen}
      onOk={modalOk}
      onCancel={modalCancel}
    >
      {render?.()}
    </Modal>
  );
};

export default CustomModal;
