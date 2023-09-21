import React, { useEffect, useState } from 'react';
import getAuthorsRequest from '../../api/authors/getAuthorsRequest';
import { IAuthor, IComment } from '../../types/types';
import { getCommentsWithChildren } from '../../utils/utils';
import Comment from '../Сomment';
import style from './Comments.module.scss';

export interface IProps {
  comments: IComment[];
  likedComments: IComment[];
  setLikedComments: (comment: IComment[]) => void;
}

const Comments = ({ comments, likedComments, setLikedComments }: IProps) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    getAuthorsRequest().then(data => setAuthors(data));
  }, []);

  const commentsWithChildren = getCommentsWithChildren(comments);

  return (
    <div className={style.comments}>{commentsWithChildren.map((comment) => {
      return <div key={comment.id} className={style.childrenCommentContainer}>
        <Comment
          comment={comment}
          authors={authors}
          setLikedComments={setLikedComments}
          likedComments={likedComments}
        />
        {!!comment.children.length && <div className={style.childrenComments}>
          {comment.children.map((children) => {
            return <Comment
              setLikedComments={setLikedComments}
              likedComments={likedComments}
              key={children.id}
              comment={children}
              authors={authors}
            />;
          })}
        </div>}
      </div>;
    })}</div>
  );
};

export default Comments;
