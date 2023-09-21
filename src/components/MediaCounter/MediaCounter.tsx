import React from 'react';
import { IComment } from '../../types/types';
import { LikeDisableIcon } from '../../assets/svg';
import style from './MediaCounter.module.scss';

export interface IProps {
  comments: IComment[];
  likedComments: IComment[];
}

const MediaCounter = ({ comments, likedComments }: IProps) => {
  const getCountLikes = () => comments
    .filter((comment) => comment.id !== likedComments.find((likedComment) => likedComment.id === comment.id)?.id)
    .reduce((sum, elem) => sum + elem.likes, 0) + likedComments
    .reduce((sum, elem) => sum + elem.likes, 0);

  return (
    <>
      <div className={style.mediaCounter}>
        <div className={style.commentsCounter}>{comments.length} комментариев
        </div>
        <div className={style.likesCounter}><LikeDisableIcon className={style.svg}/>{getCountLikes()}
        </div>
      </div>
      <hr className={style.hr}/>
    </>
  );
};

export default MediaCounter;
