import React from 'react';
import { IAuthor, IComment } from '../../types/types';
import { getAuthor } from '../../helpers/helpers';
import Comment from './Comment';

export interface IProps {
  comment: IComment;
  authors: IAuthor[];
  setLikedComments: (comment: IComment[]) => void;
  likedComments: IComment[];
}

const CommentContainer = ({ comment, authors, setLikedComments, likedComments }: IProps) => {
  const author = getAuthor(authors, comment);

  const isLiked = !!likedComments.find((likedComment) => likedComment.id === comment.id);
  const removeLike = likedComments.filter((likedComment) => likedComment.id !== comment.id);

  const handleClickLike = () => isLiked
    ? setLikedComments(removeLike)
    : setLikedComments([...likedComments, {
      ...comment,
      likes: comment.likes + 1,
    }]);

  const likes: number = isLiked ? comment.likes + 1 : comment.likes;

  return (
    <Comment
      comment={comment}
      handleClickLike={handleClickLike}
      isLiked={isLiked}
      likes={likes}
      author={author}
    />
  );
};

export default CommentContainer;
