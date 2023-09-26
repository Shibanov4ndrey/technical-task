import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ICommentWithChildren } from '../../types/types';
import { getDate } from '../../helpers/helpers';
import CounterLikes from '../CounterLikes';
import classNames from "classnames";
import style from './Сomment.module.scss';

export interface IProps {
  handleClickLike: (comment: ICommentWithChildren) => void;
  classname?: string;
  comment: ICommentWithChildren;
}

const Comment = ({
                   classname,
                   comment,
                   handleClickLike,
                 }: IProps) => <div className={style.comment}>
  <div className={classNames(style.avatarContainer, classname)}>
    <LazyLoadImage
      className={style.avatar}
      src={comment.media?.avatar}
      width={40}
      height={40}
      alt='avatar'
    />
    <div className={style.textContainer}>
      <div className={style.likesContainer}>
        <div className={style.authorContainer}>
          <div className={style.author}>
            {comment.media?.name}
          </div>
          <div className={style.date}>
            {getDate(comment.created)}
          </div>
        </div>
        <CounterLikes
          isLiked={comment.isLiked}
          likes={comment.likes}
          handleClickLike={() => handleClickLike(comment)}
        />
      </div>
      <div className={style.text}>{comment.text}</div>
    </div>
  </div>
</div>;

export default Comment;
