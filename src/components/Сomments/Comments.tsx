import React from 'react';
import { ICommentWithChildren } from '../../types/types';
import Comment from '../Сomment/Comment';
import style from './Comments.module.scss';

export interface IProps {
  classname?: string;
  comments: ICommentWithChildren[];
  handleClickLike: (comment: ICommentWithChildren) => void;
}

const Comments = ({
                    classname,
                    comments,
                    handleClickLike,
                  }: IProps) => <div
  className={style.comments}
>
  {comments.map((comment) => {
    return <div key={comment.id} className={style.childrenCommentContainer}>
      <Comment
        handleClickLike={handleClickLike}
        classname={classname}
        comment={comment}
      />
      {comment.children.length > 0 && <Comments
        handleClickLike={handleClickLike}
        classname={style.childrenComments}
        comments={comment.children}
      />}
    </div>;
  })}</div>;
export default Comments;
