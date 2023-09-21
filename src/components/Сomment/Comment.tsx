import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IAuthor, IComment } from '../../types/types';
import { getAuthor, getDate } from '../../utils/utils';
import { LikeFillIcon, LikeIcon } from '../../assets/svg';
import style from './Сomment.module.scss';

export interface IProps {
  comment: IComment;
  authors: IAuthor[];
  setLikedComments: (comment: IComment[]) => void;
  likedComments: IComment[];
}

const Comment = ({
                   comment,
                   authors,
                   setLikedComments,
                   likedComments,
                 }: IProps) => {
  const author = getAuthor(authors, comment);
  const isLiked = likedComments.find((likedComment) => likedComment.id === comment.id);
  const removeLike = likedComments.filter((likedComment) => likedComment.id !== comment.id);
  return (
    <div className={style.comment}>
      <div className={style.avatarContainer}>
        <LazyLoadImage
          className={style.avatar}
          src={author?.avatar}
          width={40}
          height={40}
          alt='avatar'
        />
        <div className={style.textContainer}>
          <div className={style.likesContainer}>
            <div className={style.authorContainer}>
              <div className={style.author}>
                {author?.name}
              </div>
              <div className={style.date}>
                {getDate(new Date(comment.created))}
              </div>
            </div>
            <div
              onClick={() => isLiked
                ? setLikedComments(removeLike)
                : setLikedComments([...likedComments, {
                  ...comment,
                  likes: comment.likes + 1,
                }])} className={style.likes}>
              {isLiked
                ? <LikeFillIcon className={style.svg}/>
                : <LikeIcon className={style.svg}/>}
              <div
                className={style.likesCount}>{isLiked ? comment.likes + 1 : comment.likes}</div>
            </div>
          </div>
          <div className={style.text}>{comment.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
