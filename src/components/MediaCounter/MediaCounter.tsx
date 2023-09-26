import React from 'react';
import { LikeDisableIcon } from '../../assets/svg';
import Loader from '../Loader';
import style from './MediaCounter.module.scss';

export interface IProps {
  likesCount: number;
  commentsCount: number;
  isLoadingCount: boolean;
}

const MediaCounter = ({ likesCount, commentsCount, isLoadingCount }: IProps) => <>
  <div className={style.mediaCounter}>
    {isLoadingCount
      ? <div className={style.loader}><Loader/></div>
      : <>
        <div className={style.commentsCounter}>{commentsCount} комментариев</div>
        <div className={style.likesCounter}>
          <LikeDisableIcon className={style.svg}/>
          {likesCount}
        </div>
      </>}
  </div>
  <hr className={style.hr}/>
</>;

export default MediaCounter;
