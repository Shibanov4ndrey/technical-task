import React, { ReactNode } from 'react';
import style from './CommonWrapper.module.scss';

interface IProps {
  children: ReactNode;
}

const CommonWrapper = ({ children }: IProps) => <div className={style.wrapper}>{children}</div>;

export default CommonWrapper;