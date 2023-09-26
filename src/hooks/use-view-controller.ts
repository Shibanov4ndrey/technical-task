import { useEffect, useState } from 'react';
import getAuthorsRequest from '../api/authors/getAuthorsRequest';
import getCommentsRequest from '../api/comments/getCommentsRequest';
import {
  getCommentsData,
  recursionMap,
  getLikedComments,
} from '../helpers/helpers';
import { IAuthor, ICommentWithChildren } from '../types/types';

const useViewController = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [comments, setComments] = useState<ICommentWithChildren[]>([]);
  const [commentsData, setCommentsData] = useState<ICommentWithChildren[]>([]);
  const [error, setError] = useState<string>('');
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  useEffect(() => {
    getAuthorsRequest()
      .then(data => {
        setAuthors(data);
        setError('');
      })
      .catch(() => {
        setError('Упс, что-то пошло не так, попробуйте позже');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (authors.length && comments.length) {
      setCommentsData(getCommentsData(comments, authors));
    }
  }, [authors]);

  useEffect(() => {
    if (isLoading && (page <= totalPage || !totalPage)) {
      getCommentsRequest(page)
        .then(data => {
          setCommentsData(commentsData.concat(getCommentsData(data.data, authors)));
          setComments(comments.concat(data.data));
          setPage(page + 1);
          setTotalPage(data.pagination.total_pages);
          setError('');
        })
        .catch(() => {
          setError('Упс, что-то пошло не так, попробуйте позже');
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  const isFetching = page <= totalPage || !totalPage;

  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [likedComments, setLikedComments] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [requestCount, setRequestCount] = useState<number>(1);
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(true);


  const handleClickLike = (comment: ICommentWithChildren) => {
    setCommentsData((prev) => [...recursionMap(prev, comment)]);
    setLikedComments(getLikedComments(commentsData, comment).length)
  };

  useEffect(() => {
    if (isLoadingCount) {
      getCommentsRequest(pageCount)
        .then(data => {
          setPageCount(pageCount + 1);
          setCommentsCount(commentsCount + data.data.length)
          setLikesCount(likesCount + data.data.reduce((sum, comment) => sum + comment.likes, 0))
          if (pageCount === data.pagination.total_pages) {
            setIsLoadingCount(false)
          }
        })
        .catch(() => {
          setRequestCount(requestCount + 1)
        })
    }
  }, [pageCount, requestCount]);

  return {
    isFetching,
    isLoading,
    error,
    commentsData,
    setIsLoading,
    handleClickLike,
    commentsCount,
    likesCount: likesCount + likedComments,
    isLoadingCount,
  };
};

export default useViewController;
