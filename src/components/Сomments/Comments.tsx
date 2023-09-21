import React from 'react';
import { IAuthor, IComment, ICommentWithChildren } from '../../types/types';
import CommentContainer from '../Сomment/СommentContainer';
import style from './Comments.module.scss';

export interface IProps {
  commentsWithChildren: ICommentWithChildren[];
  authors: IAuthor[];
  setLikedComments: (comment: IComment[]) => void;
  likedComments: IComment[];
}

const Comments = ({ commentsWithChildren, authors, setLikedComments, likedComments }: IProps) => <div
  className={style.comments}
>
  {commentsWithChildren.map((comment) => {
    const isHasChildren = !!comment.children.length;
    return <div key={comment.id} className={style.childrenCommentContainer}>
      <CommentContainer
        comment={comment}
        authors={authors}
        setLikedComments={setLikedComments}
        likedComments={likedComments}
      />
      {isHasChildren && <div className={style.childrenComments}>
        {comment.children.map((children) => {
          return <CommentContainer
            key={children.id}
            setLikedComments={setLikedComments}
            likedComments={likedComments}
            comment={children}
            authors={authors}
          />;
        })}
      </div>}
    </div>;
  })}</div>;
export default Comments;
