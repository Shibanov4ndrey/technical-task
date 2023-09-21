import React from 'react';
import { LikeFillIcon, LikeIcon } from '../../assets/svg';
import style from './LikeIconComponent.module.scss';

export interface IProps {
  isLiked: boolean;
}

const LikeIconComponent = ({ isLiked }: IProps) => isLiked
  ? <LikeFillIcon className={style.svg}/>
  : <LikeIcon className={style.svg}/>;

export default LikeIconComponent;
