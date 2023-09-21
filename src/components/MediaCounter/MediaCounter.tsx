import React from 'react';
import { LikeDisableIcon } from '../../assets/svg';
import style from './MediaCounter.module.scss';

export interface IProps {
  likesCount: number;
  commentsCounter: number;
}

const MediaCounter = ({ likesCount, commentsCounter }: IProps) => <>
  <div className={style.mediaCounter}>
    <div className={style.commentsCounter}>{commentsCounter} комментариев
    </div>
    <div className={style.likesCounter}>
      <LikeDisableIcon className={style.svg}/>
      {likesCount}
    </div>
  </div>
  <hr className={style.hr}/>
</>;

export default MediaCounter;
