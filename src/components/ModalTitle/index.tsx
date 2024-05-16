import React from 'react';
import style from './index.module.scss';

interface Props {
  isEdit: boolean;
  addText: string;
  updateText: string;
  title: string
}

const ModalTitle: React.FC<Props> = ({ isEdit, addText, updateText, title }) => {
  return (
    <div className={style.ModalTitleBox}>
      <div className={style.ModalTitleCustom}>{isEdit ? updateText : addText}</div>
      {title}
    </div>
  );
};

export default ModalTitle;
