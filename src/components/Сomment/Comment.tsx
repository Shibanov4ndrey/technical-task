import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IAuthor, IComment } from '../../types/types';
import { getDate } from '../../helpers/helpers';
import CounterLikes from '../CounterLikes';
import style from './Сomment.module.scss';

export interface IProps {
  comment: IComment;
  author: IAuthor | undefined;
  isLiked: boolean;
  handleClickLike: () => void;
  likes: number;
}

const Comment = ({
                   comment,
                   author,
                   isLiked,
                   likes,
                   handleClickLike,
                 }: IProps) => <div className={style.comment}>
  <div className={style.avatarContainer}>
    <LazyLoadImage
      className={style.avatar}
      src={author!.avatar}
      width={40}
      height={40}
      alt='avatar'
    />
    <div className={style.textContainer}>
      <div className={style.likesContainer}>
        <div className={style.authorContainer}>
          <div className={style.author}>
            {author!.name}
          </div>
          <div className={style.date}>
            {getDate(comment.created)}
          </div>
        </div>
        <CounterLikes
          isLiked={isLiked}
          likes={likes}
          handleClickLike={handleClickLike}
        />
      </div>
      <div className={style.text}>{comment.text}</div>
    </div>
  </div>
</div>;

export default Comment;
