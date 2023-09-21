import React from 'react';
import LikeIconComponent from '../LikeIconComponent';
import style from './CounterLikes.module.scss';

export interface IProps {
  isLiked: boolean;
  handleClickLike: () => void;
  likes: number;
}

const CounterLikes = ({ handleClickLike, isLiked, likes }: IProps) => <div
  onClick={handleClickLike}
  className={style.likes}
>
  <LikeIconComponent isLiked={isLiked}/>
  <div className={style.likesCount}>{likes}</div>
</div>;

export default CounterLikes;