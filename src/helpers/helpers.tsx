import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DATE_FORMAT } from '../const';
import { IAuthor, IComment, ICommentWithChildren } from '../types/types';

export const getCommentsWithChildren = (comments: IComment[]): ICommentWithChildren[] => {
  const commentsWithChildren: ICommentWithChildren[] = [];
  let pid: number | undefined;
  comments.sort((comm1, comm2) => Number(comm1.parent) - Number(comm2.parent)).forEach((comment) => {
    if (pid) {
      const pElem = commentsWithChildren.find((commentWithChildren) => commentWithChildren.id === pid);
      if (pElem?.children.find((child) => child.id === comment.parent)) {
        pElem.children.push(comment);
      } else {
        pid = undefined;
      }
    }
    if (!commentsWithChildren.length && !!pid) {
      commentsWithChildren.push({ ...comment, children: [] });
    }
    const parent = commentsWithChildren.find((commentWithChildren) => commentWithChildren.id === comment.parent);
    if (!parent && !pid) {
      commentsWithChildren.push({ ...comment, children: [] });
    } else {
      const findCommentWithChildren = commentsWithChildren.find((commentWithChildren) => commentWithChildren.id === comment.parent);
      if (findCommentWithChildren) {
        findCommentWithChildren.children.push(comment);
        pid = findCommentWithChildren.id;
      }
    }
  });
  return commentsWithChildren;
};

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

export const getAuthor = (authors: IAuthor[], comment: IComment) => authors.find((author) => author.id === comment.author);
