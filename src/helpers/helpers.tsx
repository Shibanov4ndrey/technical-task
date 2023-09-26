import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DATE_FORMAT } from '../const';
import { ICommentWithChildren, IAuthor } from '../types/types';

export const getCommentsData = (comments: ICommentWithChildren[], authors: IAuthor[]) => {
  const commentsData: ICommentWithChildren[] = [];
  const commentsMap: Map<number, ICommentWithChildren> = new Map();

  for (const comment of comments) {
    commentsMap.set(comment.id, { ...comment, children: [], isLiked: false, media: authors.find((author) => author.id === comment.author)! });
  }

  commentsMap.forEach((commentMap) => {
    if (commentMap) {
      if (commentMap.id !== commentMap.parent && !!commentMap.parent) {
        const parent = commentsMap.get(commentMap.parent);
        if (parent) {
          parent.children.push(commentMap);
        }
      } else {
        commentsData.push(commentMap)
      }
    }
  })

  return commentsData
}

export const getDate = (date: string) => {
  const today = new Date();
  const currentDate = new Date(date);
  const timeDiff = Math.abs(today.getTime() - currentDate.getTime());
  const diffDays = Math.round(timeDiff / (1000 * 3600));
  if (diffDays === 1) {
    return `${diffDays} час назад`;
  }
  if (diffDays <= 3) {
    return `${diffDays} часа назад`;
  }
  return format(currentDate, DATE_FORMAT.FULL_DATE_AND_TIME, { locale: ru });
};

export const recursionMap = (comments: ICommentWithChildren[], currentComment: ICommentWithChildren): ICommentWithChildren[] => {
  return comments.map((comment) => {
    if (comment.id !== currentComment.id) {
      if (comment.children.length > 0) {
        return {
          ...comment,
          children: recursionMap(comment.children, currentComment),
        };
      }
      return comment;
    }
    else {
      return {
        ...currentComment,
        likes: currentComment.isLiked ? currentComment.likes - 1 : currentComment.likes + 1,
        isLiked: !currentComment.isLiked,
      };
    }
  });
};

export const getLikedComments = (comments: ICommentWithChildren[], currentComment: ICommentWithChildren): ICommentWithChildren[] => {
  const filter: ICommentWithChildren[] = []
  comments.forEach((comment) => {
    const isFiltered = (comment.isLiked && comment.id !== currentComment.id) || (currentComment.id === comment.id && !currentComment.isLiked)
    if (comment.children.length > 0) {
      filter.push(...getLikedComments(comment.children, currentComment))
    }
    if (isFiltered) {
      filter.push(comment)
      return
    }
    return
  })
  return filter
};

export const getAmount = (comments: ICommentWithChildren[]): number => {
  return comments.reduce((sum, comment) => {
    if (comment.children.length > 0) {
      return sum + comment.likes + getAmount(comment.children);
    }
    return sum + comment.likes;
  }, 0);
};